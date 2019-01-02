import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Book } from './BookShelf'

class SearchBar extends Component {

  state = {
    query: '',
    value: {}
  }

  onChangeInput = (query) => {
    if (query === ''){
      this.setState(() => ({
        query: '',
        value: {}
      }))
    } else {
      this.setState(() => (
        { query: query }
      ))
    }
    this.updateQuery(query)
  }

  updateQuery = (query) => {
    BooksAPI.search(query)
    .then((value) => {
      this.setState({
        value: (value === null || value === undefined || value.error) ? {} : value
      })
    })
  }

  filterBooks = (books, id) => {
    return books.filter((book) => (
      book.id === id
    ))
  }

  render() {
    const { query, value } = this.state
      return (
        <div>
          <div className="search-books-bar">
            <Link to='/' className='homepage-link'>
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">

              <input onChange={(event) => this.onChangeInput(event.target.value)}
              type="text" value={query}
              placeholder="Search by title or author"/>

            </div>

          </div><br/><br/>
          <div>
            <ol className="books-grid">
            {Object.values(value).map((book) => (
              <li key={book.id}>
                <Book bookCover={book.imageLinks ? book.imageLinks.thumbnail : ''}
                 bookTitle={book.title}
                 author={(book.authors !== null && book.authors !== undefined)
                        ? Object.values(book.authors).join(', ') : ''}
                 updateShelf={(book) => this.props.handleUpdate(book)}
                 bookInfo={book} bookList={this.props.books}/>
               </li>
            ))}
            </ol>
          </div>
        </div>
      )

  }
}

export default SearchBar;
