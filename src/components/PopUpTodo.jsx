import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Flex, Text, Button, Input, Textarea } from '@chakra-ui/react';

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
          <Text textAlign="left" color="#333333" fontSize="20px" lineHeight="27.24px" fontWeight="700" as="h3" mb="4">Añadir Tarea</Text>
          <Flex flexDirection="column" mb="4" width="316px" height="100px">
            <Text   fontSize="14px" color="#555555" fontWeight="400" lineHeight="19.07px" as="label" htmlFor="title">Nombre</Text>
            <Input
              id="title"
              name="title"
              placeholder="Nombre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb="4"
              required
              height="35px"
              borderRadius="3px"
              border= "1px solid #C9C9C9"
              marginTop="20px"
            
            />
          </Flex>
          <Flex flexDirection="column"  height="40%" mb="4" width="316px">
            <Text fontSize="14px" color="#555555" fontWeight="400" lineHeight="19.07px" as="label" htmlFor="description">Descripción</Text>
            <Textarea
              marginTop="20px"
              id="description"
              name="description"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              height="156px"
              borderRadius="3px"
              border= "1px solid #C9C9C9"
              
            />
          </Flex>
          <ButtonGroup>
            <Button backgroundColor="#fff" color="#B3B3B3" onClick={() => cambiarEstado(false)} type="button">Cerrar</Button>
            <Button color="#fff" backgroundColor="#639605" type="submit">Crear</Button>
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
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Contenedor = styled.div`
  width: 360px;
  height: 443px;
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top:30px;
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
  margin-top: 46px;

  button {
    flex: 1;
    margin: 0 5px;
    width: 163px;
    height: 36px;
    border-radius:5px;
    border: none;
  }
`;

export default PopUpTodo;
