function renderModuleCard(module) {
  return `
    <a href="lesson.html?module=${module.id}&lesson=1" class="links">
      <div class="tutorial-card">
        <img src="${module.icon || 'assets/apps.png'}" alt="" />
        <hr id="vertical" />
        <div class="text-part">
          <p id="tutorial-title">${module.title}</p>
          <p>${module.summary || `${module.lessonCount} lessons and ${module.quizCount} quiz questions.`}</p>
        </div>
      </div>
    </a>
  `;
}

async function loadModuleCards() {
  const moduleCards = document.getElementById("moduleCards");

  if (!moduleCards) {
    return;
  }

  const distro = moduleCards.dataset.distro || "Ubuntu";
  const response = await fetch(`/api/tutorials?distro=${encodeURIComponent(distro)}`);

  if (!response.ok) {
    moduleCards.innerHTML = "<p>Could not load modules yet.</p>";
    return;
  }

  const modules = await response.json();

  if (modules.length === 0) {
    moduleCards.innerHTML = `
      <div class="empty-modules">
        No ${distro} modules yet. Admins can create one from the dashboard.
      </div>
    `;
    return;
  }

  moduleCards.innerHTML = `
    ${modules.map(renderModuleCard).join("")}
    <a href="profile.html" class="links">
      <div class="tutorial-card">
        <img src="assets/profile.png" alt="" />
        <hr id="vertical" />
        <div class="text-part">
          <p id="tutorial-title">Progress and Scores</p>
          <p>Track your learning milestones and see how far you have come.</p>
        </div>
      </div>
    </a>
  `;
}

loadModuleCards();
