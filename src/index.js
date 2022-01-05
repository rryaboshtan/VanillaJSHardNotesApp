const options = { month: 'long', day: 'numeric', year: 'numeric' };
const todos = [
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
      category: 'Quote',
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
const categories = {
   Task: '<div class="round-fon"><i class="fas fa-shopping-cart head"></i></div>',
   Idea: '<div class="round-fon"><i class="far fa-lightbulb head"></i></div>',
   'Random Thought': '<div class="round-fon"><i class="fas fa-user-md head"></i></div>',
   Quote: '<div class="round-fon"><i class="fas fa-quote-right head"></i></div>',
};

console.log(todos);
function renderTodoList(todos) {
   const tbody = document.querySelector('.table-body');
   tbody.innerHTML = '';
   let str = '';
   for (let todo of todos) {
      const todoFields = Object.keys(todo);
      str += `<tr data-content="${todo.content}"><td class="first-column">${categories[todo.category]}</td>`;
      for (let todoField of todoFields) {
         if (todoField === 'command') {
            str += `<td class="command"><button><i class="fas fa-pencil-alt"></i></button>
               <button><i class="fas fa-archive"></i></button>
               <button><i class="fas fa-trash"></i></button></td>`;
         } else {
            str += `<td><input data-field="${todoField}" type="text" disabled value="${todo[todoField]}"></td>`;
         }
      }
      str += `</tr>`;
   }
   tbody.innerHTML = str;
   console.log(tbody);
}

renderTodoList(todos);
addEditEvents();
addDeleteEvents();
addCreateNoteEvent();
function renderNewRow() {
   const tbody = document.querySelector('.table-body');
   const todoFields = Object.keys(todos[0]);
   const content = 'Some data' + parseInt(Math.random() * 200);

   todos.push({
      name: '',
      created: new Date().toLocaleDateString('en-US', options),
      category: todos[0].category,
      content,
      dates: '',
      command: '',
   });
   const addedTodo = todos[todos.length - 1];

   let str = `<tr data-content="${content}"><td class="first-column">${categories[addedTodo.category]}</td>`;
   for (let todoField of todoFields) {
      if (todoField === 'command') {
         str += `<td class="command"><button><i class="fas fa-pencil-alt"></i></button>
               <button><i class="fas fa-archive"></i></button>
               <button><i class="fas fa-trash"></i></button></td>`;
      } else {
         // let value = todoField === 'category' ? todos[0].category : ''
         // let value = todoField === 'content' ? content : todoField === 'category' ? todos[0].category : '';
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
      renderNewRow();
   });
}

function addDeleteEvents() {
   let deleteIcons = document.querySelectorAll('.fa-trash');
   deleteIcons = Array.from(deleteIcons).slice(-5);

   let deleteButtons = Array.from(deleteIcons).map(iconElement => iconElement.parentElement);

   deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', event => {
         const currentRow = event.target.parentElement.parentElement.parentElement;

         const currentTodoIndex = todos.findIndex(todo => todo.content === currentRow.dataset.content);
         todos.splice(currentTodoIndex, 1);
         console.log(todos);
         currentRow.remove();
      });
   });
}

function addEditEvents() {
   let isEditMode = false;
   let oldValue = null;

   const editIcons = document.querySelectorAll('.fa-pencil-alt');
   const editButtons = Array.from(editIcons).map(iconElement => iconElement.parentElement);
   editButtons.forEach((editButton, index) => {
      editButton.addEventListener('click', event => {
         isEditMode = !isEditMode;
         const tbody = document.querySelector('.table-body');
         const currentRow = event.target.parentElement.parentElement.parentElement;

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
               // currentRow.dataset.content = oldValue;
               console.log(currentRow);
               const currentTodoIndex = todos.findIndex(todo => todo.content === currentRow.dataset.content);
               //  todos.splice(currentTodoIndex, 1);
               todos[currentTodoIndex][input.dataset.field] = event.target.value;
               if (input.dataset.field === 'content') {
                  currentRow.dataset.content = event.target.value;
               }
               // oldValue = event.target.value;
               console.log(todos);
            });
         });
      });
   });
}
