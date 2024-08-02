import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Todos from "./components/Todos";
import Header from "./components/Header";
import PopUpTodo from "./components/PopUpTodo";
import Swal from 'sweetalert2';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import styled from "styled-components";
import "./App.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Mis datos", "Mis tareas", "Mis devoluciones", "Mis comunicaciones", "Mis mejores amigos"];
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

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos.slice(0, 2));
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

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Los datos han sido guardados correctamente',
    });
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    afterChange: (current) => setActiveTab(current)
  };

  return (
    <Container>
      <Header />
      <Tabs>
        <Slider {...settings}>
          {tabs.map((tab, index) => (
            <div key={index}>
              <Tab
                className={activeTab === index ? 'active tab' : 'tab'}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </Tab>
            </div>
          ))}
        </Slider>
      </Tabs>
      <TabPanels>
        {activeTab === 0 && (
          <TabPanel>
            <Heading>Mis Datos</Heading>
            <form className="formDatos" onSubmit={handleUserDataSubmit}>
              <Flex alignItems="center" flexDirection="column" mb="4" width="100%">
                <Text as="label" htmlFor="name" minWidth="100px">Nombre</Text>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  value={userData.name}
                  onChange={handleUserDataChange}
                  mb="4"
                  required
                />
              </Flex>
              <Flex alignItems="center" flexDirection="column" mb="4" width="100%">
                <Text as="label" htmlFor="email" minWidth="100px">Email</Text>
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
              </Flex>
              <Flex alignItems="center" flexDirection="column" mb="4" width="100%">
                <Text as="label" htmlFor="phone" minWidth="100px">Teléfono</Text>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Teléfono"
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  mb="4"
                  required
                />
              </Flex>
              <ButtonGroup>
                <Button type="submit">Guardar</Button>
              </ButtonGroup>
            </form>
          </TabPanel>
        )}
        {activeTab === 1 && (
          <TabPanel>
            <Heading>Mis Tareas</Heading>
            <Todos deleteTodo={handleDeleteTodo} todos={todos.slice(0, 3)} />
            <Flex className="btnContainer" justify="center" align="center">
              <Button className="btnAddTodo" onClick={() => setModal(true)}>
                Añadir Tarea
              </Button>
            </Flex>
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
          </TabPanel>
        )}
        {activeTab === 3 && (
          <TabPanel>
            <Heading>Mis Comunicaciones</Heading>
          </TabPanel>
        )}
        {activeTab === 4 && (
          <TabPanel>
            <Heading>Mis Mejores Amigos</Heading>
          </TabPanel>
        )}
      </TabPanels>
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
  background-color: #fff; /* Fondo blanco para la sección de tabs */
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #e0e0e0;
`;

const Tab = styled.button`
  padding: 10px 20px;
  margin: 0;
  height: auto;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: #555555;
  cursor: pointer;
  position: relative;
`;

const TabPanels = styled.div`
  width: 100%;
`;

const TabPanel = styled.div`
  padding: 16px;
`;

const Heading = styled.h2`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  margin: 20px 0;
  line-height: 27.24px;
  color: #555555;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 16px;

  button {
    width: 347px;
    height: 46px;
    border-radius: 5px;
    border: none;
    background-color: #639605;
    color: #fff;
  }
`;

export default App;
