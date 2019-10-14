import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    newFolders: [],
    notes: [],
    newNotes: [],
    otherNoteList: [],
    noteSelected: {},
    folderOfNote: '',
    selectNote: () => {},
    selectFolder: () => {},
    clickTitle: () => {},
    onDelete: () => {},
    onDeleteAlt: () => {},
    onAddFolder: () => {},
    onAddNote: () => {},
    updatePath: () => {},  
})

export default NotefulContext;
