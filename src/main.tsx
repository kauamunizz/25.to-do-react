import React from 'react';
import ReactDOM from 'react-dom/client';
import Todo from './Pages/Home/Todo';
import '../src/Pages/Home/styles.scss';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
)
