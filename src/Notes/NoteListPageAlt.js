import React from 'react';
import './NoteListPage.css'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext';
import Moment from 'react-moment';
import 'moment-timezone';




export default class NoteListPage extends React.Component {
   static contextType = NotefulContext;

   constructor(props) {
    super(props)
   }

  handleDelete = note => {
    const { folders } = this.context
    const folderIdOfNote = note.folderid

    const folderOfNote = folders.filter(folder => folder.id === folderIdOfNote)
    const folderNameOfNote = folderOfNote[0].name                                        
  
    this.context.onDelete(note.id, folderIdOfNote, folderNameOfNote)
    this.props.history.push(`/folder/${folderNameOfNote}`)
  }

   render() {
    console.log('notelistpagealt called')
    console.log('NotesInFolder', this.context.notesInFolder)
    const { notesInFolder } = this.context
    console.log(notesInFolder)
    const noteItems = notesInFolder.map(note => {
      return (
        <NotefulContext.Consumer key={note.id}>
          {(value) => {
            return (
              <li key={note.id} className='Note_item'>
                <div className='Note'>
                <Link 
                  label="folderIdOfNote/note/noteName"
                  to={`/${note.folderid}/note/${note.name}`}
                  id={note.id}
                  onClick={(e)=> this.context.selectNote(note.id)}
                >
                <h2 className='Note_title'>{note.name}</h2>
                <p 
                    className = 'datePre'
                  >
                    Date modified on<Moment interval={0} format="Do MMM YYYY" className='modified'>{note.modified}</Moment> 
                  </p> 
                </Link>    
                <button className='Note_delete'
                  onClick={()=> this.handleDelete(note)}><p>Remove</p></button>     
                </div>
              </li>
            )
          }}
        </NotefulContext.Consumer>
      )})
    return (
      <ul className='Note_list'>
        {noteItems}
        <button
          type="button" 
          className="addNoteButton"
        >
          <Link 
            label="addnote"
            to={'/addnotealt'}
          >
            Add Note
          </Link> 
        </button>
      </ul>
    )
   }
}
