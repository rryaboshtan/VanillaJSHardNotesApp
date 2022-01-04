const todos = [
   {
      name: 'sdfd',
      created: 'sdfd',
      category: 'sdfd',
      content: 'sdfd',
      dates: 'sdfd',
      command: 'sdfd',
   },
   {
      name: 'sdfd',
      created: 'sdfd',
      category: 'sdfd',
      content: 'sdfd',
      dates: 'sdfd',
      command: 'sdfd',
   },
   {
      name: 'sdfd',
      created: 'sdfd',
      category: 'sdfd',
      content: 'sdfd',
      dates: 'sdfd',
      command: 'sdfd',
   },
   {
      name: 'sdfd',
      created: 'sdfd',
      category: 'sdfd',
      content: 'sdfd',
      dates: 'sdfd',
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

