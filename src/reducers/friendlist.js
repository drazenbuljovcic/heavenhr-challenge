import * as types from '../constants/ActionTypes';
import { ITEM_COUNT } from '../constants/FriendListPagination';

import { cloneDeep } from 'lodash';

const initialState = {
  friendsById: [
    {
      name: 'Theodore Roosevelt',
      starred: true
    },
    {
      name: 'Abraham Lincoln',
      starred: false
    },
    {
      name: 'George Washington',
      starred: false
    },
    {
      name: 'Dražen Buljovčić',
      starred: false,
      gender: 'male',
    }
  ],
  paginationInfo: {
    itemCount: 0,
    currentPage: 0,
    currentPageFriendsList: [],
    totalPages: 0,
  }
};

export default function friends(state = initialState, action) {
  const newState = cloneDeep(state);
  
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            name: action.payload.name,
            gender: action.payload.gender,
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item, index) => index !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item, index) => index === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };
    
    case types.REFRESH_PAGINATION:
      const { itemCount, currentPage } = newState.paginationInfo;
      const { friendList: list, itemCount: newItemCount } = action.payload;

      if (!newItemCount) {
        newState.paginationInfo = {
          itemCount: 0,
          currentPage: 0,
          currentPageFriendsList: [],
          totalPages: 0,
        };
        return newState;
      }

      newState.paginationInfo.itemCount = newItemCount;
      newState.paginationInfo.currentPage = 0;
      const start = newItemCount * newState.paginationInfo.currentPage;

      newState.paginationInfo.totalPages = Math.ceil(list.length / newItemCount);
      newState.paginationInfo.currentPageFriendsList = list.slice(start, start + newItemCount);

      return newState;
    case types.CHANGE_PAGINATION_PAGE:
      const { pageNumber } = action;

      if(pageNumber < 0) { return newState; }
      if(pageNumber > newState.paginationInfo.totalPages - 1) { return newState; }

      newState.paginationInfo.currentPage = pageNumber;

      const startIndex = newState.paginationInfo.itemCount * newState.paginationInfo.currentPage;

      newState.paginationInfo.currentPageFriendsList = newState.friendsById.slice(startIndex, startIndex + newState.paginationInfo.itemCount);
      return newState;
    default:
      return state;
  }
}
