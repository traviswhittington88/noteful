import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
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
