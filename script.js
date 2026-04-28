const store = {
  progress: "andre-academy-progress",
  session: "andre-academy-session",
  questions: "andre-academy-questions"
};

const users = {
  aluno: { id: "u1", name: "Aluno Demo", role: "student" },
  admin: { id: "a1", name: "André Gomes", role: "admin" }
};
const storeKey = "andre-academy-progress";

const data = {
  courses: [
    {
      id: "corte-fade-pro",
      title: "Curso Fade Underground",
      purchasedBy: ["u1"],
      purchased: true,
      modules: [
        {
          id: "m1",
          title: "Fundamentos",
          lessons: [
            { id: "l1", title: "Maquinário e preparação", durationMin: 14 },
            { id: "l2", title: "Primeira guia", durationMin: 21 }
          ]
        },
        {
          id: "m2",
          title: "Técnicas avançadas",
          lessons: [
            { id: "l3", title: "Transição e acabamento", durationMin: 24 },
            { id: "l4", title: "Freestyle da rua", durationMin: 18 }
          ]
        }
      ]
    },
    {
      id: "colorimetria",
      title: "Colorimetria para Barbeiros",
      purchasedBy: [],
      purchased: false,
      modules: []
    }
  ]
};

const state = {
  progress: JSON.parse(localStorage.getItem(store.progress) || "{}"),
  session: JSON.parse(localStorage.getItem(store.session) || "null"),
  questions: JSON.parse(localStorage.getItem(store.questions) || "[]")
};

const els = {
  sessionLabel: document.getElementById("sessionLabel"),
  toggleTheme: document.getElementById("toggleTheme"),
  logoutBtn: document.getElementById("logoutBtn"),
  loginView: document.getElementById("loginView"),
  homeView: document.getElementById("homeView"),
  userCoursesView: document.getElementById("userCoursesView"),
  lessonView: document.getElementById("lessonView"),
  userQuestionsView: document.getElementById("userQuestionsView"),
  adminCoursesView: document.getElementById("adminCoursesView"),
  adminAnalyticsView: document.getElementById("adminAnalyticsView"),
  adminQuestionsView: document.getElementById("adminQuestionsView"),
  homeCards: document.getElementById("homeCards"),
  courses: document.getElementById("courses"),
  lessonDetail: document.getElementById("lessonDetail"),
  questionInput: document.getElementById("questionInput"),
  askBtn: document.getElementById("askBtn"),
  questionList: document.getElementById("questionList"),
  adminCourses: document.getElementById("adminCourses"),
  analytics: document.getElementById("analytics"),
  adminQuestions: document.getElementById("adminQuestions")
};

function setSession(user) {
  state.session = user;
  localStorage.setItem(store.session, JSON.stringify(user));
}

function isPurchased(course, userId) {
  return course.purchasedBy.includes(userId);
}

function lessonPct(userId, lessonId) {
  return state.progress[userId]?.[lessonId] || 0;
}

function calcCourseProgress(course, userId) {
  const ids = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  if (!ids.length) return 0;
  const total = ids.reduce((acc, lessonId) => acc + lessonPct(userId, lessonId), 0);
  return Math.round(total / ids.length);
}

function autoReply(questionText) {
  const q = questionText.toLowerCase();
  if (q.includes("fade")) return "Dica rápida: ajuste a alavanca em etapas e trabalhe sombras de baixo pra cima.";
  if (q.includes("máquina") || q.includes("maquina")) return "Confira nível da lâmina e ângulo do punho. Pressão leve dá acabamento melhor.";
  return "Recebi sua pergunta! O André vai revisar no painel admin quando possível.";
}

function saveProgress(userId, lessonId, value) {
  if (!state.progress[userId]) state.progress[userId] = {};
  state.progress[userId][lessonId] = value;
  localStorage.setItem(store.progress, JSON.stringify(state.progress));
}

function saveQuestions() {
  localStorage.setItem(store.questions, JSON.stringify(state.questions));
}

function hideAllViews() {
  Object.values(els)
    .filter((el) => el?.classList?.contains("view"))
    .forEach((el) => el.classList.add("hidden"));
}

function card(title, description) {
  return `<article class="mini-card"><h3>${title}</h3><p class="small">${description}</p></article>`;
}

