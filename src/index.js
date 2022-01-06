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

console.log(notes);
function renderCategories() {
   const tbody = document.querySelector('.categories-table-body');
   tbody.innerHTML = '';
   let str = '';
   for (let category of Object.keys(categories)) {
      str += `<tr></td>`;
      str += `<td><input type="text" disabled value="${category}"></td>`;
      str += `<td><input data-field="active" type="text" disabled value="${categories[category].active}"></td>`;
      str += `<td><input data-field="archived" type="text" disabled value="${categories[category].archived}"></td>`;
   }
   str += `</tr>`;
   tbody.innerHTML = str;
   console.log(tbody);
}

function renderNoteList(notes) {
   const tbody = document.querySelector('.table-body');
   tbody.innerHTML = '';
   let str = '';
   for (let note of notes) {
      Object.defineProperty(note, 'id', {
         enumerable: false,
         configurable: false,
         writable: true,
         value: Math.random() * 200,
      });

      const noteFields = Object.keys(note);
      str += `<tr data-id="${note.id}"><td class="first-column">${categoriesMap[note.category]}</td>`;
      for (let noteField of noteFields) {
         if (noteField === 'command') {
            str += `<td class="command"><button><i class="fas fa-pencil-alt"></i></button>
               <button><i class="fas fa-archive"></i></button>
               <button><i class="fas fa-trash"></i></button></td>`;
         } else if (noteField === 'category') {
            str += `<td>
                     <select data-field="${noteField}" disabled> 
                     
                        <option value="Task" ${note[noteField] === 'Task' ? 'selected' : ''}>Task</option>
                        <option value="Random Thought" ${
                           note[noteField] === 'Random Thought' ? 'selected' : ''
                        }>Random Thought</option>
                        <option value="Idea" ${note[noteField] === 'Idea' ? 'selected' : ''}>Idea</option>
                     </select></td>`;
         } else {
            str += `<td><input data-field="${noteField}" type="text" disabled value="${note[noteField]}"></td>`;
         }
      }
      str += `</tr>`;
   }
   tbody.innerHTML = str;
   console.log(tbody);
}

function renderArchivedNoteList(archivedNotes) {
   const tbody = document.querySelector('.archived-table-body');
   tbody.innerHTML = '';
   let str = '';
   for (let note of archivedNotes) {
      const noteFields = Object.keys(note);
      str += `<tr data-id="${note.id}"><td class="first-column">${categoriesMap[note.category]}</td>`;
      for (let noteField of noteFields) {
         if (noteField === 'command') {
            str += '';
         } else {
            str += `<td><input data-field="${noteField}" type="text" disabled value="${note[noteField]}"></td>`;
         }
      }
      str += `</tr>`;
   }
   tbody.innerHTML = str;

   console.log(tbody.parentElement);
}

const onArchiveClick = event => {
   const currentRow = event.target.parentElement.parentElement.parentElement;

   const currentNoteIndex = notes.findIndex(note => note.id.toString() === currentRow.dataset.id);
   const currentNote = notes.splice(currentNoteIndex, 1);
   archivedNotes = archivedNotes.concat(currentNote);

   const lastArchivedNote = archivedNotes[archivedNotes.length - 1];
   Object.defineProperty(lastArchivedNote, 'id', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: currentNote.id,
   });

   console.log(archivedNotes);

   categories[currentNote[0].category].active--;
   categories[currentNote[0].category].archived++;
   initSelectEvents();
   renderCategories();
   // renderNoteList(notes);
   currentRow.remove();
};
renderNoteList(notes);
renderCategories();
initEditEvents();
initDeleteEvents();
initCreateNoteEvent();
initSelectEvents();
initArchiveNoteEvents();

function initSelectEvents() {
   const selectItems = document.querySelectorAll('select');

   selectItems.forEach(selectItem => {
      // selectItem.addEventListener('click', event => {
      //    oldCategory = event.target.value;
      // });

      selectItem.addEventListener('change', event => {
         // console.log('event.target.value', event.target.value);
         console.log('event add................ ');
         const currentRow = event.target.parentElement.parentElement;

         const currentNoteIndex = notes.findIndex(note => note.id.toString() === currentRow.dataset.id);
         // const currentNote = archivedNotes.splice(currentNoteIndex, 1);
         const oldCategory = notes[currentNoteIndex].category;

         notes[currentNoteIndex].category = event.target.value;

         //   console.log(notes);
         //   notes = notes.concat(currentNote);
         // currentRow.remove();
         //   renderNewRow(currentNote[0]);
         // categories[currentNote[0].category].archived--;
         categories[oldCategory].active--;
         categories[notes[currentNoteIndex].category].active++;
         // Change first td icon according to the new category
         currentRow.children[0].innerHTML = categoriesMap[notes[currentNoteIndex].category];
         // renderNoteList(notes);
         renderCategories();

         // initArchiveNoteEvents();
         // archivedRow.remove();
      });
   });
}

