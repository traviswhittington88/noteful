import React from 'react';
import { Link } from 'react-router-dom';
import './NoteContentPage.css';

export default class NoteContentPage extends React.Component {
    constructor(props) {
        super(props)
    }
    
        render() {
            
            
            console.log(this.props)
            console.log(this.props.note)
            console.log(this.props.note[0])
            console.log(typeof(this.props.note.name));
           
            /*return (
                <ul className='note_content'>
                  <li key={note.id} className='note_item'>
                    <div className='note'>
                      <Link 
                        to={`note/${note.name}`}
                        id={note.id}
                      >
                        <h2 className='note_title'>{note.name}</h2>
                      </Link>
                      <button className='note_delete'>
                        <p>Remove</p>
                      </button>
                    </div>
                </li>
                </ul>
            );
            */
           return <div></div> }
        
    }
