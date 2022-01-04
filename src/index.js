const todos = [
   {
      name: 'Shopping list',
      created: 'sdfd',
      category: 'Task',
      content: 'tomatoes, bread',
      dates: '',
      command: 'sdfd',
   },
   {
      name: 'The teory of evolution',
      created: 'sdfd',
      category: 'Random Thought',
      content: 'The evolution...',
      dates: '',
      command: 'sdfd',
   },
   {
      name: 'New feature',
      created: 'sdfd',
      category: 'Idea',
      content: 'Implement new...',
      dates: '3/5/2021, 5/5/2021',
      command: 'sdfd',
   },
   {
      name: 'William Gaddis',
      created: 'sdfd',
      category: 'Quote',
      content: 'Power doesn\'t co',
      dates: '',
      command: 'sdfd',
   },
   {
      name: 'Books',
      created: 'sdfd',
      category: 'Task',
      content: 'The Lean Startup',
      dates: '',
      command: 'sdfd',
   },
];

console.log(todos);
function renderTodoList(todos) {
   const tbody = document.querySelector('.table-body');
   tbody.innerHTML = '';
   let str = '';
   for (const todo of todos) {
      // tbody.innerHTML += '<tr>';
      const todoFields = Object.keys(todo);
      str += '<tr>';
      for (const todoField of todoFields) {
         str += `<td>${todo[todoField]}</td>`;
      }
      str += `</tr>`;
   }
   tbody.innerHTML = str;
   console.log(tbody);
}

renderTodoList(todos);

