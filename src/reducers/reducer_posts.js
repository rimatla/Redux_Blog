/*********** create reducer to handle blog posts *************/
import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';

export  default  function(state ={}, action) { //takes an object and an action
    switch (action.type) {
        case DELETE_POST:
            //look at state object, if it has a key = postID , drop/omit it
            return _.omit(state, action.payload);
        case FETCH_POST:
            return {...state, [action.payload.data.id] : action.payload.data}; //key interpolation = resets the key value
        case FETCH_POSTS:
        //transform array of records into an object.
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state; //return object
    }
}