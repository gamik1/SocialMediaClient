import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import { TbActivity } from "react-icons/tb";
import Logo from '../Logo.component/Logo.component';

import React , {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";

import {logoutCall} from "../../API/apiCalls";

function Navigation() {
    const { user , dispatch } = useContext(AuthContext);

    const handleLogout = ()=>{
      logoutCall(dispatch);
    };

    return (  
        
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/"><Logo width="50" height="50" /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            { user ?  <Nav.Link href="/success">Success</Nav.Link> : "" }
            { user ?  <Nav.Link href="/userHome">User Home</Nav.Link> : "" }
            { user ?  <Nav.Link href="/profile">Profile</Nav.Link> : "" }
            { user ?  <Nav.Link onClick={handleLogout}>Logout</Nav.Link> : "" }
          </Nav>
        </Container>
      </Navbar>
    
        );
}
 export default Navigation;