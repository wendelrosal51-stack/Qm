const params = new URLSearchParams(window.location.search);
const moduleId = params.get("module") || "ubuntu-installation";
const requestedLesson = Number(params.get("lesson") || 1);

let moduleData;
let currentLesson;

function renderStep(step, index) {
  let media = "";

  if (step.command) {
    media = `<pre class="command-block"><code>${step.command}</code></pre>`;
  } else if (step.type === "video") {
    media = `<video class="story-media" src="${step.media}" autoplay muted loop></video>`;
  } else {
    media = `<img class="story-media" src="${step.media}" alt="" />`;
  }

  return `
    <article class="story-step">
      <div class="story-copy">
        <span>Step ${index + 1}</span>
        <p>${step.text}</p>
        ${step.warning ? `<div class="warning">${step.warning}</div>` : ""}
      </div>
      ${media}
    </article>
  `;
}

function updateLessonNavigation() {
  const lessonCount = moduleData.lessons.length;
  const previousButton = document.getElementById("previousLesson");
  const nextButton = document.getElementById("nextLesson");
  const quizLink = document.getElementById("quizLink");

  previousButton.disabled = currentLesson.id <= 1;
  nextButton.disabled = currentLesson.id >= lessonCount;

  previousButton.onclick = () => {
    if (currentLesson.id > 1) {
      window.location.href = `lesson.html?module=${moduleId}&lesson=${currentLesson.id - 1}`;
    }
  };

  nextButton.onclick = () => {
    if (currentLesson.id < lessonCount) {
      window.location.href = `lesson.html?module=${moduleId}&lesson=${currentLesson.id + 1}`;
    }
  };

  quizLink.href = `quiz.html?module=${moduleId}`;
}

async function markLessonComplete() {
  const response = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      moduleId,
      lessonId: currentLesson.id
    })
  });

  if (!response.ok) {
    window.alert("Could not save progress. Please try again.");
    return;
  }

  window.alert("Lesson marked complete.");
}

async function loadLesson() {
  const response = await fetch(`/api/tutorials/${moduleId}`);

  if (!response.ok) {
    document.getElementById("lessonTitle").textContent = "Module not found";
    return;
  }

  moduleData = await response.json();
  currentLesson = moduleData.lessons.find((lesson) => lesson.id === requestedLesson) || moduleData.lessons[0];

  document.title = `${currentLesson.title} | LearNux`;
  document.getElementById("moduleLabel").textContent = `${moduleData.distro} ${moduleData.title}`;
  document.getElementById("lessonTitle").textContent = currentLesson.title;
  document.getElementById("lessonSummary").textContent = moduleData.summary;
  document.getElementById("lessonProgress").textContent = `Lesson ${currentLesson.id} of ${moduleData.lessons.length}`;
  document.getElementById("storyboard").innerHTML = currentLesson.steps.map(renderStep).join("");
  document.getElementById("completeLesson").addEventListener("click", markLessonComplete);

  updateLessonNavigation();
}

loadLesson();
