// Form
const form = document.querySelector(".calendar--form");
// Modal
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

// Configuration options for calendar
function createEvent() {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2022-02-02",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },

    editable: true,
    selectable: true,
    selectHelper: true,
    eventLimit: true,
    dayMaxEventRows: true,
    views: {
      timeGrid: {
        dayMaxEventRows: 6,
      },
    },
    eventDidMount: function (info) {
      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: "top",
        trigger: "hover",
        container: "body",
      });
    },
    events: "/api/calendar",
    // eventRender: function (info) {
    //   console.log(info.event.extendedProps.status);
    // },
  });

  calendar.render();
}

// Fetches data, passes it into function that creates calendar
// Note that technically, we don't need this fetch since  events: "/api/calendar" is making an XML-HTTP-REQUEST, we could just run createEvent()
fetch("/api/calendar")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    createEvent();
  })
  .catch((err) => {
    if (err) console.log(err);
  });

// Function that adds new events (tasks)
function addEvent() {
  // Input Fields
  const input_title = document.querySelector(".calendar--title");
  const input_time = document.querySelector(".calendar--time");
  const input_description = document.querySelector(".calendar--description");
  fetch("/api/calendar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Example format:
    // title: "Cleaning",
    // start: "2022-01-13T07:00:00",
    // description: "Clean room",
    body: JSON.stringify({
      // groupId: input_groupId.value,
      title: input_title.value,
      start: input_time.value,
      description: input_description.value,
    }),
  });
  alert("Event Added");
  window.location.reload();
}

// Will call function that adds event whenever a submit event from a form is fired off
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});

// Relocate to kanban page on click
document.body.addEventListener("click", (e) => {
  const chosenEvent = e.target;
  if (chosenEvent.classList.contains("fc-event-title")) {
    window.location.replace("/kanban");
  }
});

//////////////////////////////////////////////////////////////////
// MODAL FORM
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // We can access datasets and treat them as objects (they're even camelCased for us)
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Select closes parent element with the class modal
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// Close Modal if anywhere outside of it is clicked
overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;

  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;

  modal.classList.remove("active");
  overlay.classList.remove("active");
}
