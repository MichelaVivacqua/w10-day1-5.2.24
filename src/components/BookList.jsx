import { Component } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Col, Form, Row } from "react-bootstrap";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: null,
  };

  handleBookSelect = (selectedBook) => {
    this.setState({ selectedBookAsin: selectedBook.asin });
  };

  render() {
    const filteredBooks = this.props.books.filter((b) =>
      b.title.toLowerCase().includes(this.state.searchQuery)
    );

    return (
      <Row className="mt-5">
        {/* Colonna a sinistra con la griglia dei libri */}
        <Col xs={12} md={6}>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center mb-3">
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={this.state.searchQuery}
                  onChange={(e) =>
                    this.setState({ searchQuery: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2">
            {filteredBooks.map((b) => (
              <Col xs={12} md={6} key={b.asin}>
                <SingleBook
                  book={b}
                  onSelect={() => this.handleBookSelect(b)}
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* Colonna a destra con il CommentArea */}
        <Col xs={12} md={6}>
          <CommentArea asin={this.state.selectedBookAsin} />
        </Col>
      </Row>
    );
  }
}

export default BookList;
