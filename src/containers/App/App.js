import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  signIn,
  signOut,
  addComment,
  replyComment,
  deleteComment,
  showReplyForm,
  fetchComments,
} from '../../actions/actions';

import './App.styl';

import Auth from '../../components/Auth/Auth';
import CommentForm from '../../components/CommentForm/CommentForm';
import Comments from '../../components/Comments/Comments';


class App extends Component {
  componentDidMount() {
    this.props.fetchComments();
  }
  render() {
    return (
      <div className="app">
        <h1 className="app__title">Nested Comments</h1>
        <Auth
          username={this.props.username}
          signIn={username => this.props.signIn(username)}
          signOut={() => this.props.signOut()}
        />
        <div className="app__comments">
          <Comments
            parent={'0'}
            blockType="comments"
            username={this.props.username}
            comments={this.props.result}
            entities={this.props.entities}
            deleteComment={(id, parentId, username) =>
              this.props.deleteComment(id, parentId, username)}
            replyComment={(username, text, commentId) =>
              this.props.replyComment(username, text, commentId)}
            visibilityFormReply={this.props.visibilityFormReply}
            showReplyForm={(commentId) => this.props.showReplyForm(commentId)}
          />
        </div>
        <CommentForm
          username={this.props.username}
          addComment={(username, text) => this.props.addComment(username, text)}
        />
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string.isRequired,
  result: PropTypes.array.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  visibilityFormReply: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  replyComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  showReplyForm: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    username: state.sign.username,
    result: state.comments.result,
    entities: state.comments.entities,
    visibilityFormReply: state.comments.visibilityFormReply,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn, signOut, addComment, replyComment, showReplyForm, deleteComment, fetchComments,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
