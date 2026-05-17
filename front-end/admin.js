let adminModules = [];
let selectedModuleId = "";

function splitLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function showStatus(target, message) {
  const box = document.createElement("div");
  box.className = "status-message";
  box.textContent = message;
  target.prepend(box);
  setTimeout(() => box.remove(), 3000);
}

function lessonEntryHtml(lesson = {}) {
  const steps = lesson.steps || [{ text: "" }];
  return `
    <article class="entry-card lesson-entry">
      <label>
        <span>Lesson title</span>
        <input class="lesson-title" type="text" value="${lesson.title || ""}" placeholder="Example: Install a package" />
      </label>
      <label>
        <span>Lesson steps</span>
        <textarea class="lesson-steps" placeholder="One step per line">${steps.map((step) => step.text || "").join("\n")}</textarea>
      </label>
      <label>
        <span>Optional command block</span>
        <textarea class="lesson-command" placeholder="Example: sudo apt update">${steps.find((step) => step.command)?.command || ""}</textarea>
      </label>
      <label>
        <span>Optional media path</span>
        <input class="lesson-media" type="text" value="${steps.find((step) => step.media)?.media || ""}" placeholder="assets/apps.png" />
      </label>
      <button type="button" class="remove-entry">Remove Lesson</button>
    </article>
  `;
}

function questionEntryHtml(question = {}) {
  return `
    <article class="entry-card question-entry">
      <label>
        <span>Question</span>
        <input class="quiz-question" type="text" value="${question.question || ""}" placeholder="What should learners remember?" />
      </label>
      <label>
        <span>Choices</span>
        <textarea class="quiz-choices" placeholder="One choice per line">${(question.choices || ["", "", "", ""]).join("\n")}</textarea>
      </label>
      <label>
        <span>Correct answer number</span>
        <select class="quiz-answer">
          <option value="0"${question.answer === 0 ? " selected" : ""}>1</option>
          <option value="1"${question.answer === 1 ? " selected" : ""}>2</option>
          <option value="2"${question.answer === 2 ? " selected" : ""}>3</option>
          <option value="3"${question.answer === 3 ? " selected" : ""}>4</option>
        </select>
      </label>
      <button type="button" class="remove-entry">Remove Question</button>
    </article>
  `;
}

function addLesson(formName, lesson) {
  const container = document.getElementById(`${formName}Lessons`);
  container.insertAdjacentHTML("beforeend", lessonEntryHtml(lesson));
}

function addQuestion(formName, question) {
  const container = document.getElementById(`${formName}Questions`);
  container.insertAdjacentHTML("beforeend", questionEntryHtml(question));
}

function formToModule(formName) {
  const form = document.getElementById(`${formName}Form`);
  const formData = new FormData(form);
  const lessons = [...document.querySelectorAll(`#${formName}Lessons .lesson-entry`)].map((entry) => {
    const textSteps = splitLines(entry.querySelector(".lesson-steps").value).map((text) => ({ text }));
    const command = entry.querySelector(".lesson-command").value.trim();
    const media = entry.querySelector(".lesson-media").value.trim();

    if (command) {
      textSteps.push({ text: "Practice the command shown here.", command });
    }

    if (media) {
      textSteps.push({ text: "Review the visual example.", media, type: media.endsWith(".mp4") ? "video" : "image" });
    }

    return {
      title: entry.querySelector(".lesson-title").value.trim(),
      steps: textSteps
    };
  });

  const quiz = [...document.querySelectorAll(`#${formName}Questions .question-entry`)].map((entry) => ({
    question: entry.querySelector(".quiz-question").value.trim(),
    choices: splitLines(entry.querySelector(".quiz-choices").value),
    answer: Number(entry.querySelector(".quiz-answer").value)
  }));

  return {
    distro: formData.get("distro"),
    title: formData.get("title"),
    icon: formData.get("icon") || "assets/apps.png",
    summary: formData.get("summary"),
    objectives: splitLines(formData.get("objectives") || ""),
    lessons,
    quiz
  };
}

function fillForm(formName, module) {
  const form = document.getElementById(`${formName}Form`);
  form.elements.distro.value = module.distro;
  form.elements.title.value = module.title;
  form.elements.icon.value = module.icon || "";
  form.elements.summary.value = module.summary || "";
  form.elements.objectives.value = (module.objectives || []).join("\n");

  if (form.elements.id) {
    form.elements.id.value = module.id;
  }

  document.getElementById(`${formName}Lessons`).innerHTML = "";
  document.getElementById(`${formName}Questions`).innerHTML = "";
  module.lessons.forEach((lesson) => addLesson(formName, lesson));
  module.quiz.forEach((question) => addQuestion(formName, question));
}

function resetCreateForm() {
  document.getElementById("createForm").reset();
  document.getElementById("createLessons").innerHTML = "";
  document.getElementById("createQuestions").innerHTML = "";
  addLesson("create");
  addQuestion("create");
}

function renderModuleList() {
  const moduleList = document.getElementById("moduleList");
  moduleList.innerHTML = adminModules
    .map((module) => `
      <button type="button" class="topic-row${module.id === selectedModuleId ? " active" : ""}" data-module-id="${module.id}">
        ${module.title}
        <small>${module.distro} - ${module.source === "admin" ? "Admin" : "Base"}</small>
      </button>
    `)
    .join("");
}

async function loadModules() {
  const response = await fetch("/api/admin/modules");

  if (!response.ok) {
    window.location.href = "/";
    return;
  }

  adminModules = await response.json();
  selectedModuleId = selectedModuleId || adminModules[0]?.id || "";
  renderModuleList();

  const selected = adminModules.find((module) => module.id === selectedModuleId);
  if (selected) {
    fillForm("edit", selected);
  }
}

