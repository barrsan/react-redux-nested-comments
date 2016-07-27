import {
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  SHOW_FORM_REPLY,
  FETCH_COMMENTS,
} from '../constants/constants';
import { merge } from 'lodash';


const INITIAL_STATE = {
  result: [],
  entities: {
    comments: {},
  },
  visibilityFormReply: '0',
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS: {
      return Object.assign({}, state, action.payload);
    }


    case ADD_COMMENT: {
      return { ...state,
        result: [...state.result, action.payload.id],
        entities: {
          comments: merge({}, state.entities.comments, { [action.payload.id]: action.payload }),
        },
      };
    }


    case ADD_REPLY: {
      const newState = { ...state,
        entities: {
          comments: {
            ...state.entities.comments,
            [action.payload.commentId]: {
              ...state.entities.comments[action.payload.commentId],
              reply: [
                ...state.entities.comments[action.payload.commentId].reply,
                action.payload.reply.id],
            },
          },
        },
      };

      return { ...newState,
        entities: {
          comments: merge({}, newState.entities.comments,
            { [action.payload.reply.id]: action.payload.reply }),
        },
      };
    }

    case DELETE_COMMENT: {
      const { id, parentId } = action.payload;
      if (parentId === '0') {
        const index = state.result.indexOf(id);
        return { ...state,
          result: [
            ...state.result.slice(0, index),
            ...state.result.slice(index + 1)],
        };
      }
      const index = state.entities.comments[parentId].reply.indexOf(id);
      return { ...state,
        entities: {
          comments: {
            ...state.entities.comments,
            [parentId]: { ...state.entities.comments[parentId],
              reply: [
                ...state.entities.comments[parentId].reply.slice(0, index),
                ...state.entities.comments[parentId].reply.slice(index + 1)],
            },
          },
        },
      };
    }


    case SHOW_FORM_REPLY: {
      return { ...state, visibilityFormReply: action.payload.id };
    }


    default:
      return state;
  }
}
