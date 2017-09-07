import React from 'react';
import './NavBar.css'
import {
  Navbar,
  NavItem
} from 'react-materialize'

const NavBar = (props) => {
    let nav = props.user ?
        <div>
            <Navbar className="nav-style main-font padder">
                <span style={{marginLeft:'50%'}} >WELCOME {props.user.name.toUpperCase()} </span>
                <NavItem href ='/'>Home</NavItem>
                <NavItem href="/watchlist" >Watchlist</NavItem>
                <NavItem href="/" onClick={props.handleLogout}>Logout</NavItem>
            </Navbar>
        </div> :
        <div>
            <Navbar className="nav-style" right>
                <NavItem href="/signup">Sign Up</NavItem>
                <NavItem href="/login">Log In</NavItem>
            </Navbar>
        </div>;

    return (
        <div>
            {nav}
        </div>
    );
};

export default NavBar;
