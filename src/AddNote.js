import React from 'react';
import PropTypes from 'prop-types';
import NotefulContext from './NotefulContext';
import './AddNote.css';
import ErrorBoundary from './ErrorBoundary';

class AddNote extends React.Component {
  
    static contextType = NotefulContext;

    constructor(props) {
        super(props)
        this.noteNameInput = React.createRef();
        this.folderOfNoteInput = React.createRef();
        this.noteContentInput = React.createRef();
    }

  
    handleSubmit(event) {
        event.preventDefault();
        const noteName = this.noteNameInput.current.value;
        const folderOfNote = this.folderOfNoteInput.current.value;
        const noteContent = this.noteContentInput.current.value;
        this.context.onAddNote(noteName,folderOfNote,noteContent);
    }

    render() {
        
        return (
            <div className='addNoteApp'>
                <ErrorBoundary>
                <NotefulContext.Consumer>
                    {(value) => {
                        const folderOptions = value.folders.map(folder => 
                            <option key={folder.id} 
                            onChange={(e) => this.handleOptionChange(e)}
                            >
                            {folder.name}</option>);
                        return(
                            <form className='addNoteForm' onSubmit={(e) => {this.handleSubmit(e) 
                              this.props.history.push('/')}}>
                              <h3>Add a note below!</h3>
                              <label htmlFor='noteName'>Note Name:</label>
                              <input type='text' name='noteName' ref={this.noteNameInput} defaultValue="My New Note" required/>
                              <label htmlFor='folderOfNote'>Folder name of note:</label>
                              <select ref={this.folderOfNoteInput}>
                                {folderOptions}
                              </select>
                              <label htmlFor='noteContent'>Note Content:</label>
                              <textarea ref={this.noteContentInput}></textarea>
                              <input type="submit" defaultValue="Submit" className="submitButton"></input>
                            </form>
                        )
                    }} 
                </NotefulContext.Consumer>
                </ErrorBoundary>
            </div>
        )
    }
}

export default AddNote;