function renderHome() {
  const role = state.session.role;
  if (role === "student") {
    els.homeCards.innerHTML =
      card("Área de cursos", "Acesse só os cursos comprados e acompanhe progresso.") +
      card("Minhas dúvidas", "Envie perguntas e acompanhe respostas automáticas/admin.");
  } else {
    els.homeCards.innerHTML =
      card("Gestão de cursos", "Organize cursos, módulos e aulas.") +
      card("Análise de alunos", "Acompanhe engajamento e progresso médio.") +
      card("Central de dúvidas", "Veja perguntas dos alunos e responda.");
  }
}

function openLesson(course, module, lesson) {
  const userId = state.session.id;
  const pct = lessonPct(userId, lesson.id);

  els.lessonDetail.innerHTML = `
    <h3>${lesson.title}</h3>
    <p class="small">Curso: ${course.title} • Módulo: ${module.title}</p>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <p class="small">Assistido: <strong>${pct}%</strong></p>
    <button id="watchMore">+10% assistido</button>
  `;

  document.getElementById("watchMore").addEventListener("click", () => {
    saveProgress(userId, lesson.id, Math.min(pct + 10, 100));
    renderStudentCourses();
    openLesson(course, module, lesson);
  });
}

function renderStudentCourses() {
  const userId = state.session.id;
  els.courses.innerHTML = "";

  data.courses.forEach((course) => {
    const purchased = isPurchased(course, userId);
    const pct = purchased ? calcCourseProgress(course, userId) : 0;

    const wrapper = document.createElement("article");
    wrapper.className = "course";
    wrapper.innerHTML = `
      <h3>${course.title}</h3>
      <p class="small">${purchased ? "Acesso liberado" : "Bloqueado (não comprado)"}</p>
const progress = JSON.parse(localStorage.getItem(storeKey) || "{}");

const coursesEl = document.getElementById("courses");
const lessonDetailEl = document.getElementById("lessonDetail");
const themeBtn = document.getElementById("toggleTheme");

function lessonPct(id) {
  return progress[id] || 0;
}

function calcCourseProgress(course) {
  const ids = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  if (!ids.length) return 0;
  const total = ids.reduce((acc, id) => acc + lessonPct(id), 0);
  return Math.round(total / ids.length);
}

function render() {
  coursesEl.innerHTML = "";

  data.courses.forEach((course) => {
    const wrapper = document.createElement("article");
    wrapper.className = "course";

    const pct = course.purchased ? calcCourseProgress(course) : 0;
    wrapper.innerHTML = `
      <h3>${course.title}</h3>
      <p class="small">${course.purchased ? "Acesso liberado" : "Bloqueado (não comprado)"}</p>
      <div class="progress"><span style="width:${pct}%"></span></div>
      <p class="small">Progresso: ${pct}%</p>
    `;

    if (purchased) {
      course.modules.forEach((module) => {
        const moduleEl = document.createElement("div");
        moduleEl.className = "module";
        moduleEl.innerHTML = `<strong>${module.title}</strong>`;

        module.lessons.forEach((lesson) => {
          const l = document.createElement("div");
          l.className = "lesson";
          l.textContent = `▶ ${lesson.title} (${lesson.durationMin} min) — ${lessonPct(userId, lesson.id)}%`;
          l.addEventListener("click", () => openLesson(course, module, lesson));
          moduleEl.appendChild(l);
        });

        wrapper.appendChild(moduleEl);
      });
    }

    els.courses.appendChild(wrapper);
  });
}

function renderStudentQuestions() {
  const userId = state.session.id;
  const mine = state.questions.filter((q) => q.userId === userId);

  els.questionList.innerHTML = mine
    .map(
      (q) => `
      <article class="question-card">
        <p><strong>Pergunta:</strong> ${q.question}</p>
        <p class="small"><strong>Auto:</strong> ${q.autoReply}</p>
        <p class="small"><strong>André:</strong> ${q.adminReply || "Ainda sem resposta manual."}</p>
      </article>
    `
    )
    .join("");
}

function renderAdminCourses() {
  els.adminCourses.innerHTML = data.courses
    .map((course) => {
      const lessons = course.modules.flatMap((m) => m.lessons).length;
      return `
        <article class="mini-card">
          <h3>${course.title}</h3>
          <p class="small">Módulos: ${course.modules.length} • Aulas: ${lessons}</p>
        </article>
      `;
    })
    .join("");
}

function renderAdminAnalytics() {
  const student = users.aluno;
  const purchasedCourses = data.courses.filter((c) => isPurchased(c, student.id));
  const avg = purchasedCourses.length
    ? Math.round(
        purchasedCourses.reduce((acc, course) => acc + calcCourseProgress(course, student.id), 0) /
          purchasedCourses.length
      )
    : 0;

  els.analytics.innerHTML = `
    <article class="mini-card">
      <h3>Resumo atual</h3>
      <p class="small">Alunos ativos (demo): 1</p>
      <p class="small">Cursos comprados (demo): ${purchasedCourses.length}</p>
      <p class="small">Progresso médio (demo): ${avg}%</p>
    </article>
  `;
}

function respondQuestion(id) {
  const answer = prompt("Responder dúvida do aluno:");
  if (!answer) return;
  state.questions = state.questions.map((q) => (q.id === id ? { ...q, adminReply: answer } : q));
  saveQuestions();
  renderAdminQuestions();
}

function renderAdminQuestions() {
  if (!state.questions.length) {
    els.adminQuestions.innerHTML = `<p class="small">Sem dúvidas por enquanto.</p>`;
    return;
  }

  els.adminQuestions.innerHTML = state.questions
    .map(
      (q) => `
      <article class="question-card">
        <p><strong>Aluno:</strong> ${users.aluno.name}</p>
        <p><strong>Pergunta:</strong> ${q.question}</p>
        <p class="small"><strong>Auto:</strong> ${q.autoReply}</p>
        <p class="small"><strong>André:</strong> ${q.adminReply || "Sem resposta manual."}</p>
        <button data-reply-id="${q.id}">Responder</button>
      </article>
    `
    )
    .join("");

  document.querySelectorAll("[data-reply-id]").forEach((btn) => {
    btn.addEventListener("click", () => respondQuestion(btn.getAttribute("data-reply-id")));
  });
}

function renderLayout() {
  hideAllViews();

  if (!state.session) {
    els.sessionLabel.textContent = "Sem sessão";
    els.loginView.classList.remove("hidden");
    els.logoutBtn.hidden = true;
    return;
  }

  const role = state.session.role;
  els.sessionLabel.textContent = `Logado: ${state.session.name} (${role === "admin" ? "Admin" : "Aluno"})`;
  els.logoutBtn.hidden = false;

  els.homeView.classList.remove("hidden");
  renderHome();

  if (role === "student") {
    els.userCoursesView.classList.remove("hidden");
    els.lessonView.classList.remove("hidden");
    els.userQuestionsView.classList.remove("hidden");
    renderStudentCourses();
    renderStudentQuestions();
  }

  if (role === "admin") {
    els.adminCoursesView.classList.remove("hidden");
    els.adminAnalyticsView.classList.remove("hidden");
    els.adminQuestionsView.classList.remove("hidden");
    renderAdminCourses();
    renderAdminAnalytics();
    renderAdminQuestions();
  }
}

document.querySelectorAll(".login-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setSession(users[btn.dataset.user]);
    renderLayout();
  });
});

els.askBtn.addEventListener("click", () => {
  const text = els.questionInput.value.trim();
  if (!text) return;

  state.questions.unshift({
    id: `q-${Date.now()}`,
    userId: state.session.id,
    question: text,
    autoReply: autoReply(text),
    adminReply: ""
  });

  els.questionInput.value = "";
  saveQuestions();
  renderStudentQuestions();
});

els.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(store.session);
  state.session = null;
  renderLayout();
});

let neonAlt = false;
els.toggleTheme.addEventListener("click", () => {
    coursesEl.appendChild(wrapper);
  });
}

function openLesson(course, module, lesson) {
  const pct = lessonPct(lesson.id);

  lessonDetailEl.innerHTML = `
    <h3>${lesson.title}</h3>
    <p class="small">Curso: ${course.title} • Módulo: ${module.title}</p>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <p class="small">Assistido: <strong>${pct}%</strong></p>
    <button id="watchMore">+10% assistido</button>
  `;

  document.getElementById("watchMore").addEventListener("click", () => {
    progress[lesson.id] = Math.min((progress[lesson.id] || 0) + 10, 100);
    localStorage.setItem(storeKey, JSON.stringify(progress));
    openLesson(course, module, lesson);
    render();
  });
}

let neonAlt = false;
themeBtn.addEventListener("click", () => {
  neonAlt = !neonAlt;
  document.documentElement.style.setProperty("--neon", neonAlt ? "#ff00c8" : "#39ff14");
  document.documentElement.style.setProperty("--neon-alt", neonAlt ? "#ff9f1c" : "#00d9ff");
});

renderLayout();
