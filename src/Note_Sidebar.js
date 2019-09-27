import React from 'react';
import './Note_Sidebar.css';

export default class NoteSideBar extends React.Component {
    constructor(props) {
        super(props) 
    }
    render() {
    const { folderName } = this.props;
    console.log(folderName)
    return(
        <nav className='App__sidebar'>
          <div className='NoteContentPageNav'>
            <button className='NavCircleButton'>
              Back
            </button>
            <h3 className='folder-name'>{folderName}</h3>
          </div>
        </nav>
        )
    }
}