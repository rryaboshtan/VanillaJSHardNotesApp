import Render from "./Render.js";


const options = { month: 'long', day: 'numeric', year: 'numeric' };
let count = 0;
let notes = [
   {
      name: 'Shopping list',
      created: new Date().toLocaleDateString('en-US', options),
      category: 'Task',
      content: 'tomatoes, bread',
      dates: '',
      command: 'sdfd',
   },
   {
      name: 'The theory of evolution',
      created: new Date().toLocaleDateString('en-US', options),
      category: 'Random Thought',
      content: 'The evolution...',
      dates: '',
      command: 'sdfd',
   },
   {
      name: 'New feature',
      created: new Date().toLocaleDateString('en-US', options),
      category: 'Idea',
      content: 'Implement new...',
      dates: '3/5/2021, 5/5/2021',
      command: 'sdfd',
   },
   {
      name: 'William Gaddis',
      created: new Date().toLocaleDateString('en-US', options),
      category: 'Task',
      content: "Power doesn't co",
      dates: '',
      command: 'sdfd',
   },
   {
      name: 'Books',
      created: new Date().toLocaleDateString('en-US', options),
      category: 'Task',
      content: 'The Lean Startup',
      dates: '',
      command: 'sdfd',
   },
];

let archivedNotes = [];

const categoriesMap = {
   Task: '<div class="round-fon"><i class="fas fa-shopping-cart head"></i></div>',
   Idea: '<div class="round-fon"><i class="far fa-lightbulb head"></i></div>',
   'Random Thought': '<div class="round-fon"><i class="fas fa-user-md head"></i></div>',
   Quote: '<div class="round-fon"><i class="fas fa-quote-right head"></i></div>',
};

const categories = {
   Task: {
      active: 3,
      archived: 0,
   },
   'Random Thought': {
      active: 1,
      archived: 0,
   },
   Idea: {
      active: 1,
      archived: 0,
   },
};

const render = new Render(notes, archivedNotes, categories);

function defineIdProperty(note) {
   Object.defineProperty(note, 'id', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: Math.random() * 200,
   });
}


const onAllArchiveShow = () => {
   const archivedTable = document.querySelector('.archived-table');
   if (archivedNotes.length > 0) {
      if (count === 1) {
         archivedTable.classList.toggle('visible');
      }
      archivedTable.classList.toggle('visible');

      render.renderArchivedNoteList(archivedNotes);
      initArchiveRowsEvents();
   }
};
const onDeleteNote = event => {
   const currentRow = event.target.parentElement.parentElement.parentElement;

   const currentNoteIndex = notes.findIndex(note => note.content === currentRow.dataset.content);
   const currentNote = notes.splice(currentNoteIndex, 1);
   currentRow.remove();

   categories[currentNote[0].category].active--;
   render.renderCategories();
};

const onArchiveClick = event => {
   const currentRow = event.target.parentElement.parentElement.parentElement;

   const currentNoteIndex = notes.findIndex(note => note.id.toString() === currentRow.dataset.id);
   const currentNote = notes.splice(currentNoteIndex, 1);
   archivedNotes = archivedNotes.concat(currentNote);

   const lastArchivedNote = archivedNotes[archivedNotes.length - 1];
   defineIdProperty(lastArchivedNote);

   categories[currentNote[0].category].active--;
   categories[currentNote[0].category].archived++;
   initSelectEvents();
   render.renderCategories();
   currentRow.remove();
};

const onArchivedRowClick = event => {
   const currentRow = event.target.parentElement.parentElement;

   const currentArchivedNoteIndex = archivedNotes.findIndex(note => note.content === currentRow.dataset.content);
   const currentNote = archivedNotes.splice(currentArchivedNoteIndex, 1);

   appendNewRow(currentNote[0]);
   categories[currentNote[0].category].archived--;
   render.renderCategories();

   initArchiveNoteEvents();
   currentRow.remove();
};

render.renderNoteList(notes);
render.renderCategories();
initEditEvents();
initDeleteEvents();
initCreateNoteEvent();
initSelectEvents();
initArchiveNoteEvents();

