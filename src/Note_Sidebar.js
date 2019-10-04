import React from 'react';
import './Note_Sidebar.css';
import NotefulContext from './NotefulContext';

export default class NoteSideBar extends React.Component {
    constructor(props) {
      super(props)
    }
    static contextType = NotefulContext;
    render() {
    const { folderName } = this.context;
    
    return(
    <NotefulContext.Consumer>
      {(value) => {
        console.log(value)
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