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
