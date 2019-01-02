import React, {Component} from 'react';
import SelectShelf from './SelectShelf';


function Book(props) {
    const currentBook = props.bookList.filter((book) => (book.id === props.bookInfo.id))
    console.log(currentBook)
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + props.bookCover + '")' }}></div>
          <div className="book-shelf-changer">
            <SelectShelf onUpdateShelf={(book) => {props.updateShelf(book)}} book={props.bookInfo}
            currentShelf={currentBook.length > 0 ? currentBook[0].shelf : "none"}/>
          </div>
        </div>
        <div className="book-title">{props.bookTitle}</div>
        <div className="book-authors">{props.author}</div>
      </div>
    )
  }

class Shelf extends Component {

  render(){
    const { readStatus } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.readStatusDisplay}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.filter((book) => (
              book.shelf === readStatus
              )).map((book) => (
                <li key={book.id}>
                  <Book bookCover={book.imageLinks.thumbnail}
                   bookTitle={book.title} author={book.authors.join(', ')}
                   updateShelf={(book) => this.props.handleUpdate(book)} bookInfo={book}
                   bookList={this.props.books}/>
                </li>
            )) }
          </ol>
        </div>
      </div>
    )
  }

}


export default Shelf;
export {Book};
