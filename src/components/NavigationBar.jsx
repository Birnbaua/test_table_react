import React from 'react';
import { Nav, Navbar, NavLink, Dropdown, Form, FormControl, Button } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Link } from 'react-router-dom';

const NavigationBar=()=>{
    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Navbar.Brand href="/home" variant="dark" style={{paddingLeft:'10px'}}>Test</Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-target='#navbarScroll'/>
            <NavbarCollapse id="navbarScroll">
                <Nav>
                    <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                    <NavLink eventKey="2" as={Link} to="/contact">Contact</NavLink>
                    <NavLink eventKey="3" as={Link} to="/about">About</NavLink>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                <Form className='d-flex' style={{position:'absolute',right:'0'}} >
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    />
                    <Button variant="dark">
                        Search
                    </Button>
                </Form>
            </NavbarCollapse>
        </Navbar>
    );
}

export default NavigationBar;