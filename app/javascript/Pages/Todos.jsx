import React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { parseForm } from "../util/parseForm"
import { motion } from 'framer-motion'

const Todos = ({name, todos}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    Inertia.post('/todos', { todo: parseForm(e.target) }).then(() => form.reset())
  }

  return (
    <div>
      <p>Hiya, {name}!</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <input type="submit" value="Create" />
      </form>

      <ul>
        {todos.map(todo => (
          <motion.li
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            key={todo.id}
          >
            {todo.title}
          </motion.li>
        ))}
      </ul>
    </div>
      )
}

export default Todos
