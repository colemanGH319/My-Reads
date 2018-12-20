import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBar extends Component {

  state = {
    value: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      value: query.trim()
    }))
  }

  doSomething = () => {
    this.setState(() => ({
      results: [...BooksAPI.search(this.state.value)]
    }))
  }

  render() {
    const { value } = this.state
    this.doSomething()
    return (
      <div className="search-books-bar">
        <Link to='/' className='homepage-link'>
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">

          <input onChange={(event) => this.updateQuery(event.target.value)} type="text" placeholder="Search by title or author"/>

        </div>
      </div>
    )
  }
}

export default SearchBar;
