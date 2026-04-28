const Store = {
  session: "ag_session",
  progress: "ag_progress",
  questions: "ag_questions",
  reviews: "ag_reviews",
  reminders: "ag_reminders"
};

const Seed = {
  users: [
    { id: "u1", name: "Aluno Demo", role: "student", weeklyMinutes: 220 },
    { id: "u2", name: "Aluno Street", role: "student", weeklyMinutes: 340 },
    { id: "u3", name: "Aluno Fade", role: "student", weeklyMinutes: 160 },
    { id: "a1", name: "André Gomes", role: "admin", weeklyMinutes: 0 }
  ],
  courses: [
    {
      id: "c1",
      title: "Fade Underground",
      students: ["u1", "u2"],
      modules: [
        { id: "m1", title: "Base", lessons: ["Higiene", "Guias", "Marcação"] },
        { id: "m2", title: "Avançado", lessons: ["Transição", "Detalhes", "Finalização"] }
      ]
    }
  ],
  lives: [
    { id: "live1", title: "Q&A de Fade", date: "2026-05-05 20:00" },
    { id: "live2", title: "Colorimetria na prática", date: "2026-05-12 20:00" }
  ]
};

function read(key, fallback) {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function inSubfolder() {
  return window.location.pathname.includes("/student/") || window.location.pathname.includes("/admin/");
}

function rel(pathFromRoot) {
  return inSubfolder() ? `../${pathFromRoot}` : pathFromRoot;
}

function goTo(pathFromRoot) {
  window.location.href = rel(pathFromRoot);
}

function currentUser() {
  return read(Store.session, null);
}

function setUser(user) {
  write(Store.session, user);
}

function logout() {
  localStorage.removeItem(Store.session);
}

function requireAuth(role) {
  const user = currentUser();

  if (!user) {
    goTo("index.html");
    return null;
  }

  if (role && user.role !== role) {
    goTo(user.role === "admin" ? "admin/home.html" : "student/home.html");
    return null;
  }

  return user;
}

function getProgress() {
  return read(Store.progress, {});
}

function setProgress(v) {
  write(Store.progress, v);
}

function getQuestions() {
  return read(Store.questions, []);
}

function setQuestions(v) {
  write(Store.questions, v);
}

function getReviews() {
  return read(Store.reviews, []);
}

function setReviews(v) {
  write(Store.reviews, v);
}

function getReminders() {
  return read(Store.reminders, {});
}

function setReminders(v) {
  write(Store.reminders, v);
}

function calcProgress(userId, course) {
  const p = getProgress()[userId] || {};
  const lessonIds = course.modules.flatMap((m) => m.lessons.map((_, idx) => `${course.id}_${m.id}_${idx}`));
  if (!lessonIds.length) return 0;
  return Math.round(lessonIds.reduce((acc, id) => acc + (p[id] || 0), 0) / lessonIds.length);
}

function completedModules(userId, course) {
  const p = getProgress()[userId] || {};
  return course.modules.filter((m) => m.lessons.every((_, idx) => (p[`${course.id}_${m.id}_${idx}`] || 0) >= 90)).length;
}


function injectSignature() {
  if (document.querySelector('.footer-note')) return;
  const note = document.createElement('div');
  note.className = 'footer-note';
  note.textContent = 'Plataforma André Gomes Academy • Desenvolvedora geral: Matify';
  document.body.appendChild(note);
}
function levelFromProgress(avg) {
  if (avg >= 80) return "Nível 5 - Mestre da Rua";
  if (avg >= 60) return "Nível 4 - Profissional";
  if (avg >= 40) return "Nível 3 - Intermediário";
  if (avg >= 20) return "Nível 2 - Iniciante+";
  return "Nível 1 - Começando";
}

window.App = {
  Store,
  Seed,
  read,
  write,
  rel,
  goTo,
  currentUser,
  setUser,
  logout,
  requireAuth,
  getProgress,
  setProgress,
  getQuestions,
  setQuestions,
  getReviews,
  setReviews,
  getReminders,
  setReminders,
  calcProgress,
  completedModules,
  levelFromProgress,
  injectSignature
};
