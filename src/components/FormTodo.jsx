import React, { useState } from 'react';

const FormTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      state: false,
      priority: false
    };
    addTodo(newTodo);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        required
      />
      <button type="submit">Agregar TODO</button>
    </form>
  );
};

export default FormTodo;
