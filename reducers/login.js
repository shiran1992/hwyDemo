/**
 * Created by shiran on 2017/7/12.
 */
import * as types from '../actions/actionTypes';

export default function login(state = {}, action = {}) {
	switch (action.type) {
		case types.ROOT_CHANGED:
			return { ...state, root: action.root };
		default:
			return state;
	}
}