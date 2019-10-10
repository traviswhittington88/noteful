import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    newNotes: [],
    newFolders: [],
    otherNoteList: [],
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
