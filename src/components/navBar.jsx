import { Link } from 'react-router-dom';
import logo from '../assets/img/logoclinica.png'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../context/authContext';

const NavbarComponent = () => {
  const { user, isAuthenticated, logout} = useAuth(); // Obtiene user y isAuthenticated del contexto

  return (
    <Navbar bg="light" expand="lg" className="navbar-light">
      <Container className='d-flex justify-content-around'>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center justify-content-around">
          <img src={logo} className="logoclinica" alt="Logo" />
          <span className="text-wrapper-3">Clínica</span>
        </Navbar.Brand>
        <span className="text-wrapper-4">SePrice</span>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="text-wrapper">Home</Nav.Link>
            <Nav.Link as={Link} to="/turno" className="text-wrapper">Turnos</Nav.Link>
            <a className='nav-link text-wrapper' href="#servicios">Servicios</a>
            <Nav.Link as={Link} to="" className="text-wrapper">Contacto</Nav.Link>

            {/* Mostrar enlace basado en el rol de Administrativo */}
            {isAuthenticated && user.role === 'Administrativo' && (
              <>
                <Nav.Link as={Link} to="/acreditacion" className="text-wrapper-2">Acreditación</Nav.Link>
                <Nav.Link as={Link} to="/registroUsuario" className="text-wrapper-2">Registro</Nav.Link>
              </>
            )}

            {/* Mostrar enlace basado en el rol de MedicoPersonal */}
            {isAuthenticated && user.role === 'MedicoPersonal' && (
              <>
              <Nav.Link as={Link} to="/insumos" className="text-wrapper-2">Insumos</Nav.Link>
              <Nav.Link as={Link} to="/historia" className="text-wrapper-2">Historia Clinica</Nav.Link>
              <Nav.Link as={Link} to="/AgendaPacientes" className="text-wrapper-2">Agenda de Turnos</Nav.Link>
              </>
            )}

            {/* Mostrar enlace cuando no logueado */}
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/login" className="text-wrapper-2">Login</Nav.Link>
            )}

            {/* Mostrar enlace cuando esta logueado */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/" onClick={()=>{logout()}} className="text-wrapper-2">Salir</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default NavbarComponent;
