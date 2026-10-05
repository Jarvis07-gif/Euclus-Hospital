document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const form = document.querySelector("[data-appt-form]");
  const deptSelect = form.querySelector("[name=department]");
  const doctorSelect = form.querySelector("[name=doctor]");
  const timeSelect = form.querySelector("[name=time]");
  const dateInput = form.querySelector("[name=date]");
  const message = document.querySelector("[data-message]");
  const listEl = document.querySelector("[data-appt-list]");

  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  deptSelect.innerHTML =
    `<option value="">Select department</option>` +
    EUCLUS.departments.map((d) => `<option value="${d.id}">${d.name}</option>`).join("");

  timeSelect.innerHTML =
    `<option value="">Select time</option>` +
    EUCLUS.times.map((t) => `<option value="${t}">${t}</option>`).join("");

  function fillDoctors(deptId, selectedDoctor) {
    const docs = deptId ? EUCLUS_UI.doctorsByDept(deptId) : EUCLUS.doctors;
    doctorSelect.innerHTML =
      `<option value="">Select doctor</option>` +
      docs
        .map((d) => {
          const dept = EUCLUS_UI.deptById(d.department);
          return `<option value="${d.id}">${d.name} — ${dept.name}</option>`;
        })
        .join("");
    if (selectedDoctor) doctorSelect.value = selectedDoctor;
  }

  deptSelect.addEventListener("change", () => fillDoctors(deptSelect.value));

  const preDept = params.get("dept") || "";
  const preDoc = params.get("doctor") || "";
  if (preDept) deptSelect.value = preDept;
  fillDoctors(preDept, preDoc);
  if (preDoc) {
    const doc = EUCLUS_UI.doctorById(preDoc);
    if (doc) {
      deptSelect.value = doc.department;
      fillDoctors(doc.department, doc.id);
    }
  }

  function loadAppointments() {
    try {
      return JSON.parse(localStorage.getItem("euclus-appointments") || "[]");
    } catch {
      return [];
    }
  }

  function saveAppointments(items) {
    localStorage.setItem("euclus-appointments", JSON.stringify(items));
  }

  function renderList() {
    const items = loadAppointments();
    if (!items.length) {
      listEl.innerHTML = `<p class="muted">No appointments saved on this device yet.</p>`;
      return;
    }
    listEl.innerHTML = items
      .map((a) => {
        const doc = EUCLUS_UI.doctorById(a.doctor);
        const dept = EUCLUS_UI.deptById(a.department);
        return `
          <article class="appt-item">
            <div>
              <strong>${a.name}</strong>
              <p>${dept ? dept.name : a.department} with ${doc ? doc.name : a.doctor}<br>
              ${a.date} at ${a.time} · ${a.phone}</p>
            </div>
            <button class="btn btn-ghost" data-cancel="${a.id}">Cancel</button>
          </article>`;
      })
      .join("");
  }

  listEl.addEventListener("click", (e) => {
    const id = e.target.dataset.cancel;
    if (!id) return;
    saveAppointments(loadAppointments().filter((a) => a.id !== id));
    renderList();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.className = "";
    const data = Object.fromEntries(new FormData(form).entries());
    const required = ["name", "email", "phone", "department", "doctor", "date", "time"];
    const missing = required.filter((k) => !String(data[k] || "").trim());
    if (missing.length) {
      message.className = "error";
      message.textContent = "Please complete every required field before booking.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      message.className = "error";
      message.textContent = "Enter a valid email address.";
      return;
    }
    const appointment = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const items = loadAppointments();
    items.unshift(appointment);
    saveAppointments(items);
    form.reset();
    dateInput.min = today;
    fillDoctors("");
    message.className = "success";
    const doc = EUCLUS_UI.doctorById(appointment.doctor);
    message.textContent = `Appointment requested with ${doc ? doc.name : "your doctor"} on ${appointment.date} at ${appointment.time}. We will confirm by email.`;
    renderList();
  });

  renderList();
});
