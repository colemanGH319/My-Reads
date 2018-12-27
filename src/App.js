import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './BookShelf'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     * TODO: Fix author to allow display of multiple authors
     */

     /*
       NOTES: The search from BooksAPI is limited to a particular set of search terms.
       You can find these search terms here:
       https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

       However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
       you don't find a specific author or title. Every search is limited by search terms.
     */
    books: []
  }
  //from button attributes: onClick={() => this.setState({ showSearchPage: true })}
  //<button onClick={this.listBooks}>List Books</button>
  shelves = [["currentlyReading", "Currently Reading"], ["wantToRead", "Want to Read"], ["read", "Read"]]

  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  listBooks = () => {
    console.log(this.state.books)
  }

  update = (book) => {
    this.setState((currentState) => ({
      books: [...currentState.books.filter((b) => {
        return b.id !== book.id
      }), book]
    }))
    BooksAPI.update(book, book.shelf)
  }



  render() {
    const { books } = this.state
    console.log(books)
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
                {[0, 1, 2].map((num) =>(
                    <Shelf key={this.shelves[num][0]} books={books} readStatus={this.shelves[num][0]}
                    readStatusDisplay={this.shelves[num][1]}
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
