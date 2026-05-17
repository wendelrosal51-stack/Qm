function latestAttempt(attempts, moduleId) {
  return attempts
    .filter((attempt) => attempt.moduleId === moduleId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
}

function renderProfileCard(module, progress, attempts) {
  const moduleProgress = progress.find((item) => item.moduleId === module.id);
  const completedLessons = moduleProgress ? moduleProgress.completedLessons.length : 0;
  const attempt = latestAttempt(attempts, module.id);
  const scoreText = attempt ? `${attempt.score}/${attempt.total}` : "No quiz yet";

  return `
    <article class="profile-card">
      <h2>${module.title}</h2>
      <p>${completedLessons} of ${module.lessonCount} lessons completed</p>
      <p>Latest quiz score: ${scoreText}</p>
      <a href="lesson.html?module=${module.id}&lesson=1">Continue Module</a>
    </article>
  `;
}

async function loadProfile() {
  const [modulesResponse, progressResponse] = await Promise.all([
    fetch("/api/tutorials"),
    fetch("/api/progress")
  ]);

  const modules = await modulesResponse.json();
  const data = await progressResponse.json();

  document.getElementById("profileTitle").textContent = `${data.username}'s progress`;
  document.getElementById("profileGrid").innerHTML = modules
    .map((module) => renderProfileCard(module, data.progress, data.quizAttempts))
    .join("");
}

loadProfile();