async function saveCreateModule() {
  const module = formToModule("create");
  const response = await fetch("/api/admin/modules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(module)
  });
  const result = await response.json();

  if (!response.ok) {
    window.alert(result.error || "Could not create module.");
    return;
  }

  selectedModuleId = result.id;
  resetCreateForm();
  await loadModules();
  showStatus(document.getElementById("create-topic-panel"), "Module created and added to the learner pages.");
}

async function saveEditedModule() {
  const id = document.getElementById("editForm").elements.id.value;
  const module = formToModule("edit");
  const response = await fetch(`/api/admin/modules/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(module)
  });
  const result = await response.json();

  if (!response.ok) {
    window.alert(result.error || "Could not update module.");
    return;
  }

  selectedModuleId = id;
  await loadModules();
  showStatus(document.getElementById("modify-topic-panel"), "Module updates published.");
}

async function deleteSelectedModule() {
  const id = document.getElementById("editForm").elements.id.value;

  if (!id || !window.confirm("Delete this admin-managed module?")) {
    return;
  }

  const response = await fetch(`/api/admin/modules/${id}`, { method: "DELETE" });
  const result = await response.json();

  if (!response.ok) {
    window.alert(result.error || "Could not delete module.");
    return;
  }

  selectedModuleId = "";
  await loadModules();
}

function renderFeedbackDetail(item) {
  document.getElementById("feedbackDetail").innerHTML = `
    <h3>${item.moduleTitle}</h3>
    <p><b>From:</b> ${item.username}</p>
    <p><b>Rating:</b> ${item.rating}/5</p>
    <p><b>Confusing part:</b> ${item.confusing || "No note added."}</p>
    <p><b>Suggested improvement:</b> ${item.improvement || "No suggestion added."}</p>
    <p><b>Status:</b> ${item.status}</p>
    <div class="admin-actions">
      <button type="button" data-action-feedback="${item._id}">Mark Action Taken</button>
      <button type="button" data-delete-feedback="${item._id}">Remove Feedback</button>
      <a href="lesson.html?module=${item.moduleId}&lesson=1">Open Related Module</a>
    </div>
  `;
}

async function loadFeedback() {
  const response = await fetch("/api/admin/feedback");
  const feedback = response.ok ? await response.json() : [];
  const feedbackList = document.getElementById("feedbackList");

  if (feedback.length === 0) {
    feedbackList.innerHTML = "<p>No feedback has been submitted yet.</p>";
    return;
  }

  feedbackList.innerHTML = feedback
    .map((item) => `
      <article class="feedback-ticket">
        <div>
          <strong>${item.moduleTitle}</strong>
          <p>Rating: ${item.rating}/5 - ${item.status}</p>
        </div>
        <button type="button" data-review-feedback="${item._id}">Review</button>
      </article>
    `)
    .join("");

  feedbackList.dataset.feedback = JSON.stringify(feedback);
}

async function checkAdmin() {
  const response = await fetch("/api/user");
  const user = await response.json();

  if (!user.loggedIn || user.role !== "admin") {
    window.location.href = "/";
    return false;
  }

  document.getElementById("adminName").textContent = user.username;
  return true;
}

document.addEventListener("click", async (event) => {
  const removeEntry = event.target.closest(".remove-entry");
  if (removeEntry) {
    removeEntry.closest(".entry-card").remove();
  }

  const moduleButton = event.target.closest("[data-module-id]");
  if (moduleButton) {
    selectedModuleId = moduleButton.dataset.moduleId;
    const selected = adminModules.find((module) => module.id === selectedModuleId);
    renderModuleList();
    fillForm("edit", selected);
  }

  const reviewButton = event.target.closest("[data-review-feedback]");
  if (reviewButton) {
    const feedback = JSON.parse(document.getElementById("feedbackList").dataset.feedback || "[]");
    const item = feedback.find((entry) => entry._id === reviewButton.dataset.reviewFeedback);
    renderFeedbackDetail(item);
  }

  const actionButton = event.target.closest("[data-action-feedback]");
  if (actionButton) {
    await fetch(`/api/admin/feedback/${actionButton.dataset.actionFeedback}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "actioned" })
    });
    await loadFeedback();
  }

  const deleteButton = event.target.closest("[data-delete-feedback]");
  if (deleteButton) {
    await fetch(`/api/admin/feedback/${deleteButton.dataset.deleteFeedback}`, { method: "DELETE" });
    document.getElementById("feedbackDetail").innerHTML = "<h3>User feedback detail</h3><p>Select feedback to review it.</p>";
    await loadFeedback();
  }
});

document.querySelectorAll("[data-add-lesson]").forEach((button) => {
  button.addEventListener("click", () => addLesson(button.dataset.addLesson));
});

document.querySelectorAll("[data-add-question]").forEach((button) => {
  button.addEventListener("click", () => addQuestion(button.dataset.addQuestion));
});

document.getElementById("saveCreate").addEventListener("click", saveCreateModule);
document.getElementById("saveEdit").addEventListener("click", saveEditedModule);
document.getElementById("deleteModule").addEventListener("click", deleteSelectedModule);
document.getElementById("refreshFeedback").addEventListener("click", loadFeedback);
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/";
});

(async function initAdmin() {
  const ok = await checkAdmin();

  if (!ok) {
    return;
  }

  resetCreateForm();
  await loadModules();
  await loadFeedback();
})();
