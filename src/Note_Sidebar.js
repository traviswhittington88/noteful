import React from 'react';
import './Note_Sidebar.css';
import NotefulContext from './NotefulContext';

export default class NoteSideBar extends React.Component {
    static contextType = NotefulContext;
    render() {
    return(
    <NotefulContext.Consumer>
      {(value) => {
      return (
        <nav className='App__sidebar'>
          <div className='NoteContentPageNav'>
            <button 
              className='NavCircleButton'
              onClick={() => {this.props.history.push('/')}}
            >
              Back
            </button>
            <h3 className='folder-name'>{value.folderOfNote}</h3>
          </div>
        </nav>
        )
      }}
      </NotefulContext.Consumer>
        
        )
    }
}