function initArchiveRowsEvents() {
   const archivedTableBody = document.querySelector('.archived-table-body');
   const archivedRows = Array.from(archivedTableBody.children);

   archivedRows.forEach(archivedRow => {
      archivedRow.addEventListener('click', event => {
         const currentRow = event.target.parentElement.parentElement;

         const currentArchivedNoteIndex = archivedNotes.findIndex(note => note.content === currentRow.dataset.content);
         const currentNote = archivedNotes.splice(currentArchivedNoteIndex, 1);
         console.log('currentNote.id = ', currentNote.id);
         // console.log(notes);
         // notes = notes.concat(currentNote);
         // currentRow.remove();

         renderNewRow(currentNote[0]);
         categories[currentNote[0].category].archived--;
         renderCategories();

         // initSelectEvents();
         initArchiveNoteEvents();
         archivedRow.remove();
      });

      archivedRow.addEventListener('mouseleave', () => {
         archivedRow.style.backgroundColor = '#777777';
      });

      archivedRow.addEventListener('mouseenter', () => {
         console.log('MouseEnter');
         archivedRow.style.backgroundColor = '#ffffff';
      });
   });
}

function initArchiveNoteEvents() {
   count++;
   let archiveIcons = document.querySelectorAll('.fa-archive');
   console.log('Archive length Event listeners ', archiveIcons.length);
   const archiveAllIcon = archiveIcons[0];
   archiveIcons = Array.from(archiveIcons).slice(-(archiveIcons.length - 1));

   let archiveButtons = Array.from(archiveIcons).map(iconElement => iconElement.parentElement);

   archiveButtons.forEach(archiveButton => {
      archiveButton.addEventListener('click', onArchiveClick);
   });

   archiveAllIcon.addEventListener('click', () => {
      console.log('Archiveicon click');
      const archivedTable = document.querySelector('.archived-table');
      console.log('archivedNotes.length', archivedNotes.length);
      if (archivedNotes.length > 0) {
         if (count === 1) {
            archivedTable.classList.toggle('visible');
         }
         archivedTable.classList.toggle('visible');

         renderArchivedNoteList(archivedNotes);
         initArchiveRowsEvents();
      }
   });
}

function renderNewRow(newNote) {
   const tbody = document.querySelector('.table-body');

   const content = 'Some data' + parseInt(Math.random() * 200);

   if (newNote) {
      notes.push(newNote);
   } else {
      notes.push({
         name: '',
         created: new Date().toLocaleDateString('en-US', options),
         category: Object.keys(categoriesMap)[0],
         content,
         dates: '',
         command: '',
      });
   }

   const addedNote = notes[notes.length - 1];
   Object.defineProperty(addedNote, 'id', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: Math.random() * 200,
   });

   categories[addedNote.category].active++;
   console.log(notes);
   renderCategories();

   const noteFields = Object.keys(notes[0]);

   let str = `<tr data-id="${addedNote.id}"><td class="first-column">${categoriesMap[addedNote.category]}</td>`;
   for (let noteField of noteFields) {
      if (noteField === 'command') {
         str += `<td class="command"><button><i class="fas fa-pencil-alt"></i></button>
               <button><i class="fas fa-archive"></i></button>
               <button><i class="fas fa-trash"></i></button></td>`;
      } else if (noteField === 'category') {
         str += `<td>
                     <select data-field="${noteField}" disabled> 
                        <option value="Task" ${addedNote[noteField] === 'Task' ? 'selected' : ''}>Task</option>
                        <option value="Random Thought" ${
                           addedNote[noteField] === 'Random Thought' ? 'selected' : ''
                        }>Random Thought</option>
                        <option value="Idea" ${addedNote[noteField] === 'Idea' ? 'selected' : ''}>Idea</option>
                     </select></td>`;
      } else {
         str += `<td><input data-field="${noteField}" type="text" disabled value="${addedNote[noteField]}"></td>`;
      }
   }
   str += `</tr>`;
   tbody.innerHTML += str;

   initSelectEvents();
   initEditEvents();
   initDeleteEvents();
   initArchiveNoteEvents();
}

function initCreateNoteEvent() {
   const createNoteButton = document.querySelector('.create-note');
   createNoteButton.addEventListener('click', () => {
      const archivedTable = document.querySelector('.archived-table');
      // archivedTable.classList.toggle('visible');
      renderNewRow(null);
   });
}

function initDeleteEvents() {
   let deleteIcons = document.querySelectorAll('.fa-trash');
   deleteIcons = Array.from(deleteIcons).slice(-(deleteIcons.length - 1));

   let deleteButtons = Array.from(deleteIcons).map(iconElement => iconElement.parentElement);

   deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', event => {
         const currentRow = event.target.parentElement.parentElement.parentElement;

         const currentNoteIndex = notes.findIndex(note => note.content === currentRow.dataset.content);
         const currentNote = notes.splice(currentNoteIndex, 1);
         console.log(notes);
         currentRow.remove();

         categories[currentNote[0].category].active--;
         renderCategories();
      });
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
         let oldValue = null;
         const inputs = currentRow.querySelectorAll('input, select');

         inputs.forEach(input => {
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
               // if (input.dataset.field === 'content') {
               //    // currentRow.dataset.content = event.target.value;
               //    currentRow.dataset.content = oldValue;
               // }
               // console.log(currentRow);
               const currentNoteIndex = notes.findIndex(note => note.id.toString() === currentRow.dataset.id);

               notes[currentNoteIndex][input.dataset.field] = event.target.value;
               // if (input.dataset.field === 'content') {
               // currentRow.dataset.content = event.target.value;
               // oldValue = event.target.value;
               // }
               console.log(notes);
            });
         });
      });
   });
}
