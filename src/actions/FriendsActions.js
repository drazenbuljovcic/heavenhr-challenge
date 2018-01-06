import * as types from '../constants/ActionTypes';
import * as genderTypes from '../constants/GenderTypes';

export function addFriend(name, gender) {
  if (!name) { return; }
  if (gender && !(gender === genderTypes.MALE || gender === genderTypes.FEMALE)) { return; }

  const payload = { name };
  if(gender) { payload.gender = gender };

  return {
    type: types.ADD_FRIEND,
    payload: payload,
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
  return { type: types.REFRESH_PAGINATION, payload: { friendList, itemCount } };
}

export function changePaginationPage(pageNumber) {
  return { type: types.CHANGE_PAGINATION_PAGE, pageNumber };
}