import React from 'react';
import './Folder_Sidebar.css'
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';

export default class Sidebar extends React.Component  {
  static contextType = NotefulContext;

render() {
  
  const { folders } = this.context;
  const folderItems = folders.map(folder => {
    return (
    <NotefulContext.Consumer key={folder.id}>
    {(value) => {
      console.log(value)
    return (
    <li 
      key={folder.id} 
      className='folderItem'>
        <Link 
          to={`/folder/${folder.name}`}
          id={folder.id}
          onClick={(e) => value.selectFolder(e.target.id)}
        >
          {folder.name}
        </Link>
        </li>
    )
      }}
      </NotefulContext.Consumer>
    )
    });

    console.log(this.context.folders)
    return (
        <nav className='App__sidebar'>Sidebar
            <ul className='Sidebar__ul'>
              {folderItems}
            </ul>
        </nav>
    )
}
}