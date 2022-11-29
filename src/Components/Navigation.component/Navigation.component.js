import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import { TbActivity } from "react-icons/tb";
import Logo from '../Logo.component/Logo.component';
import jwt from "jwt-decode";
import React , {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";

import {logoutCall} from "../../API/apiCalls";

function Navigation() {
    const { user , dispatch } = useContext(AuthContext);
    let _id = "noUser";
    if(user){
    const decoded = jwt(user.token);
     _id = decoded.user._id;
    }
    const handleLogout = ()=>{
      logoutCall(dispatch);
    };

    return (  
        
        <Navbar bg="light"  expand="lg">
        <Container fliud>
          <Navbar.Brand href="/"><Logo width="50" height="50" /><h4>Ping</h4></Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Nav className="d-flex" style={{ maxHeight: '100px' }}
          navbarScroll>
            {!user ? <Nav.Link href="/login">Login</Nav.Link> : ""}
            {!user ? <Nav.Link href="/register">Register</Nav.Link> : "" }
            { user ?  <Nav.Link href="/user/home">Home</Nav.Link> : "" }
            { user ?  <Nav.Link href="/user/profile">Profile</Nav.Link> : "" }
            { user ?  <Nav.Link onClick={handleLogout}>Logout</Nav.Link> : "" }
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
        );
}
 export default Navigation;