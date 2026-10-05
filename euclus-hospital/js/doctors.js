document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const startDept = params.get("dept") || "all";
  const filters = document.querySelector("[data-filters]");
  const grid = document.querySelector("[data-doctor-grid]");

  const options = [{ id: "all", name: "All departments" }, ...EUCLUS.departments];
  filters.innerHTML = options
    .map(
      (d) =>
        `<button class="filter-btn${d.id === startDept ? " active" : ""}" data-id="${d.id}">${d.name}</button>`
    )
    .join("");

  function render(deptId) {
    const list =
      deptId === "all" ? EUCLUS.doctors : EUCLUS_UI.doctorsByDept(deptId);
    grid.innerHTML = list
      .map((doc) => {
        const dept = EUCLUS_UI.deptById(doc.department);
        return `
          <article class="card doctor-card">
            <img src="${doc.image}" alt="${doc.name}" />
            <div class="dept">${dept.name}</div>
            <h3>${doc.name}</h3>
            <p>${doc.title} · ${doc.credentials}<br>${doc.focus}</p>
            <p>${doc.bio}</p>
            <p class="muted">Clinic days: ${doc.days.join(", ")}</p>
            <a class="btn btn-primary" href="appointment.html?doctor=${doc.id}&dept=${doc.department}">Book appointment</a>
          </article>`;
      })
      .join("");
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filters.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.id);
  });

  render(startDept);
});
