const storeKey = "andre-academy-progress";

const data = {
  courses: [
    {
      id: "corte-fade-pro",
      title: "Curso Fade Underground",
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
      purchased: false,
      modules: []
    }
  ]
};

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

    if (course.purchased) {
      course.modules.forEach((module) => {
        const moduleEl = document.createElement("div");
        moduleEl.className = "module";
        moduleEl.innerHTML = `<strong>${module.title}</strong>`;

        module.lessons.forEach((lesson) => {
          const l = document.createElement("div");
          l.className = "lesson";
          l.textContent = `▶ ${lesson.title} (${lesson.durationMin} min) — ${lessonPct(lesson.id)}%`;
          l.addEventListener("click", () => openLesson(course, module, lesson));
          moduleEl.appendChild(l);
        });

        wrapper.appendChild(moduleEl);
      });
    }

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

render();
