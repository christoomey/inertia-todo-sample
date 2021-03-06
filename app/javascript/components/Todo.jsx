import React, { useState, forwardRef } from 'react';

export const Todo = forwardRef(({todo, onDelete, onUpdate, toggleComplete}, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateTitle = (e) => {
    if (e.key === 'Enter') {
      onUpdate(todo.id, { title: e.target.value }).then(() => {
        setIsEditing(false);
      })
    }
  }

  const onDeleteClick = () => {
    setIsLoading(true);
    onDelete(todo.id)
  }

  const onCompleteToggle = () => {
    setIsLoading(true);
    toggleComplete(todo).then(() => setIsLoading(false));
  }


  return (
    <li key={todo.id} ref={ref}>
      <span className="actions">
        <button onClick={onCompleteToggle} disabled={isLoading}>
          {todo.complete ? '[x]' : '[ ]'}
        </button>
        <button onClick={onDeleteClick} disabled={isLoading}>X</button>{' '}
      </span>
      {isEditing
        ? <input autoFocus type="text" defaultValue={todo.title} onKeyDown={updateTitle} />
        : <span onClick={isLoading ? null : () => setIsEditing(true)}>{todo.title}</span>
      }
    </li>
  )
})
