async function dragNDropSystem() {
   await fetch("/api/calendar")
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         data.forEach((task) => {
            console.log(task);
            const div = document.createElement("div");
            const h3 = document.createElement("h3");
            const p = document.createElement("p");
            const btn1 = document.createElement("button");
            const btn2 = document.createElement("button");
            const iEdit = document.createElement("i");
            const iTrash = document.createElement("i");

            // data from sql
            div.dataset.id = task.id;
            div.dataset.start = task.start;
            div.dataset.title = task.title;
            div.dataset.description = task.description;

            div.setAttribute("draggable", true);
            div.classList.add("draggable");
            p.classList.add("task-description");
            iEdit.classList.add("fas", "fa-edit");
            iTrash.classList.add("fas", "fa-trash");
            h3.textContent = task.title;
            p.textContent = task.description;

            btn1.append(iEdit);
            btn2.append(iTrash);
            div.append(h3, p, btn1, btn2);
            document.querySelector(`#${task.status}Object`).append(div);
         });
      })
      .catch((err) => {
         if (err) console.log(err);
      });

   // What we can drag and where we can drop
   const draggables = document.querySelectorAll(".draggable");
   const containers = document.querySelectorAll(".container");

   draggables.forEach((draggable) => {
      // Gets fired as soon as we start dragging an element
      draggable.addEventListener("dragstart", () => {
         // To give the nice ghost affect
         draggable.classList.add("dragging");
      });

      // Gets fired as soon as dragging stops
      draggable.addEventListener("dragend", () => {
         draggable.classList.remove("dragging");
         // get variables
         const newStatus = draggable.parentElement
            .getAttribute("id")
            .replace("Object", "");
         // api call to update status in database
         fetch(`/api/calendar/${draggable.dataset.id}`, {
            method: "PUT",
            body: JSON.stringify({
               start: draggable.dataset.start,
               title: draggable.dataset.title,
               description: draggable.dataset.description,
               status: newStatus,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         });
      });
   });

   containers.forEach((container) => {
      // Will continously fire off as long as draggable element is being dragged over a container
      container.addEventListener("dragover", (e) => {
         // To allow dropping inside an element
         e.preventDefault();
         const afterElement = getDragAfterElement(container, e.clientY);
         // console.log(afterElement);
         // Allows us to drop an element in the container, just that it will be appended to the very end
         const draggable = document.querySelector(".dragging");
         if (afterElement == null) {
            container.appendChild(draggable);
         } else {
            container.insertBefore(draggable, afterElement);
         }
      });
   });

   // Function that gets the y position of the mouse and gets the element directly after it
   function getDragAfterElement(container, y) {
      // Will make sure that we don't get the current element we're dragging
      // Using the spread operator to turn it into an array
      const draggableElements = [
         ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      // Reduce will determine the element thats directly after our mouse cursor (y)
      return draggableElements.reduce(
         (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            //   console.log(offset);
            //   console.log(box);
            if (offset < 0 && offset > closest.offset) {
               return { offset, element: child };
            } else {
               return closest;
            }
         },
         { offset: Number.NEGATIVE_INFINITY }
      ).element;
   }
}

dragNDropSystem();
