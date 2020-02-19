import React from 'react'
import ReactDOM from 'react-dom'
import { InertiaApp } from '@inertiajs/inertia-react';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <InertiaApp
      initialPage={JSON.parse(app.dataset.page)}
      resolveComponent={name =>
        import(`../Pages/${name}`).then(module => module.default)
      }
    />,
    document.body.appendChild(document.createElement('div')),
  )
})
