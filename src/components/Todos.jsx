import React from 'react';
import { Text, Flex, Box } from '@chakra-ui/react';
import { ReactSVG } from 'react-svg';
import Basura from '../assets/trash.svg';

const Todos = ({ todos, deleteTodo }) => {
  return (
    <ul className='todoList'>
      {todos.map(todo => (
        <li className="tarea" key={todo.id}>
          <Flex className='card-todo'>
            <Box>
              <Text fontWeight="600" lineHeigh="21.79" color="#333333" w="380px" marginLeft="10px" textAlign="left" className='todoTitle' fontSize="16px" as="h3">{todo.title}</Text>
              <Text fontWeight="400" lineHeigh="16.34" color="#777777" fontSize="12px" w="380px" marginLeft="10px" textAlign="left">Lorem, ipsum dolor </Text>
            </Box>
            <button className='btn-delete' onClick={() => deleteTodo(todo.id)}>
              <ReactSVG className='svg' src={Basura} width="50px" height="50px" />
            </button>
          </Flex>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
