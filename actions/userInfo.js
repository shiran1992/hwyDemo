import * as types from './actionTypes';

export function save(info) {
  return {type: types.USER_INFO, info: info};
}
