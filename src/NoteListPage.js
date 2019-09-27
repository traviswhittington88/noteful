import React from 'react';
import './NoteListPage.css'
import { Link } from 'react-router-dom'

export default function NoteListPage(props) {

   const noteItems = props.notes.map(note => {
     return (<li key={note.id} className='Note_item'>
                <div className='Note'>
                <Link 
                  to={`note/${note.name}`}
                  id={note.id}
                  onClick={(e)=> props.selectNote(note.id)}
                >
                 <h2 className='Note_title'>{note.name}</h2>
                </Link>
                
                <button className='Note_delete'><p>Remove</p></button>
                
                
                </div>
              </li>
     );
   })
    return (
          <ul className='Note_list'>
            {noteItems}
          </ul>
    )
}
