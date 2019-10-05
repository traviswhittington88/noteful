import React from 'react';
import { Link } from 'react-router-dom';
import './NoteContentPage.css';
import NotefulContext from './NotefulContext'

export default class NoteContentPage extends React.Component {
  constructor(props) {
    super(props)
  }
  static contextType = NotefulContext;
  render() {     
    return (
      <NotefulContext.Consumer>
        {(value) => {
        
    
          return (
            <ul className='note_ul'>
              <li key={value.noteSelected[0].id} className='note_item'>
              <div className='note'>
              <Link 
                to={`note/${value.noteSelected[0].name}`}
                id={value.noteSelected[0].id}
              >
              <h2 className='note_title'>{value.noteSelected[0].name}</h2>
              </Link>
                <button className='note_delete'
                  onClick={()=> {value.onDelete(value.noteSelected[0].id)
                  this.props.history.push('/')}}
                >
                  <p>Remove</p>
                </button>
              </div>
              <section className='note_content'>
                <p>{value.noteSelected[0].content}</p>
              </section>
              </li>
            </ul>
          )
        }}
      </NotefulContext.Consumer>
    );
  }
}
