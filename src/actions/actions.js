import {
  SIGN_IN,
  SIGN_OUT,
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  SHOW_FORM_REPLY,
  FETCH_COMMENTS,
} from '../constants/constants';
import { without } from 'lodash';
const objectId = require('bson-objectid');


const comment = (username, text) => {
  const id = objectId(Date.now()).toString();
  const date = Date.now();
  const reply = [];
  return { id, date, username, text, reply };
};

export function fetchComments() {
  if (!localStorage.comments) {
    const comments = {
      result: [],
      entities: {
        comments: {},
      },
      visibilityFormReply: '0',
    };
    localStorage.setItem('comments', JSON.stringify(comments));
    return {
      type: FETCH_COMMENTS,
      payload: {},
    };
  }
  const comments = JSON.parse(localStorage.comments);
  return {
    type: FETCH_COMMENTS,
    payload: comments,
  };
}

export function signIn(username) {
  localStorage.username = username;
  return {
    type: SIGN_IN,
    payload: username,
  };
}

export function signOut() {
  localStorage.username = '';
  return {
    type: SIGN_OUT,
  };
}

export function addComment(username, text) {
  const newComment = comment(username, text);
  const comments = JSON.parse(localStorage.comments);
  comments.result.push(newComment.id);
  comments.entities.comments[newComment.id] = newComment;
  localStorage.setItem('comments', JSON.stringify(comments));

  return {
    type: ADD_COMMENT,
    payload: newComment,
  };
}

export function replyComment(username, text, commentId) {
  const newComment = comment(username, text);
  const comments = JSON.parse(localStorage.comments);
  comments.entities.comments[commentId].reply.push(newComment.id);
  comments.entities.comments[newComment.id] = newComment;
  localStorage.setItem('comments', JSON.stringify(comments));

  return {
    type: ADD_REPLY,
    payload: {
      commentId,
      reply: newComment,
    },
  };
}

export function showReplyForm(id) {
  return {
    type: SHOW_FORM_REPLY,
    payload: { id },
  };
}

export function deleteComment(id, parentId) {
  const comments = JSON.parse(localStorage.comments);
  if (parentId === '0') {
    comments.result = without(comments.result, id);
  } else {
    comments.entities.comments[parentId].reply =
      without(comments.entities.comments[parentId].reply, id);
  }
  localStorage.setItem('comments', JSON.stringify(comments));

  return {
    type: DELETE_COMMENT,
    payload: { id, parentId },
  };
}
