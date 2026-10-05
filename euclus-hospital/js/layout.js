(function () {
  const path = location.pathname.split("/").pop() || "index.html";

  const icons = {
    heart:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.5-8.2C.4 9.6 2.2 5 6.4 5c2.1 0 3.4 1.1 4.1 2.2C11.2 6.1 12.5 5 14.6 5c4.2 0 6 4.6 3.9 7.8C19 16.6 12 21 12 21z"/></svg>',
    brain:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M8 8a3 3 0 1 1 4-4 3 3 0 1 1 4 4v8a3 3 0 1 1-4 4 3 3 0 1 1-4-4z"/><path d="M8 8v8M16 8v8M12 4v16"/></svg>',
    child:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',
    bone:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M7 7a2.5 2.5 0 1 1 3.5-3.5L17 10a2.5 2.5 0 1 1-3.5 3.5L7 7zM14 14l3 3a2.5 2.5 0 1 1-3.5 3.5L10.5 17"/></svg>',
    cell:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>',
    flower:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="10" r="2.2"/><path d="M12 12v9M8 21h8M12 8c-2-3-6-2-6 .5S10 10 12 8zm0 0c2-3 6-2 6 .5S14 10 12 8z"/></svg>',
    alert:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M12 3 3 20h18L12 3z"/><path d="M12 9v5M12 17h.01"/></svg>',
    scan:
      '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M4 8V5h3M20 8V5h-3M4 16v3h3M20 16v3h-3M4 12h16"/></svg>',
  };

  window.EUCLUS_UI = {
    icon(name) {
      return icons[name] || icons.heart;
    },
    deptById(id) {
      return EUCLUS.departments.find((d) => d.id === id);
    },
    doctorsByDept(id) {
      return EUCLUS.doctors.filter((d) => d.department === id);
    },
    doctorById(id) {
      return EUCLUS.doctors.find((d) => d.id === id);
    },
  };

  function header() {
    const links = [
      ["index.html", "Home"],
      ["about.html", "About"],
      ["departments.html", "Departments"],
      ["doctors.html", "Doctors"],
      ["appointment.html", "Appointments"],
    ];
    return `
      <a class="skip" href="#main">Skip to content</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html">
            <span class="logo-mark">E</span>
            <span>EUCLUS HOSPITAL</span>
          </a>
          <button class="menu-toggle" aria-label="Open menu" data-menu-toggle>☰</button>
          <nav class="nav" data-nav>
            ${links
              .map(
                ([href, label]) =>
                  `<a href="${href}" class="${path === href || (path === "" && href === "index.html") ? "active" : ""}">${label}</a>`
              )
              .join("")}
          </nav>
          <a class="btn btn-primary header-cta" href="appointment.html">Book appointment</a>
        </div>
      </header>`;
  }

  function footer() {
    const h = EUCLUS.hospital;
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="brand" style="margin-bottom:12px">
              <span class="logo-mark">E</span>
              <span>EUCLUS HOSPITAL</span>
            </div>
            <p>${h.tagline}</p>
            <p>${h.address}</p>
          </div>
          <div>
            <h3 style="color:#fff;font-size:1.1rem">Visit</h3>
            <p>${h.hours}</p>
            <p>Main: ${h.phone}<br>Emergency: ${h.emergency}</p>
          </div>
          <div>
            <h3 style="color:#fff;font-size:1.1rem">Care</h3>
            <p><a href="departments.html">Departments</a><br>
            <a href="doctors.html">Find a doctor</a><br>
            <a href="appointment.html">Appointments</a></p>
          </div>
          <div>
            <h3 style="color:#fff;font-size:1.1rem">Contact</h3>
            <p><a href="mailto:${h.email}">${h.email}</a></p>
            <p>Patient advocates available weekdays 8am–6pm.</p>
          </div>
        </div>
        <div class="container copyright">© ${new Date().getFullYear()} Euclus Hospital. Care you can trust.</div>
      </footer>`;
  }

  document.body.insertAdjacentHTML("afterbegin", header());
  document.body.insertAdjacentHTML("beforeend", footer());

  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  toggle?.addEventListener("click", () => nav.classList.toggle("open"));
})();
