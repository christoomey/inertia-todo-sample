import React, { useState, forwardRef } from 'react';

export const Todo = forwardRef(({todo, onDelete, onUpdate}, ref) => {
  const [isEditing, setIsEditing] = useState(false);

  const updateTitle = (e) => {
    if (e.key === 'Enter') {
      onUpdate(todo.id, { title: e.target.value }).then(() => {
        setIsEditing(false);
      })
    }
  }

  return (
    <li key={todo.id} ref={ref}>
      <button onClick={() => onDelete(todo.id)}>X</button>{' '}
      {isEditing
        ? <input autoFocus type="text" defaultValue={todo.title} onKeyDown={updateTitle} />
        : <span onClick={() => setIsEditing(true)}>{todo.title}</span>
      }
    </li>
  )
})
