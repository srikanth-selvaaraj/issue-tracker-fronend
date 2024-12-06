import {
  Container,
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate(); 
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    try {
        localStorage.removeItem('access_token');
        navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Box px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Box fontWeight="bold" fontSize="lg" color="white">
          LOGO
        </Box>

        {/* Hamburger menu for mobile */}
        <IconButton
          size="md"
          icon={isOpen ? <FiX /> : <FiMenu />} // Use react-icons for Hamburger and Close icons
          aria-label="Toggle Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          color="white"
          variant="ghost"
        />

        {/* Desktop Menu */}
        <HStack
          as="nav"
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          color="white"
        >
          <Link to="/" px={4}>Home</Link>
          <Link to="/projects" px={4}>Projects</Link>
          <Link to="/issues" px={4}>Issues</Link>
          <Button onClick={handleLogout}>Logout</Button>
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4} color="white">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/issues">Issues</Link>
            <Link onClick={() => {handleLogout}}>Logout</Link>
          </Stack>
        </Box>
      )}
    </Box>
    </Container>
  );
};

export default NavigationBar;
