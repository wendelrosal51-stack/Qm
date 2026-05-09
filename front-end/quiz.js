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
  `;
  resultBox.classList.add("show");
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

  const form = document.getElementById("quizForm");
  form.innerHTML = `
    ${quizQuestions.map(renderQuestion).join("")}
    <button class="primary-button" type="submit">Submit Quiz</button>
  `;
  form.addEventListener("submit", submitQuiz);
}

loadQuiz();
