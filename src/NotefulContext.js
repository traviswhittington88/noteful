import React from 'react'

const NotefulContext = React.createContext({
    folders: [],
    notes: [],
    noteSelected: {},
    folderOfNote: '',
    selectNote: () => {},
})

export default NotefulContext;
