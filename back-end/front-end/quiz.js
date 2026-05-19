const quizParams = new URLSearchParams(window.location.search);
const quizModuleId = quizParams.get("module") || "ubuntu-installation";

let quizQuestions = [];

function renderQuestion(question, index) {
  const choices = question.choices
    .map((choice, choiceIndex) => {
      return `
        <label>
          <input type="radio" name="question-${question.id}" value="${choiceIndex}" required />
          ${choice}
        </label>
      `;
    })
    .join("");

  return `
    <article class="question-card">
      <p><b>${index + 1}.</b> ${question.question}</p>
      ${choices}
    </article>
  `;
}

async function submitQuiz(event) {
  event.preventDefault();

  const answers = quizQuestions.map((question) => {
    const selected = document.querySelector(`input[name="question-${question.id}"]:checked`);
    return {
      questionId: question.id,
      answer: Number(selected.value)
    };
  });

  const response = await fetch(`/api/quiz/${quizModuleId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  });

  const result = await response.json();
  const resultBox = document.getElementById("quizResult");

  if (!response.ok) {
    resultBox.textContent = result.error || "Could not submit quiz.";
    resultBox.classList.add("show");
    return;
  }

  resultBox.innerHTML = `
    <h2>${result.passed ? "Passed" : "Keep reviewing"}</h2>
    <p>You scored ${result.score} out of ${result.total}. Passing score is ${result.passingScore}.</p>
    <a class="quiz-button" href="profile.html">View Progress</a>
    <a class="secondary-button" href="lesson.html?module=${quizModuleId}&lesson=1">Review Module</a>
    <form class="feedback-form" id="feedbackForm">
      <h2>Module feedback review</h2>
      <label>
        How helpful was this module?
        <select name="rating" required>
          <option value="5">5 - Very helpful</option>
          <option value="4">4 - Helpful</option>
          <option value="3">3 - Okay</option>
          <option value="2">2 - Needs work</option>
          <option value="1">1 - Confusing</option>
        </select>
      </label>
      <label>
        What part was confusing?
        <textarea name="confusing"></textarea>
      </label>
      <label>
        What should we improve for future learners?
        <textarea name="improvement"></textarea>
      </label>
      <button class="primary-button" type="submit">Submit Feedback</button>
      <p id="feedbackStatus"></p>
    </form>
  `;
  resultBox.classList.add("show");

  document.getElementById("feedbackForm").addEventListener("submit", submitFeedback);
}

async function submitFeedback(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      moduleId: quizModuleId,
      rating: Number(formData.get("rating")),
      confusing: formData.get("confusing"),
      improvement: formData.get("improvement")
    })
  });
  const result = await response.json();
  const status = document.getElementById("feedbackStatus");

  if (!response.ok) {
    status.textContent = result.error || "Could not submit feedback.";
    return;
  }

  status.textContent = "Thanks. Your feedback was sent to the admin dashboard.";
  form.querySelector("button").disabled = true;
}

async function loadQuiz() {
  const response = await fetch(`/api/quiz/${quizModuleId}`);

  if (!response.ok) {
    document.getElementById("quizTitle").textContent = "Quiz not found";
    return;
  }

  const quiz = await response.json();
  quizQuestions = quiz.questions;

  document.title = `${quiz.title} Quiz | LearNux`;
  document.getElementById("quizLabel").textContent = `${quiz.distro} Module Quiz`;
  document.getElementById("quizTitle").textContent = `${quiz.title} Quiz`;
  document.getElementById("quizProgress").textContent = `${quizQuestions.length} questions`;
  const backLink = document.getElementById("distroBackLink");
  backLink.href = `${quiz.distro.toLowerCase()}.html`;
  backLink.textContent = `Back to ${quiz.distro}`;

  const form = document.getElementById("quizForm");
  form.innerHTML = `
    ${quizQuestions.map(renderQuestion).join("")}
    <button class="primary-button" type="submit">Submit Quiz</button>
  `;
  form.addEventListener("submit", submitQuiz);
}

loadQuiz();
