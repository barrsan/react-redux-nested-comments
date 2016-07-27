import React, { PropTypes } from 'react';
import Comment from '../Comment/Comment';
import './Comments.styl';


function Comments(props) {
  const {
    blockType, parent, username, comments, entities, visibilityFormReply,
    deleteComment, replyComment, showReplyForm,
  } = props;
  return (
    <div className={blockType === 'comments' ? 'comments' : 'replys'}>
      {
        comments.map(comment =>
          <Comment
            key={entities.comments[comment].id}
            parent={parent}
            username={username}
            comment={entities.comments[comment]}
            entities={entities}
            visibilityFormReply={visibilityFormReply}
            deleteComment={(commentId, parentId, commentUsername) =>
              deleteComment(commentId, parentId, commentUsername)}
            replyComment={(commentUsername, commentText, commentId) =>
              replyComment(commentUsername, commentText, commentId)}
            showReplyForm={(commentId) =>
              showReplyForm(commentId)}
          />)
      }
    </div>
  );
}

Comments.propTypes = {
  blockType: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  entities: PropTypes.object.isRequired,
  visibilityFormReply: PropTypes.string.isRequired,
  replyComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  showReplyForm: PropTypes.func.isRequired,
};

Comments.displayName = 'Comments';

export default Comments;