function initSelectEvents() {
   const selectItems = document.querySelectorAll('select');

   selectItems.forEach(selectItem => {
      selectItem.addEventListener('change', event => {
         const currentRow = event.target.parentElement.parentElement;

         const currentNoteIndex = notes.findIndex(note => note.id.toString() === currentRow.dataset.id);
         const oldCategory = notes[currentNoteIndex].category;

         notes[currentNoteIndex].category = event.target.value;

         categories[oldCategory].active--;
         categories[notes[currentNoteIndex].category].active++;
         // Change first td icon according to the new category
         currentRow.children[0].innerHTML = categoriesMap[notes[currentNoteIndex].category];
         // renderNoteList(notes);
         render.renderCategories();
      });
   });
}

function initArchiveRowsEvents() {
   const archivedTableBody = document.querySelector('.archived-table-body');
   const archivedRows = Array.from(archivedTableBody.children);

   archivedRows.forEach(archivedRow => {
      archivedRow.addEventListener('click', onArchivedRowClick);

      archivedRow.addEventListener('mouseleave', () => {
         archivedRow.style.backgroundColor = '#777777';
      });

      archivedRow.addEventListener('mouseenter', () => {
         archivedRow.style.backgroundColor = '#ffffff';
      });
   });
}

function initArchiveNoteEvents() {
   count++;
   let archiveIcons = document.querySelectorAll('.fa-archive');
   const allArchiveShowIcon = archiveIcons[0];
   archiveIcons = Array.from(archiveIcons).slice(-(archiveIcons.length - 1));

   let archiveButtons = Array.from(archiveIcons).map(iconElement => iconElement.parentElement);

   archiveButtons.forEach(archiveButton => {
      archiveButton.addEventListener('click', onArchiveClick);
   });

   allArchiveShowIcon.addEventListener('click', onAllArchiveShow);
}

function appendNewRow(newNote) {
   const tbody = document.querySelector('.table-body');

   const content = 'Some data' + parseInt(Math.random() * 200);

   if (newNote) {
      notes.push(newNote);
   } else {
      notes.push({
         name: '',
         created: new Date().toLocaleDateString('en-US', options),
         category: Object.keys(categories)[0],
         content,
         dates: '',
         command: '',
      });
   }

   const addedNote = notes[notes.length - 1];
   defineIdProperty(addedNote);

   categories[addedNote.category].active++;
   render.renderCategories();

   render.renderOneNote(addedNote, tbody);

   initSelectEvents();
   initEditEvents();
   initDeleteEvents();
   initArchiveNoteEvents();
}

function initCreateNoteEvent() {
   const createNoteButton = document.querySelector('.create-note');
   createNoteButton.addEventListener('click', () => {
      // const archivedTable = document.querySelector('.archived-table');
      appendNewRow(null);
   });
}

function initDeleteEvents() {
   let deleteIcons = document.querySelectorAll('.fa-trash');
   deleteIcons = Array.from(deleteIcons).slice(-(deleteIcons.length - 1));

   let deleteButtons = Array.from(deleteIcons).map(iconElement => iconElement.parentElement);

   deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', onDeleteNote);
   });
}

function initEditEvents() {
   let isEditMode = false;

   const editIcons = document.querySelectorAll('.fa-pencil-alt');
   const editButtons = Array.from(editIcons).map(iconElement => iconElement.parentElement);
   editButtons.forEach(editButton => {
      editButton.addEventListener('click', event => {
         isEditMode = !isEditMode;
         const tbody = document.querySelector('.table-body');
         const currentRow = event.target.parentElement.parentElement.parentElement;
         // let oldValue = null;
         const inputs = currentRow.querySelectorAll('input, select');

         inputs.forEach(input => {
            setInputEvents(input, isEditMode);
         });
      });
   });
}

function setInputEvents(input, isEditMode) {
   if (!isEditMode) {
      input.setAttribute('disabled', 'disabled');
      input.style.backgroundColor = '#ced7e488';
      return;
   }
   input.removeAttribute('disabled');
   input.style.backgroundColor = '#ffffff';

   input.addEventListener('click', event => {
      if (event.target.dataset.field === 'content') {
         oldValue = event.target.value;
      }
   });
   input.addEventListener('change', event => {
      const currentRow = event.target.parentElement.parentElement;
      const currentNoteIndex = notes.findIndex(note => note.id.toString() === currentRow.dataset.id);

      notes[currentNoteIndex][input.dataset.field] = event.target.value;
   });
}
