import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const Home = () => (
  <p>Welcome home! Go see the <InertiaLink href="/todos">Todos</InertiaLink></p>
)

export default Home
