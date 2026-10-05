document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-home-depts]");
  if (grid) {
    grid.innerHTML = EUCLUS.departments
      .slice(0, 8)
      .map(
        (d) => `
        <a class="card" href="departments.html?dept=${d.id}">
          <div class="icon-chip">${EUCLUS_UI.icon(d.icon)}</div>
          <h3>${d.name}</h3>
          <p>${d.summary}</p>
        </a>`
      )
      .join("");
  }

  const docs = document.querySelector("[data-home-doctors]");
  if (docs) {
    docs.innerHTML = EUCLUS.doctors
      .slice(0, 3)
      .map((doc) => {
        const dept = EUCLUS_UI.deptById(doc.department);
        return `
          <article class="card doctor-card">
            <img src="${doc.image}" alt="${doc.name}" />
            <div class="dept">${dept.name}</div>
            <h3>${doc.name}</h3>
            <p>${doc.focus}</p>
            <a class="btn btn-ghost" href="appointment.html?doctor=${doc.id}&dept=${doc.department}">Book</a>
          </article>`;
      })
      .join("");
  }
});
