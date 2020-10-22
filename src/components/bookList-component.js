import React, { Component } from "react";
import BookDataService from "../services/book.service";


//const API_URL = 'http://localhost:8080/api/test/';

export default class BookList extends Component {

    constructor(props) {
        super(props);
        this.retrieveBooks = this.retrieveBooks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBook = this.setActiveBook.bind(this);
        this.removeAllBooks = this.removeAllBooks.bind(this);
        this.removeBook = this.removeBook.bind(this);
        
        this.state = {
          books: [],
          currentBook: null,
          currentIndex: -1,
        };
      }
    
      componentDidMount() {
        this.retrieveBooks();
      }
    

      retrieveBooks() {
        BookDataService.getAll()
          .then(response => {
            this.setState({
              books: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      refreshList() {
        this.retrieveBooks();
        this.setState({
          currentBook: null,
          currentIndex: -1
        });
      }

      setActiveBook(book, index) {
        this.setState({
          currentBook: book,
          currentIndex: index
        });
      }

      removeAllBooks() {
        BookDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      removeBook() {
        BookDataService.delete(this.state.currentBook.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push('/delete')
          })
          .catch(e => {
            console.log(e);
          });
      }

    render(){
        const { books, currentBook ,currentIndex } = this.state;

            return (
                <div className="list row">
                  <div className="col-md-8">
                </div>
                <div className="col-md-6">
                <h4>Book List</h4>
                <ul className="list-group">
                    {books &&
                    books.map((book, index) => (
                        <li
                        className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveBook(book, index)}
                        key={index}
                        >
                        {book.title}
                        </li>
                    ))}
                </ul>
            <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllBooks}>
                Remove All
            </button>
            </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBook.description}
              </div>
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeBook}>
                Remove
            </button>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a book title...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
