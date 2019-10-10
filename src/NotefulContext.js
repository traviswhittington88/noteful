import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    newNotes: [],
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
