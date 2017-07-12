/**
 * Created by shiran on 2017/7/10.
 */
import * as types from '../actions/actionTypes';

export default function userInfo(state = {}, action = {}) {
	switch (action.type) {
		case types.USER_INFO:
			return {...state,  info: action.info };
		default:
			return state;
	}
}
