const sounds = ["sound.mp3", "sound1.mp3", "sound2.mp3", "sound3.mp3"];
const innerSlots = Array.from(document.querySelectorAll(".inner_slot"));
const toDoContainer = document.getElementById("slot_todo");
const doingContainer = document.getElementById("slot_doing");
const newEntry = document.getElementById("new");
const confirm = document.getElementById("confirm");
const slots = document.querySelector(".slots");
const editTask = document.getElementById("edit");
const editModal = document.getElementById("editTaskModal");
const doneContainer = document.getElementById("slot_done");
const newTaskModal = document.getElementById("newTaskModal");
const closeModal = document.getElementsByClassName("closeModal");
const closeEditModal = document.getElementsByClassName("closeEditModal");
// Task manage variables for mobile
const taskkManageModal = document.getElementById("taskManageMobileModal");
const closeTaskManage = document.getElementById("closeTaskManage");

// New entry

newEntry.addEventListener("click", () => {
  newTaskModal.classList.add("modal_overlay--active");
  document.getElementById("taskNotes").value = "";
});

let deleteButton, editButton, paragraphm, manageButton, tasks, taskManageButtons;

confirm.addEventListener("click", () => {
  let taskNotes = document.getElementById("taskNotes").value;
  console.log(taskNotes);
  let card = document.createElement("div");
  deleteButton = document.createElement("button");
  deleteButton.innerText = "";
  deleteButton.classList.add("delete");
  editButton = document.createElement("button");
  editButton.classList.add("edit");
  paragraph = document.createElement("p");
  manageButton = document.createElement("button");
  manageButton.classList.add("task__manage");
  card.className += "task";
  card.setAttribute("draggable", "true");
  card.setAttribute("data-element", Math.random() * 10);
  paragraph.className += "task__text";
  paragraph.innerText = taskNotes;
  toDoContainer.appendChild(card);
  card.appendChild(deleteButton);
  card.appendChild(editButton);
  card.appendChild(paragraph);
  card.appendChild(manageButton);
  newTaskModal.classList.remove("modal_overlay--active");
  tasks = document.querySelectorAll(".task");
  taskManageButtons = document.querySelectorAll(".task__manage");
});

//drag start

slots.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("task")) {
    var atributas = e.target.getAttribute("data-element");
    console.log(atributas);
    e.dataTransfer.setData("text", atributas);
  }
});

// Drag start end

// db click
slots.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("task")) {
    doneContainer.appendChild(e.target);
  }
});

//delete
slots.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.remove();
  }
});

// Edit
let editp;
slots.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    editModal.classList.add("modal_overlay--active");
    editp = e.target.parentNode.querySelector("p");
    document.getElementById("editNotes").value = editp.innerText;
  } else {
    return false;
  }
});

editTask.addEventListener("click", (e) => {
  let editNotes = document.getElementById("editNotes").value;
  editp.innerText = editNotes;
  editModal.classList.remove("modal_overlay--active");
});

//Edit end

// Manage task mobile
let taskKey;
slots.addEventListener("click", (e) => {
  if (e.target.classList.contains("task__manage")) {
    taskkManageModal.classList.add("modal_overlay--active");
    console.log(e.target.parentNode.getAttribute("data-element"));
    taskKey = e.target.parentNode.getAttribute("data-element");
    console.log(taskKey);
  }
});

// close modal of new text

closeModal[0].addEventListener("click", (e) => {
  console.log(editModal);
  newTaskModal.classList.remove("modal_overlay--active");
});
// Close modal of edit
closeEditModal[0].addEventListener("click", () => {
  editModal.classList.remove("modal_overlay--active");
});
// Drag over and drop
innerSlots.forEach((item, index) => {
  item.addEventListener("dragover", function (e) {
    // Jeigu klases nera - sustabdom funkcija
    if (!e.target.classList.contains("inner_slot")) {
      return;
    }
    // Nurodom, kad galim ideti elementa
    e.preventDefault();
  });
  item.addEventListener("drop", function (e) {
    // Pasiemam dragstart eventa isiminta elemento id
    let elementoAttr = e.dataTransfer.getData("text");
    let element = document.querySelector(`[data-element="${elementoAttr}"]`);
    e.target.appendChild(element);
    // Nurodom, kad galim ideti elementa
    e.preventDefault();
  });
});

// Close task maanage
closeTaskManage.addEventListener("click", () => {
  taskkManageModal.classList.remove("modal_overlay--active");
});
// Move task
taskkManageModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("assignTaskDoing")) {
    let element = document.querySelector(`[data-element="${taskKey}"]`);
    doingContainer.appendChild(element);
    taskkManageModal.classList.remove("modal_overlay--active");
  }
});
taskkManageModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("assignTaskDone")) {
    let element = document.querySelector(`[data-element="${taskKey}"]`);
    doneContainer.appendChild(element);
    taskkManageModal.classList.remove("modal_overlay--active");
  }
});
taskkManageModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("assignTaskToDo")) {
    let element = document.querySelector(`[data-element="${taskKey}"]`);
    toDoContainer.appendChild(element);
    taskkManageModal.classList.remove("modal_overlay--active");
  }
});
