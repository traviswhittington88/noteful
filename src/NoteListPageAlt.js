import React from 'react';
import './NoteListPage.css'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext';

export default class NoteListPage extends React.Component {
  constructor(props) {
    super(props)
  }
   static contextType = NotefulContext;
   render() {
    const { notes } = this.context
    const noteItems = notes.map(note => {
      return (
        <NotefulContext.Consumer>
          {(value) => {
            return (
              <li key={note.id} className='Note_item'>
                <div className='Note'>
                <Link 
                  to={`/folder/${note.name}`}
                  id={note.id}
                  onClick={(e)=> value.selectNote(note.id)}
                >
                <h2 className='Note_title'>{note.name}</h2>
                </Link>    
                <button className='Note_delete'><p>Remove</p></button>     
                </div>
              </li>
            )
          }}
        </NotefulContext.Consumer>
      )})
    return (

      <ul className='Note_list'>
        {noteItems}
      </ul>
    )
   }
  }
