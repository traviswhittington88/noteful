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

class App extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
      folders: [],
      notes: [],
      
      noteSelected: [{}],
      folderOfNote: "",
    }
  }

  handleClickedFolder = (folderId) => {
    const newNoteList = dummyStore.notes.filter(note => note.folderId === folderId)
    this.setState({notes:newNoteList});
  }

  handleClickedTitle = () => {
    console.log('handleClickedTitle was called')
    this.setState({notes:dummyStore.notes});
  }

  handleClickedNote = (noteId) => {
    console.log('handleClickedNote called')
    const noteItem= this.state.notes.filter(note => note.id === noteId)
    this.setState({noteSelected:noteItem})
    const folderIdOfNote = noteItem[0].folderId;
    const folderOfNote = this.state.folders.filter(folder => folder.id === folderIdOfNote)
                        .map(item => {return item.name} )
    const folderName = folderOfNote.join();
    this.setState({folderOfNote: folderName});
  }
 
  deleteNote = (noteId) => {
    console.log('deleteNote was called')
    const notesRemaining = this.state.notes.filter(note =>  note.id !== noteId)
    this.setState({notes: notesRemaining});

  }
  componentDidMount() {
    console.log('component did mount ran')
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
    .then(notes => this.setState({notes: notes}))
    .catch(err => {this.setState({error: err.message})})
  }
  render() {
    
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      noteSelected: this.state.noteSelected,
      folderOfNote: this.state.folderOfNote,
      selectNote: this.handleClickedNote,
      selectFolder: this.handleClickedFolder,
      clickTitle: this.handleClickedTitle,
      onDelete: this.deleteNote,
    }
    
  return (
    <div className="App">
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
          <NoteListPageAlt/>
          </main>
          </div>
        </React.Fragment> }
      />
    
      <Route
        path='/:folderId/note/:notename'
        render={( { history }) => 
          <React.Fragment>
            {console.log('the /folderid/note/noteid path was called')}
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
      </NotefulContext.Provider>
    </div> 
  )
 }
}

export default App;
