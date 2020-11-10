import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    
    const style = {
        marginRight: 10,
        color: 'black'
    }

    return (
        <div>
            <NavLink to="/" style={style}>Home</NavLink>
            <NavLink to="/about" style={style}>About</NavLink>
        </div>
    )
    
}

export default Navbar