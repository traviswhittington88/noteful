import React from 'react';
import { Route, Link } from 'react-router-dom'
import NoteListPage from './NoteListPage'
import NoteListPageAlt from './NoteListPageAlt'
import Header from './Header'
import Sidebar from './Folder_Sidebar'
import NoteSidebar from './Note_Sidebar'
import './dummy-store'
import './App.css';
import dummyStore from './dummy-store';
import NoteContentPage from './NoteContentPage';
import NotefulContext from './NotefulContext'
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary';

class App extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
      folders: [],
      notes: [],
      newNotes: [],
      error: null,
      noteSelected: [{}],
      folderOfNote: "",
    }
  }

  handleAddNote = (noteName, folderName, content) => {
    console.log('handleAddNote called');
   const folderOfNote = this.state.folders.filter(folder => folder.name ===  folderName.toString())
    console.log(folderOfNote.name)
    const folderId = folderOfNote[0].id; 

   const obj = {
      method: 'POST',
      body: JSON.stringify({name: noteName, folderId: folderId, content: content}),
      headers: {
        'Content-Type': 'application/json'
      }
    } 
    fetch(`http://localhost:9090/notes`,obj)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
     
    })
    .then(note => { const newNoteList = this.state.notes.map(note => note);
      newNoteList.push(note)
  
      this.setState({notes: newNoteList});
      

    })
    .catch(error => this.setState({error:error.message})) 
  }



  handleAddFolder = (folderName) => { 
    console.log('handleAddFolder ran')
    
    const obj = {
      method: 'POST',
      body: JSON.stringify({name: folderName}),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    fetch(`http://localhost:9090/folders`,obj)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
    })
    .then(folder => {
      console.log(folder);
      folder.name = folderName
      const newFolders = this.state.folders.map(folder => {return folder});
      newFolders.push(folder);
      this.setState({folders:newFolders})
      
      })
    .catch(error => {this.setState({error: error.message})})

    fetch('http://localhost:9090/folders')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(folders => console.log(folders))
    .catch(err => {this.setState({error: err.message})})
    console.log(this.state.folders);
  
  }
  
  handleClickedFolder = (folderId) => {
    const newNoteList = this.state.notes.filter(note => note.folderId === folderId)
    this.setState({newNotes:newNoteList})
  }

  handleClickedTitle = () => {
    fetch('http://localhost:9090/notes')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(notes => this.setState({notes: notes}))
    .catch(err => {this.setState({error: err.message})})
  } 

  handleClickedNote = (noteId) => {
   
    const noteItem= this.state.notes.filter(note => note.id === noteId)
    this.setState({noteSelected:noteItem})
    const folderIdOfNote = noteItem[0].folderId;
    const folderOfNote = this.state.folders.filter(folder => folder.id === folderIdOfNote)
                        .map(item => {return item.name} )
    const folderName = folderOfNote.join();
    this.setState({folderOfNote: folderName});
  }
 
  deleteNote = (noteId) => {

    const notesRemaining = this.state.notes.filter(note =>  note.id !== noteId)
    this.setState({notes: notesRemaining});

  }
  componentDidMount() {
    
    fetch('http://localhost:9090/folders')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(folders => this.setState({folders:folders}))
    .catch(err => {this.setState({error: err.message})})

    fetch('http://localhost:9090/notes')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(notes => this.setState({notes: notes, newNotes: notes}))
    .catch(err => {this.setState({error: err.message})})
  }
  render() {
    console.log('notes in state',this.state.notes)
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.newNotes,
      noteSelected: this.state.noteSelected,
      folderOfNote: this.state.folderOfNote,
      selectNote: this.handleClickedNote,
      selectFolder: this.handleClickedFolder,
      clickTitle: this.handleClickedTitle,
      onDelete: this.deleteNote,
      onAddFolder: this.handleAddFolder,
      onAddNote: this.handleAddNote,
    }
  
  return (
    <div className="App">
    <ErrorBoundary>
    <NotefulContext.Provider value={contextValue}>
    <Route 
      exact
      path='/'
      render={() =>
        <React.Fragment>
          <Sidebar />
          <div className='column__wrapper'>
          <header className='App__header'>
            <Header/>
          </header>
          <main className='App__main'>
          
            <NoteListPage/>
          </main>
          </div>
        </React.Fragment> }
      />

    <Route
        path='/note/:notename'
        render={({ history }) => 
          <React.Fragment>
            <NoteSidebar history={history }/>
             <div className='column__wrapper'>
              <header className='App__header'>
                <Header/>
              </header>
              <main className='App__main'>
                <NoteContentPage history={history}/>
              </main>
              </div>
          </React.Fragment> }
    />

      <Route 
      path='/folder/:foldername'
      render={() =>
        <React.Fragment>
          <Sidebar />
          <div className='column__wrapper'>
          <header 
            className='App__header' 
          >
          <Header/>
          </header>
          <main className='App__main'>
          {console.log('contextvaluenotes',contextValue.notes)}
          <NoteListPageAlt/>
          </main>
          </div>
        </React.Fragment> }
      />
    
      <Route
        path='/:folderId/note/:notename'
        render={( { history }) => 
          <React.Fragment>
            <NoteSidebar history={history} />
             <div className='column__wrapper'>
              <header className='App__header'>
                <Header
                  clickTitle={this.handleClickedTitle} 
                />
              </header>
              <main className='App__main'>
                <NoteContentPage history={history}/>
              </main>
              </div>
          </React.Fragment> }
      />

      <Route
        path='/addfolder'
        render={({ history }) => 
          <React.Fragment>
            <AddFolder history={history} />
          </React.Fragment>
        }
      />

      <Route 
        path='/addnote'
        render={({ history }) => 
          <React.Fragment>
            <AddNote history={ history } />
          </React.Fragment>
        }
        />
      </NotefulContext.Provider>
      </ErrorBoundary>
    </div> 
  )
 }
}

export default App;
