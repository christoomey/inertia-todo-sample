import React from 'react';

const Todos = ({name, todos}) => (
  <div>
    <p>Hello, {name}!</p>

    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  </div>
)

export default Todos
