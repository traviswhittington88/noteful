import React from 'react';
import './AddFolder.css';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

export default class AddFolder extends React.Component {
  static contextType = NotefulContext;
  constructor(props) {
      super(props)
      this.folderNameInput = React.createRef();
  }
 
  handleSubmit(event) {
    event.preventDefault();
    const folderName = this.folderNameInput.current.value;
    this.context.onAddFolder(folderName);
  }
  render() {
    return (
      <div className="AddFolderApp">
        <NotefulContext.Consumer>
          {(value) => {
            return (
          <form 
          className="AddFolderForm"
          onSubmit={(e) => {this.handleSubmit(e)
            this.props.history.push('/');
          }}
          >
          <label htmlFor="folderName">Folder Name: 
          <input type="text" name="folderName" ref={this.folderNameInput} required />
          </label>
          <input type="submit" defaultValue="Submit"  />
          </form>) 
        }}
        </NotefulContext.Consumer>
      </div>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object.isRequired
};