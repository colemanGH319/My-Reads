import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {Book} from './BookShelf'

class SearchBar extends Component {

  state = {
    query: '',
    value: ''
  }

  updateQuery = (query) => {
    BooksAPI.search(query)
    .then((value) => {
      this.setState({
        query: query,
        value: value.error === "empty query" ? {} : value
      })
    })
  }

  onChangeInput = (query) => {
    if (query === ''){
      this.setState(() => ({
        query: '',
        value: {}
      }))
    } else {
      this.updateQuery(query)
    }
  }

  render() {

    const { query, value } = this.state
    const displayResults = value === ''
    ? {}
    : value
    console.log(displayResults)
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
            {Object.values(displayResults).map((book) => (
              <li key={book.id}>
                <Book bookCover={book.imageLinks ? book.imageLinks.thumbnail : ''}
                 bookTitle={book.title} author={book.authors}
                 updateShelf={(book) => this.props.handleUpdate(book)} bookInfo={book}/>
               </li>
            ))}
            </ol>
          </div>
        </div>
      )

  }
}

export default SearchBar;
