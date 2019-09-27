import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header(props) {
 function handleClick(e) {
    props.clickTitle();
  }
    return (
            <h1 className='Header_title'>
              <Link 
                to='/'
                onClick={(e) => handleClick(e)}>
                Noteful
              </Link>
            </h1>
    )
}