import React, {Component} from 'react';

// Controlled Component to move books between shelves.
class SelectShelf extends Component {

  state = {
    value: this.props.currentShelf
  }

  shelfOptions = ["move", "none", "currentlyReading", "wantToRead", "read"]

  changeShelf = (book, value) => {
    book.shelf = value
    this.props.onUpdateShelf(book)
    this.setState({value: value})
  }

  render(){
    console.log(this.state.value)
    return(
      <select value={this.state.value} onChange={(event) => this.changeShelf(this.props.book, event.target.value)}>
        <option value="move" disabled>Move to...</option>
        <option value="none">None</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
      </select>
    )
  }
}

export default SelectShelf;
