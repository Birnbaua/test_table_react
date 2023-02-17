import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavLink, Dropdown, Form, FormControl, Button } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "luxon"

function GameroundToolbar(props) {

    const[search, setSearch] = useState("")

    useEffect(() => {
        setSearch("")
    },[])

    

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
                <h1 style={{paddingTop: 10, paddingRight: 10, paddingLeft: 10}}>Vorrunde</h1>
                <Navbar.Toggle aria-controls='toolbarScroll' data-bs-target='#toolbarScroll'/>
                <NavbarCollapse id="toolbarScroll">
                    <Nav>
                        <Button variant="contained">Speichern</Button>
                    </Nav>
                    <Form className='d-flex' style={{position:'absolute',right:'0'}} >
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                    </Form>
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}

export default GameroundToolbar