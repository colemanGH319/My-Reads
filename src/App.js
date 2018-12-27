import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './BookShelf'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //Pairing shelf statuses with their corresponding display titles
  shelves = [["currentlyReading", "Currently Reading"], ["wantToRead", "Want to Read"], ["read", "Read"]]

  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  //Handler for changes to a book's shelf
  update = (book) => {
    this.setState((currentState) => ({
      books: [...currentState.books.filter((b) => {
        return b.id !== book.id
      }), book]
    }))
    BooksAPI.update(book, book.shelf)
  }



  render() {
    // Destructuring books from app state, then passing them to the props of the
    // shelf components. These will filter based on the array positions [0, 1, 2]
    // corresponding to the positions of the elements in the shelves array.
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path="/search" render = {() =>(
          <div className="search-books">
            <SearchBar handleUpdate={(book) => this.update(book)}/>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
        <Route exact path="/" render = {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.shelves.map((shelf) =>(
                    <Shelf key={shelf[0]} books={books} readStatus={shelf[0]}
                    readStatusDisplay={shelf[1]}
                    handleUpdate={(book) => this.update(book)}/>
                  ))
                }

              </div>
            </div>
            <div className="open-search">
              <Link to='/search'
              className='search-link'>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
