const options = { month: 'long', day: 'numeric', year: 'numeric' };
let count = 0;
let todos = [
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

let archivedTodos = [];

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

console.log(todos);
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

function renderTodoList(todos) {
   const tbody = document.querySelector('.table-body');
   tbody.innerHTML = '';
   let str = '';
   for (let todo of todos) {
      const todoFields = Object.keys(todo);
      str += `<tr data-content="${todo.content}"><td class="first-column">${categoriesMap[todo.category]}</td>`;
      for (let todoField of todoFields) {
         if (todoField === 'command') {
            str += `<td class="command"><button><i class="fas fa-pencil-alt"></i></button>
               <button><i class="fas fa-archive"></i></button>
               <button><i class="fas fa-trash"></i></button></td>`;
         } else if (todoField === 'category') {
            str += `<td>
                     <select data-field="${todoField}"> 
                        <option value="value1" selected>Task</option>
                        <option value="value2">Random Thought</option>
                        <option value="value3">Idea</option>
                     </select></td>`;
         } else {
            str += `<td><input data-field="${todoField}" type="text" disabled value="${todo[todoField]}"></td>`;
         }
      }
      str += `</tr>`;
   }
   tbody.innerHTML = str;
   console.log(tbody);
}

function renderArchivedTodoList(archivedTodos) {
   const tbody = document.querySelector('.archived-table-body');
   tbody.innerHTML = '';
   let str = '';
   for (let todo of archivedTodos) {
      const todoFields = Object.keys(todo);
      str += `<tr data-content="${todo.content}"><td class="first-column">${categoriesMap[todo.category]}</td>`;
      for (let todoField of todoFields) {
         if (todoField === 'command') {
            str += '';
         } else {
            str += `<td><input data-field="${todoField}" type="text" disabled value="${todo[todoField]}"></td>`;
         }
      }
      str += `</tr>`;
   }
   tbody.innerHTML = str;

   console.log(tbody.parentElement);
}

const onArchiveClick = event => {
   const currentRow = event.target.parentElement.parentElement.parentElement;

   const currentTodoIndex = todos.findIndex(todo => todo.content === currentRow.dataset.content);
   const currentTodo = todos.splice(currentTodoIndex, 1);
   archivedTodos = archivedTodos.concat(currentTodo);

   console.log(archivedTodos);

   categories[currentTodo[0].category].active--;
   categories[currentTodo[0].category].archived++;
   renderCategories();
   currentRow.remove();
};
renderTodoList(todos);
renderCategories();
addEditEvents();
addDeleteEvents();
addCreateNoteEvent();

addArchiveNoteEvents();

function addArchiveRowsEvents() {
   const archivedTableBody = document.querySelector('.archived-table-body');
   const archivedRows = Array.from(archivedTableBody.children);

   archivedRows.forEach(archivedRow => {
      archivedRow.addEventListener('click', event => {
         const currentRow = event.target.parentElement.parentElement;

         const currentArchivedTodoIndex = archivedTodos.findIndex(todo => todo.content === currentRow.dataset.content);
         const currentTodo = archivedTodos.splice(currentArchivedTodoIndex, 1);
         console.log(todos);
         todos = todos.concat(currentTodo);
         // currentRow.remove();
         renderNewRow(currentTodo[0]);
         categories[currentTodo[0].category].archived--;
         renderCategories();

         addArchiveNoteEvents();
         archivedRow.remove();
      });

      archivedRow.addEventListener('mouseleave', () => {
         archivedRow.style.backgroundColor = '#777777';
      });

      archivedRow.addEventListener('mouseenter', event => {
         console.log('MouseEnter');
         archivedRow.style.backgroundColor = '#ffffff';
      });
   });
}

function addArchiveNoteEvents() {
   count++;
   let archiveIcons = document.querySelectorAll('.fa-archive');
   console.log('Archive length Event listeners ', archiveIcons.length);
   const archiveAllIcon = archiveIcons[0];
   archiveIcons = Array.from(archiveIcons).slice(-(archiveIcons.length - 1));

   // const archivedTable = document.querySelector('.archived-table');
   // archivedTable.classList.toggle('visible');

   let archiveButtons = Array.from(archiveIcons).map(iconElement => iconElement.parentElement);

   archiveButtons.forEach(archiveButton => {
      archiveButton.addEventListener('click', onArchiveClick);
   });

   archiveAllIcon.addEventListener('click', () => {
      console.log('Archiveicon click');
      const archivedTable = document.querySelector('.archived-table');
      console.log('archivedTodos.length', archivedTodos.length);
      if (archivedTodos.length > 0) {
         if (count === 1) {
            archivedTable.classList.toggle('visible');
         }
         archivedTable.classList.toggle('visible');

         renderArchivedTodoList(archivedTodos);
         addArchiveRowsEvents();
      }
   });
}

function renderNewRow(newTodo) {
   const tbody = document.querySelector('.table-body');

   const content = 'Some data' + parseInt(Math.random() * 200);

   if (newTodo) {
      todos.push(newTodo);
   } else {
      todos.push({
         name: '',
         created: new Date().toLocaleDateString('en-US', options),
         // category: todos[0].category,
         category: Object.keys(categoriesMap)[0],
         content,
         dates: '',
         command: '',
      });
   }

   categories[todos[todos.length - 1].category].active++;
   renderCategories();

   const todoFields = Object.keys(todos[0]);
   const addedTodo = todos[todos.length - 1];

   let str = `<tr data-content="${content}"><td class="first-column">${categoriesMap[addedTodo.category]}</td>`;
   for (let todoField of todoFields) {
      if (todoField === 'command') {
         str += `<td class="command"><button><i class="fas fa-pencil-alt"></i></button>
               <button><i class="fas fa-archive"></i></button>
               <button><i class="fas fa-trash"></i></button></td>`;
      } else {
         str += `<td><input data-field="${todoField}" type="text" disabled value="${addedTodo[todoField]}"></td>`;
      }
   }
   str += `</tr>`;
   tbody.innerHTML += str;

   addEditEvents();
   addDeleteEvents();
}

function addCreateNoteEvent() {
   const createNoteButton = document.querySelector('.create-note');
   createNoteButton.addEventListener('click', () => {
      const archivedTable = document.querySelector('.archived-table');
      archivedTable.classList.toggle('visible');
      renderNewRow(null);
      addArchiveNoteEvents();
   });
}

function addDeleteEvents() {
   let deleteIcons = document.querySelectorAll('.fa-trash');
   deleteIcons = Array.from(deleteIcons).slice(-(deleteIcons.length - 1));

   let deleteButtons = Array.from(deleteIcons).map(iconElement => iconElement.parentElement);

   deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', event => {
         const currentRow = event.target.parentElement.parentElement.parentElement;

         const currentTodoIndex = todos.findIndex(todo => todo.content === currentRow.dataset.content);
         const currentTodo = todos.splice(currentTodoIndex, 1);
         console.log(todos);
         currentRow.remove();

         categories[currentTodo[0].category].active--;
         renderCategories();
      });
   });
}

function addEditEvents() {
   let isEditMode = false;

   const editIcons = document.querySelectorAll('.fa-pencil-alt');
   const editButtons = Array.from(editIcons).map(iconElement => iconElement.parentElement);
   editButtons.forEach((editButton, index) => {
      editButton.addEventListener('click', event => {
         isEditMode = !isEditMode;
         const tbody = document.querySelector('.table-body');
         const currentRow = event.target.parentElement.parentElement.parentElement;
         let oldValue = null;
         const inputs = currentRow.querySelectorAll('input');

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
               if (input.dataset.field === 'content') {
                  currentRow.dataset.content = event.target.value;
                  currentRow.dataset.content = oldValue;
               }
               console.log(currentRow);
               const currentTodoIndex = todos.findIndex(todo => todo.content === currentRow.dataset.content);

               todos[currentTodoIndex][input.dataset.field] = event.target.value;
               if (input.dataset.field === 'content') {
                  currentRow.dataset.content = event.target.value;
                  oldValue = event.target.value;
               }
               console.log(todos);
            });
         });
      });
   });
}
