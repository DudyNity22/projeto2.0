import React from 'react';
import "../../css/all.css";
import Logo from "../../Assets/icon-logo.svg";
import { Link } from 'react-router-dom';



function NavBar() {

    return (
        <header>
            <div className='Header-Container'>

                <div className='icon-sidebar'>
                    <i className="fa-solid fa-bars fa-xl"></i>
                </div>

                <div className='icon-unifique'>
                    <img src={Logo} alt='Unifique' />
                </div>

                <div className='icon-login'>
                    <i className="fa-solid fa-user fa-xl"></i>
                </div>
            </div>
        </header>
    )
}

export default NavBar;