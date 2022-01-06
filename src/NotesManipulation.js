import Render from './Render.js';
import { notes, categories, options} from './data.js';
import defineIdProperty from './helper.js';

class NotesManipulation {
   constructor(notes, archivedNotes, categories, render) {
      this.notes = notes;
      this.archivedNotes = archivedNotes;
      this.categories = categories;
      this.render = render;
     
   }
   #count = 0;

   #categoriesMap = {
      Task: '<div class="round-fon"><i class="fas fa-shopping-cart head"></i></div>',
      Idea: '<div class="round-fon"><i class="far fa-lightbulb head"></i></div>',
      'Random Thought': '<div class="round-fon"><i class="fas fa-user-md head"></i></div>',
      Quote: '<div class="round-fon"><i class="fas fa-quote-right head"></i></div>',
   };
   init() {
      console.log(this.notes);
      this.render.renderNoteList(this.notes);
       console.log(this.notes);
      this.render.renderCategories(this.categories);
       console.log(this.notes);
      this.initEditEvents();
       console.log(this.notes);
      this.initDeleteEvents();
       console.log(this.notes);

      this.initCreateNoteEvent();
       console.log(this.notes);

      this.initSelectEvents();
       console.log(this.notes);

      this.initArchiveNoteEvents();
       console.log(this.notes);

   }

   onAllArchiveShow = () => {
      const archivedTable = document.querySelector('.archived-table');
      if (this.archivedNotes && this.archivedNotes.length > 0) {
         if (this.#count === 1) {
            archivedTable.classList.toggle('visible');
         }
         archivedTable.classList.toggle('visible');

         this.render.renderArchivedNoteList(this.archivedNotes);
         this.initArchiveRowsEvents();
      }
   }
   onDeleteNote = event => {
      const currentRow = event.target.parentElement.parentElement.parentElement;

      const currentNoteIndex = this.notes.findIndex(note => note.content === currentRow.dataset.content);
      const currentNote = this.notes.splice(currentNoteIndex, 1);
      currentRow.remove();

      this.categories[currentNote[0].category].active--;
      this.render.renderCategories(this.categories);
   }

   onArchiveClick = event => {
      const currentRow = event.target.parentElement.parentElement.parentElement;

      const currentNoteIndex = this.notes.findIndex(note => note.id.toString() === currentRow.dataset.id);
      const currentNote = this.notes.splice(currentNoteIndex, 1);
      this.archivedNotes = this.archivedNotes.concat(currentNote);

      const lastArchivedNote = this.archivedNotes[this.archivedNotes.length - 1];
      defineIdProperty(lastArchivedNote);

      this.categories[currentNote[0].category].active--;
      this.categories[currentNote[0].category].archived++;
      this.initSelectEvents();
      this.render.renderCategories(this.categories);
      currentRow.remove();
   }

   onArchivedRowClick = event => {
      const currentRow = event.target.parentElement.parentElement;

      const currentArchivedNoteIndex = this.archivedNotes.findIndex(note => note.content === currentRow.dataset.content);
      const currentNote = this.archivedNotes.splice(currentArchivedNoteIndex, 1);

      this.appendNewRow(currentNote[0]);
      this.categories[currentNote[0].category].archived--;
      this.render.renderCategories(this.categories);

      this.initArchiveNoteEvents();
      currentRow.remove();
   }

   initSelectEvents() {
      const selectItems = document.querySelectorAll('select');

      selectItems.forEach(selectItem => {
         selectItem.addEventListener('change', event => {
            const currentRow = event.target.parentElement.parentElement;

            const currentNoteIndex = this.notes.findIndex(note => note.id.toString() === currentRow.dataset.id);
            const oldCategory = this.notes[currentNoteIndex].category;

            this.notes[currentNoteIndex].category = event.target.value;

            this.categories[oldCategory].active--;
            this.categories[this.notes[currentNoteIndex].category].active++;
            // Change first td icon according to the new category
            currentRow.children[0].innerHTML = this.#categoriesMap[this.notes[currentNoteIndex].category];
            // renderNoteList(this.notes);
            this.render.renderCategories(this.categories);
         });
      });
   }

   initArchiveRowsEvents() {
      const archivedTableBody = document.querySelector('.archived-table-body');
      const archivedRows = Array.from(archivedTableBody.children);

      archivedRows.forEach(archivedRow => {
         archivedRow.addEventListener('click', this.onArchivedRowClick);

         archivedRow.addEventListener('mouseleave', () => {
            archivedRow.style.backgroundColor = '#777777';
         });

         archivedRow.addEventListener('mouseenter', () => {
            archivedRow.style.backgroundColor = '#ffffff';
         });
      });
   }

   initArchiveNoteEvents() {
      this.#count++;
      let archiveIcons = document.querySelectorAll('.fa-archive');
      const allArchiveShowIcon = archiveIcons[0];
      archiveIcons = Array.from(archiveIcons).slice(-(archiveIcons.length - 1));

      let archiveButtons = Array.from(archiveIcons).map(iconElement => iconElement.parentElement);

      archiveButtons.forEach(archiveButton => {
         archiveButton.addEventListener('click', this.onArchiveClick);
      });

      allArchiveShowIcon.addEventListener('click', this.onAllArchiveShow);
   }

   appendNewRow(newNote) {
      const tbody = document.querySelector('.table-body');

      const content = 'Some data' + parseInt(Math.random() * 200);

      if (newNote) {
         this.notes.push(newNote);
      } else {
         this.notes.push({
            name: '',
            created: new Date().toLocaleDateString('en-US', options),
            category: Object.keys(this.categories)[0],
            content,
            dates: '',
            command: '',
         });
      }

      const addedNote = this.notes[this.notes.length - 1];
      defineIdProperty(addedNote);

      this.categories[addedNote.category].active++;
      this.render.renderCategories(this.categories);

      this.render.renderOneNote(addedNote, tbody);

      this.initSelectEvents();
      this.initEditEvents();
      this.initDeleteEvents();
      this.initArchiveNoteEvents();
   }

   initCreateNoteEvent() {
      const createNoteButton = document.querySelector('.create-note');
      createNoteButton.addEventListener('click', () => {
         this.appendNewRow(null);
      });
   }

   initDeleteEvents() {
      let deleteIcons = document.querySelectorAll('.fa-trash');
      deleteIcons = Array.from(deleteIcons).slice(-(deleteIcons.length - 1));

      let deleteButtons = Array.from(deleteIcons).map(iconElement => iconElement.parentElement);

      deleteButtons.forEach(deleteButton => {
         deleteButton.addEventListener('click', this.onDeleteNote);
      });
   }

   initEditEvents() {
      let isEditMode = false;

      const editIcons = document.querySelectorAll('.fa-pencil-alt');
      const editButtons = Array.from(editIcons).map(iconElement => iconElement.parentElement);
      editButtons.forEach(editButton => {
         editButton.addEventListener('click', event => {
            isEditMode = !isEditMode;
            // const tbody = document.querySelector('.table-body');
            const currentRow = event.target.parentElement.parentElement.parentElement;
            // let oldValue = null;
            const inputs = currentRow.querySelectorAll('input, select');

            inputs.forEach(input => {
               this.setInputEvents(input, isEditMode);
            });
         });
      });
   }

   setInputEvents(input, isEditMode) {
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
         const currentNoteIndex = this.notes.findIndex(note => note.id.toString() === currentRow.dataset.id);

         this.notes[currentNoteIndex][input.dataset.field] = event.target.value;
      });
   }
}

const render = new Render();

const notesManipulation = new NotesManipulation(notes, [], categories, render);
notesManipulation.init();
