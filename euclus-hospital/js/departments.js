document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const selected = params.get("dept");
  const list = document.querySelector("[data-dept-list]");
  const detail = document.querySelector("[data-dept-detail]");

  list.innerHTML = EUCLUS.departments
    .map(
      (d) => `
      <a class="card" href="departments.html?dept=${d.id}">
        <div class="icon-chip">${EUCLUS_UI.icon(d.icon)}</div>
        <h3>${d.name}</h3>
        <p>${d.summary}</p>
        <div class="chip-row">${d.services
          .slice(0, 3)
          .map((s) => `<span class="chip">${s}</span>`)
          .join("")}</div>
      </a>`
    )
    .join("");

  function renderDetail(id) {
    const dept = EUCLUS_UI.deptById(id);
    if (!dept) {
      detail.classList.remove("open");
      detail.innerHTML = "";
      return;
    }
    const doctors = EUCLUS_UI.doctorsByDept(id);
    detail.classList.add("open");
    detail.innerHTML = `
      <div class="two-col" style="align-items:start">
        <div>
          <p class="eyebrow">${dept.name}</p>
          <h2>How we care in ${dept.name.toLowerCase()}</h2>
          <p>${dept.description}</p>
          <div class="chip-row">${dept.services
            .map((s) => `<span class="chip">${s}</span>`)
            .join("")}</div>
          <p style="margin-top:20px">
            <a class="btn btn-primary" href="appointment.html?dept=${dept.id}">Book in this department</a>
          </p>
        </div>
        <div class="doctor-grid" style="grid-template-columns:1fr">
          ${doctors
            .map(
              (doc) => `
            <article class="card doctor-card">
              <img src="${doc.image}" alt="${doc.name}" />
              <div class="dept">${doc.credentials} · ${doc.experience}</div>
              <h3>${doc.name}</h3>
              <p>${doc.title}<br>${doc.focus}</p>
              <p>${doc.bio}</p>
              <a class="btn btn-ghost" href="appointment.html?doctor=${doc.id}&dept=${doc.department}">Book with ${doc.name.split(" ")[1]}</a>
            </article>`
            )
            .join("")}
        </div>
      </div>`;
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (selected) renderDetail(selected);
});
