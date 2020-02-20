import React from 'react';

export const Todo = React.forwardRef(({todo, handleDelete}, ref) => {
  return (
    <li key={todo.id} ref={ref}>
      <button onClick={() => handleDelete(todo.id)}>X</button>
      {todo.title}
    </li>
  )
})
