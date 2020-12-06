var tasks;
const sounds = ["sound.mp3", "sound1.mp3", "sound2.mp3", "sound3.mp3"];
var innerSlots = Array.from(document.querySelectorAll(".inner_slot"));
var toDoContainer = document.getElementById("slot_todo");
var newEntry = document.getElementById("new");
var confirm = document.getElementById("confirm");
var slots = document.querySelector(".slots");
var editTask = document.getElementById("edit");
var editmodal = document.getElementById("trinti_modalas");
var doneContainer = document.getElementById("slot_done");
var duomenuModal = document.getElementById("duomenu_modalas");
var closeModal = document.getElementsByClassName("closeModal");
var closeEditModal = document.getElementsByClassName("closeEditModal");

console.log(editmodal);
// New entry

newEntry.addEventListener("click", () => {
  duomenuModal.classList.add("modal_overlay--active");
  document.getElementById("taskNotes").value = "";
});

var deleteButton, editButton, p;

confirm.addEventListener("click", () => {
  var taskNotes = document.getElementById("taskNotes").value;
  console.log(taskNotes);
  var card = document.createElement("div");
  deleteButton = document.createElement("button");
  deleteButton.innerText = "";
  deleteButton.classList.add("delete");
  editButton = document.createElement("button");
  editButton.classList.add("edit");
  p = document.createElement("p");

  card.className += "task";
  card.setAttribute("draggable", "true");
  card.setAttribute("data-element", Math.random() * 10);
  p.className += "task__text";
  p.innerText = taskNotes;
  toDoContainer.appendChild(card);
  card.appendChild(deleteButton);
  card.appendChild(editButton);
  card.appendChild(p);
  duomenuModal.classList.remove("modal_overlay--active");
  console.log(tasks);
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

//Trinti
slots.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.remove();
  }
});

// Edit
var editp;
slots.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    editmodal.classList.add("modal_overlay--active");
    editp = e.target.parentNode.querySelector("p");
    document.getElementById("editNotes").value = editp.innerText;
  } else {
    return false;
  }
});

editTask.addEventListener("click", (e) => {
  var editNotes = document.getElementById("editNotes").value;
  editp.innerText = editNotes;
  editmodal.classList.remove("modal_overlay--active");
});

//Edit end

// close modal of new text

closeModal[0].addEventListener("click", (e) => {
  console.log(editmodal);
  duomenuModal.classList.remove("modal_overlay--active");
});
// Close modal of edit
closeEditModal[0].addEventListener("click", () => {
  editmodal.classList.remove("modal_overlay--active");
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
    var elementoAttr = e.dataTransfer.getData("text");
    var element = document.querySelector(`[data-element="${elementoAttr}"]`);
    e.target.appendChild(element);
    // Nurodom, kad galim ideti elementa
    e.preventDefault();
  });
});
