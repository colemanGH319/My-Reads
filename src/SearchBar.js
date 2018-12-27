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
        value: value
      })
    })
  }

  render() {

    const { value } = this.state
      return (
        <div>
          <div className="search-books-bar">
            <Link to='/' className='homepage-link'>
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">

              <input onChange={(event) => this.updateQuery(event.target.value)}
              type="text" value={this.state.query}
              placeholder="Search by title or author"/>

            </div>

          </div><br/><br/>
          <div>
            <ol className="books-grid">
            {Object.values(value).map((book) => (
              <li key={book.id}>
                <Book bookCover={book.imageLinks.thumbnail}
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
