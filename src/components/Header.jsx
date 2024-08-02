import React from 'react'
import { Image, Box } from '@chakra-ui/react'
import Logo from '../assets/LogoTienda.png'
import Cart from '../assets/Cart.png'
import Login from '../assets/Login.png'
import Search from '../assets/Search.png'
import Menu from '../assets/Menu.png'
const Header = () => {
  return (
    <Box className="header">
        <Image w="23.63" h="21.22" src={Menu} />
        <Image w="23.63" h="21.22" src={Search} />
        <Image w="23.63" h="21.22" src={Logo} />
        <Image w="23.63" h="21.22" src={Cart} />
        <Image w="23.63" h="21.22" src={Login} />
    </Box>
  )
}

export default Header