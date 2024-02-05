import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount = () => {
    console.log("CommentArea Mounted with asin:", this.props.asin);
    // Chiamata API solo se asin è presente
    if (this.props.asin) {
      this.fetchComments();
    }
  };

  componentDidUpdate = (prevProps) => {
    console.log("CommentArea Updated with asin:", this.props.asin);
    // Verifica se la prop 'asin' è cambiata
    if (this.props.asin !== prevProps.asin) {
      // Reset dello stato e nuova chiamata API
      this.setState({ comments: [], isLoading: true, isError: false });
      this.fetchComments();
    }
  };

  fetchComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMwZjljY2UwODVmYTAwMTk2MzFhY2IiLCJpYXQiOjE3MDcxNDU2NzYsImV4cCI6MTcwODM1NTI3Nn0.xzJqQkDlP2O95DygO0xba65XYyeDZSrDF0p6UKTWf9A",
          },
        }
      );

      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments, isLoading: false, isError: false });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
