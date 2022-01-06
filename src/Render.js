class Render {
   constructor(notes, archivedNotes, categories) {
      this.notes = notes;
      this.archivedNotes = archivedNotes;
      this.categories = categories;
   }

   #categoriesMap = {
      Task: '<div class="round-fon"><i class="fas fa-shopping-cart head"></i></div>',
      Idea: '<div class="round-fon"><i class="far fa-lightbulb head"></i></div>',
      'Random Thought': '<div class="round-fon"><i class="fas fa-user-md head"></i></div>',
      Quote: '<div class="round-fon"><i class="fas fa-quote-right head"></i></div>',
   };

   renderCategories() {
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
   }

   renderOneNote(note, tBody = null) {
      const noteFields = Object.keys(note);
      let str = `<tr data-id="${note.id}"><td class="first-column">${this.#categoriesMap[note.category]}</td>`;
      for (let noteField of noteFields) {
         if (noteField === 'command') {
            str += `<td class="command"><button><i class="fas fa-pencil-alt"></i></button>
               <button><i class="fas fa-archive"></i></button>
               <button><i class="fas fa-trash"></i></button></td>`;
         } else if (noteField === 'category') {
            str += renderCategoryField(note, noteField);
         } else {
            str += `<td><input data-field="${noteField}" type="text" disabled value="${note[noteField]}"></td>`;
         }
      }
      str += `</tr>`;
      if (tBody) {
         tBody.innerHTML += str;
      }
      //   else {
      //      return str;
      //   }
   }

   renderCategoryField(note, noteField) {
      return `<td>
            <select data-field="${noteField}" disabled> 
            
               <option value="Task" ${note[noteField] === 'Task' ? 'selected' : ''}>Task</option>
               <option value="Random Thought" ${note[noteField] === 'Random Thought' ? 'selected' : ''}>Random Thought</option>
               <option value="Idea" ${note[noteField] === 'Idea' ? 'selected' : ''}>Idea</option>
            </select></td>`;
   }

   renderNoteList(notes) {
      const tbody = document.querySelector('.table-body');
      tbody.innerHTML = '';
      let str = '';
      for (let note of notes) {
         defineIdProperty(note);
         renderOneNote(note, tbody);
      }
   }

   renderArchivedNoteList(archivedNotes) {
      const tbody = document.querySelector('.archived-table-body');
      tbody.innerHTML = '';
      let str = '';
      for (let note of archivedNotes) {
         const noteFields = Object.keys(note);
         str += `<tr data-id="${note.id}"><td class="first-column">${this.#categoriesMap[note.category]}</td>`;
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
   }
}

export default Render;
