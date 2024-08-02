import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Box, Text, Button, Input, Textarea } from '@chakra-ui/react';

const PopUpTodo = ({ estado, cambiarEstado, addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    const newTodo = {
      title,
      description,
      state: false,
      priority: false
    };
    addTodo(newTodo);
    setTitle('');
    setDescription('');
    cambiarEstado(false);
    
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'El TODO ha sido agregado correctamente',
    });
  };

  return (
    <Overlay estado={estado}>
      <Contenedor>
        <Formulario onSubmit={handleSubmit}>
          <Text as="h3" mb="4">Añadir Tarea</Text>
          <Box mb="4" width="100%">
            <Text as="label" htmlFor="title">Nombre</Text>
            <Input
              id="title"
              name="title"
              placeholder="Nombre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb="4"
              required
            />
          </Box>
          <Box mb="4" width="100%">
            <Text as="label" htmlFor="description">Descripción</Text>
            <Textarea
              id="description"
              name="description"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Box>
          <ButtonGroup>
            <Button onClick={() => cambiarEstado(false)} type="button">Cerrar</Button>
            <Button colorScheme="teal" type="submit">Crear</Button>
          </ButtonGroup>
        </Formulario>
      </Contenedor>
    </Overlay>
  );
};

const Overlay = styled.div`
  display: ${({ estado }) => (estado ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Contenedor = styled.div`
  width: 500px;
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;

  button {
    flex: 1;
    margin: 0 5px;
  }
`;

export default PopUpTodo;
