import React from 'react';
import './Folder_Sidebar.css'
import { Link } from 'react-router-dom';

export default function Sidebar(props) {
    function handleClick(e) {
      props.selectFolder(e.target.id)
    }

    const folderItems = props.folders.map(folder => {
        return <li 
                key={folder.id} 
                className='folderItem'>
                <Link 
                  to={`folder/${folder.name}`}
                  id={folder.id}
                  onClick={(e) => handleClick(e)}
                >
                  {folder.name}
                </Link>
                </li>
          });

    console.log(props.folders)
    return (
        <nav className='App__sidebar'>Sidebar
            <ul className='Sidebar__ul'>
              {folderItems}
            </ul>
        </nav>
    )
}