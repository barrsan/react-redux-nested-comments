import React, { Component, PropTypes } from 'react';
import './ReplyForm.styl';


class ReplyForm extends Component {
  constructor(props) {
    super(props);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.hideReplyForm = this.hideReplyForm.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.refs.reply.value) this.sendComment();
  }

  onTextareaChange(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  sendComment() {
    const { username, commentId, replyComment, showReplyForm } = this.props;
    const text = this.refs.reply.value;
    if (text !== '' && username) {
      replyComment(username, text, commentId);
      showReplyForm('0');
      this.refs.reply.value = '';
    }
  }

  hideReplyForm(e) {
    e.preventDefault();
    this.props.showReplyForm('0');
  }

  render() {
    return (
      <form className="replyForm" onSubmit={this.onFormSubmit}>
        <textarea
          className="replyForm__message"
          onKeyDown={this.onTextareaChange}
          placeholder="Type your reply here"
          ref="reply"
        />
        <div className="replyForm__btnWrap">
          <button className="replyForm__btn" type="submit">Send</button>
          <button
            className="replyForm__btn replyForm__btn_cancel"
            onClick={this.hideReplyForm}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

ReplyForm.propTypes = {
  username: PropTypes.string.isRequired,
  replyComment: PropTypes.func.isRequired,
  showReplyForm: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired,
};

ReplyForm.displayName = 'ReplyForm';

export default ReplyForm;
