import * as types from '../constants/ActionTypes';

export function addFriend(name, gender) {
  return {
    type: types.ADD_FRIEND,
    payload: {name, gender}
  };
}

export function deleteFriend(id) {
  return {
    type: types.DELETE_FRIEND,
    id
  };
}

export function starFriend(id) {
  return {
    type: types.STAR_FRIEND,
    id
  };
}

export function refreshPaginationInfo(friendList, itemCount) {
  return { type: types.REFRESH_PAGINATION, payload: { friendList, itemCount } }
}

export function changePaginationPage(pageNumber) {
  return { type: types.CHANGE_PAGINATION_PAGE, pageNumber };
}