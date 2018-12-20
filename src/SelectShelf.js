import React, {Component} from 'react';

// Controlled Component to move books between shelves.
class SelectShelf extends Component {

  state = {
    value: ''
  }

  updateShelf = (value) => {
    this.setState({
      value: value
    })

    console.log(this.props.bookInfo)
  }

  //(event) => this.updateShelf(event.target.value)

  //onChange={(event) => {this.props.onUpdateShelf(event.target.value)}}

  changeShelf = (book, value) => {
    book.shelf = value
    this.props.onUpdateShelf(book)
    console.log(book.shelf)
  }

  render(){
    return(
      <select value={this.state.value} onChange={(event) => this.changeShelf(this.props.book, event.target.value)}>
        <option value="move">Move to...</option>
        <option value="none">None</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
      </select>
    )
  }
}

export default SelectShelf;
