import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    newNotes: [],
    newFolders: [],
    otherNoteList: [],
    notesRemaining: [],
    noteSelected: {},
    folderOfNote: '',
    selectNote: () => {},
    selectFolder: () => {},
    clickTitle: () => {},
    onDelete: () => {},
    onAddFolder: () => {},
    onAddNote: () => {},
})

export default NotefulContext;
