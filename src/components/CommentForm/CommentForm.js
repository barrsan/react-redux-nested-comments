import React, { Component, PropTypes } from 'react';
import './CommentForm.styl';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.refs.message.value) this.sendComment();
  }

  onTextareaChange(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  sendComment() {
    const { username, addComment } = this.props;
    const text = this.refs.message.value;
    if (text !== '' && username) {
      addComment(username, text);
      this.refs.message.value = '';
    }
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.onFormSubmit}>
        <textarea
          className="commentForm__message"
          onKeyDown={this.onTextareaChange}
          placeholder="Type your message here"
          ref="message"
        />
        <div className="commentForm__btnWrap">
          <button className="commentForm__btn" type="submit">Send</button>
        </div>
      </form>
    );
  }
}

CommentForm.propTypes = {
  username: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

CommentForm.displayName = 'CommentForm';

export default CommentForm;
