const innerSlots = Array.from(document.querySelectorAll('.inner_slot'));
const toDoContainer = document.getElementById('slot_todo');
const doingContainer = document.getElementById('slot_doing');
const newEntry = document.getElementById('new');
const confirm = document.getElementById('confirm');
const slots = document.querySelector('.slots');
const editTask = document.getElementById('edit');
const editModal = document.getElementById('editTaskModal');
const doneContainer = document.getElementById('slot_done');
const newTaskModal = document.getElementById('newTaskModal');
const closeModal = document.getElementsByClassName('closeModal');
const closeEditModal = document.getElementsByClassName('closeEditModal');

// Task manage letiables for mobile
const taskkManageModal = document.getElementById('taskManageMobileModal');
const closeTaskManage = document.getElementById('closeTaskManage');

// New entry

newEntry.addEventListener('click', () => {
	newTaskModal.classList.add('modal_overlay--active');
	document.getElementById('taskNotes').value = '';
	document.getElementById('taskHeading').value = '';
});

let deleteButton, editButton, heading, paragraphm, manageButton;

confirm.addEventListener('click', () => {
	const taskNotes = document.getElementById('taskNotes').value;
	const taskHeading = document.getElementById('taskHeading').value;

	console.log(taskHeading);
	let card = document.createElement('div');

	deleteButton = document.createElement('button');
	deleteButton.innerText = '';
	deleteButton.classList.add('delete');
	editButton = document.createElement('button');
	editButton.classList.add('edit');
	heading = document.createElement('h3');
	heading.classList.add('task__heading');
	paragraph = document.createElement('p');
	manageButton = document.createElement('button');
	manageButton.classList.add('task__manage');
	card.className += 'task';
	card.setAttribute('draggable', 'true');
	card.setAttribute('data-element', Math.random() * 10);
	paragraph.className += 'task__text';
	paragraph.innerText = taskNotes;
	heading.innerText = taskHeading;
	toDoContainer.appendChild(card);
	card.appendChild(deleteButton);
	card.appendChild(editButton);
	card.appendChild(heading);
	card.appendChild(paragraph);
	card.appendChild(manageButton);
	newTaskModal.classList.remove('modal_overlay--active');
	// tasks = document.querySelectorAll('.task')
});

//drag start

slots.addEventListener('dragstart', function(e) {
	if (e.target.classList.contains('task')) {
		let attr = e.target.getAttribute('data-element');
		console.log(attr);
		e.dataTransfer.setData('text', attr);
	}
});

// Drag start end

// db click
slots.addEventListener('dblclick', e => {
	if (e.target.classList.contains('task')) {
		doneContainer.appendChild(e.target);
	}
});

//delete
slots.addEventListener('click', e => {
	if (e.target.classList.contains('delete')) {
		e.target.parentNode.remove();
	}
});

// Edit
let editp, edith;
slots.addEventListener('click', e => {
	if (e.target.classList.contains('edit')) {
		editModal.classList.add('modal_overlay--active');
		editp = e.target.parentNode.querySelector('p');
		edith = e.target.parentNode.querySelector('h3');
		document.getElementById('editNotes').value = editp.innerText;
		document.getElementById('editHeading').value = edith.innerText;
	} else {
		return;
	}
});

editTask.addEventListener('click', e => {
	const editNotes = document.getElementById('editNotes').value;
	const editHeading = document.getElementById('editHeading').value;
	editp.innerText = editNotes;
	edith.innerText = editHeading;
	editModal.classList.remove('modal_overlay--active');
});

//Edit end

// Manage task mobile
let taskKey;
slots.addEventListener('click', e => {
	if (e.target.classList.contains('task__manage')) {
		taskkManageModal.classList.add('modal_overlay--active');
		console.log(e.target.parentNode.getAttribute('data-element'));
		taskKey = e.target.parentNode.getAttribute('data-element');
		console.log(taskKey);
	}
});

// close modal of new text

closeModal[0].addEventListener('click', e => {
	console.log(editModal);
	newTaskModal.classList.remove('modal_overlay--active');
});
// Close modal of edit
closeEditModal[0].addEventListener('click', () => {
	editModal.classList.remove('modal_overlay--active');
});
// Drag over and drop
innerSlots.forEach(item => {
	item.addEventListener('dragover', function(e) {
		// if target doesnt have the needed class just return
		if (!e.target.classList.contains('inner_slot')) {
			return;
		}
		e.preventDefault();
	});
	item.addEventListener('drop', function(e) {
		// We get elements attr from the drag start
		let elementoAttr = e.dataTransfer.getData('text');
		let element = document.querySelector(`[data-element="${elementoAttr}"]`);
		e.target.appendChild(element);
		// Have to prevent default
		e.preventDefault();
	});
});

// Close task maanage
closeTaskManage.addEventListener('click', () => {
	taskkManageModal.classList.remove('modal_overlay--active');
});
// Move task mobile
taskkManageModal.addEventListener('click', e => {
	if (e.target.classList.contains('assignTaskDoing')) {
		let element = document.querySelector(`[data-element="${taskKey}"]`);
		doingContainer.appendChild(element);
		taskkManageModal.classList.remove('modal_overlay--active');
	}
});
taskkManageModal.addEventListener('click', e => {
	if (e.target.classList.contains('assignTaskDone')) {
		let element = document.querySelector(`[data-element="${taskKey}"]`);
		doneContainer.appendChild(element);
		taskkManageModal.classList.remove('modal_overlay--active');
	}
});
taskkManageModal.addEventListener('click', e => {
	if (e.target.classList.contains('assignTaskToDo')) {
		let element = document.querySelector(`[data-element="${taskKey}"]`);
		toDoContainer.appendChild(element);
		taskkManageModal.classList.remove('modal_overlay--active');
	}
});
