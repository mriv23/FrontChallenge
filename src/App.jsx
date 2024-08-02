import React, { useState, useEffect } from "react";
import Todos from "./components/Todos";
import Header from "./components/Header";
import PopUpTodo from "./components/PopUpTodo";
import Swal from 'sweetalert2';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import styled from "styled-components";
import "./App.css";

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // Definir el estado activeTab
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error al obtener los TODOs');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error al obtener los TODOs:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (todo) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
      if (!response.ok) {
        throw new Error('Error al agregar el TODO');
      }
      const newTodo = await response.json();
      newTodo.id = Date.now();
      setTodos([newTodo, ...todos]);
      setModal(false); // Cerrar el modal después de agregar el TODO
    } catch (error) {
      console.error("Error al agregar el TODO:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        console.error(`Error al eliminar el TODO: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al eliminar el TODO:", error);
    }
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleUserDataSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = userData;

    if (!name || !email || !phone) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    // Aquí puedes manejar la lógica para guardar los datos del usuario
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Los datos han sido guardados correctamente',
    });
  };

  return (
    <Container>
      <Header />
      <Tabs>
        <TabList>
          <Tab className={activeTab === 0 ? 'active' : ''} onClick={() => setActiveTab(0)}>Mis datos</Tab>
          <Tab className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>Mis tareas</Tab>
          <Tab className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>Mis devoluciones</Tab>
        </TabList>
        <TabPanels>
          {activeTab === 0 && (
            <TabPanel>
              <Heading>Mis Datos</Heading>
              <form onSubmit={handleUserDataSubmit}>
                <Box mb="4" width="100%">
                  <Text as="label" htmlFor="name">Nombre</Text>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    value={userData.name}
                    onChange={handleUserDataChange}
                    mb="4"
                    required
                  />
                </Box>
                <Box mb="4" width="100%">
                  <Text as="label" htmlFor="email">Email</Text>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleUserDataChange}
                    mb="4"
                    required
                  />
                </Box>
                <Box mb="4" width="100%">
                  <Text as="label" htmlFor="phone">Teléfono</Text>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Teléfono"
                    value={userData.phone}
                    onChange={handleUserDataChange}
                    mb="4"
                    required
                  />
                </Box>
                <ButtonGroup>
                  <Button colorScheme="teal" type="submit">Guardar</Button>
                </ButtonGroup>
              </form>
            </TabPanel>
          )}
          {activeTab === 1 && (
            <TabPanel>
              <Heading>Mis Tareas</Heading>
              <Todos deleteTodo={handleDeleteTodo} todos={todos.slice(0, 3)} />
              <Button onClick={() => setModal(true)}>
                Añadir Tarea
              </Button>
              <PopUpTodo
                estado={modal}
                cambiarEstado={setModal}
                addTodo={handleAddTodo} // Pasar la función handleAddTodo correctamente
              />
            </TabPanel>
          )}
          {activeTab === 2 && (
            <TabPanel>
              <Heading>Mis Devoluciones</Heading>
              <p>Contenido relacionado con Mis Devoluciones.</p>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
  padding: 0;
  margin: 0 auto;
`;

const Tabs = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #e0e0e0;
`;

const Tab = styled.button`
  padding: 10px 0;
  margin: 0;
  height: auto;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: #555555;
  cursor: pointer;

  &:hover {
    color: #639605;
  }

  &.active {
    color: #639605;
    border-bottom: 2px solid #639605;
  }
`;

const TabPanels = styled.div`
  width: 100%;
`;

const TabPanel = styled.div`
  padding: 16px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
`;

export default App;
