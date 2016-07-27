import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Comments from '../Comments/Comments';
import ReplyForm from '../ReplyForm/ReplyForm';

import './Comment.styl';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.handleShowReplyForm = this.handleShowReplyForm.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  handleShowReplyForm(e) {
    e.preventDefault();
    const { comment, showReplyForm } = this.props;
    showReplyForm(comment.id.toString());
  }


  handleDeleteComment(e) {
    e.preventDefault();
    const { parent, comment, deleteComment } = this.props;
    if (comment.username === localStorage.username) {
      deleteComment(
        comment.id, parent, comment.username);
    }
  }

  render() {
    const {
      username, comment, entities, visibilityFormReply,
      deleteComment, replyComment, showReplyForm,
    } = this.props;
    return (
      <div className="comment">
        <div className="comment__date">{moment(comment.date).format(' Do MMM HH:mm:ss')}</div>
        <div className="comment__username">{comment.username}</div>
        <div className="comment__text">{comment.text}</div>
        <button
          className="comment__btn comment__btn_remove"
          onClick={this.handleDeleteComment}
        >
          Delete
        </button>
        {
          visibilityFormReply === comment.id.toString() ?
            <ReplyForm
              commentId={comment.id.toString()}
              username={username}
              replyComment={(commentUsername, commentText, commentId) =>
                replyComment(commentUsername, commentText, commentId)}
              showReplyForm={(commentId) => showReplyForm(commentId)}
            /> :
            <button
              className="comment__btn comment__btn_reply"
              onClick={this.handleShowReplyForm}
            >
              Reply
            </button>
        }
        <br /><br />
        {
          comment.reply.length > 0 ?
            <Comments
              blockType="reply"
              parent={comment.id}
              username={username}
              comments={comment.reply}
              entities={entities}
              visibilityFormReply={visibilityFormReply}
              deleteComment={(commentId, parentId, commentUsername) =>
                deleteComment(commentId, parentId, commentUsername)}
              replyComment={(commentUsername, commentText, commentId) =>
                replyComment(commentUsername, commentText, commentId)}
              showReplyForm={(commentId) =>
                showReplyForm(commentId)}
            /> : null
          }
      </div>
    );
  }
}

Comment.propTypes = {
  parent: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  visibilityFormReply: PropTypes.string.isRequired,
  showReplyForm: PropTypes.func.isRequired,
  replyComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

Comment.displayName = 'Comment';

export default Comment;
