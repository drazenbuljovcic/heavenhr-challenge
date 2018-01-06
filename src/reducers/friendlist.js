import * as types from '../constants/ActionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
  friendsById: [
    {
      id: Math.round(Math.random() * 10000000),
      name: 'Theodore Roosevelt',
      starred: true,
      gender: undefined,
    },
    {
      id: Math.round(Math.random() * 10000000),
      name: 'Abraham Lincoln',
      starred: false,
      gender: undefined,
    },
    {
      id: Math.round(Math.random() * 10000000),
      name: 'George Washington',
      starred: false,
      gender: undefined,
    },
    {
      id: Math.round(Math.random() * 10000000),
      name: 'Dražen Buljovčić',
      starred: false,
      gender: 'male',
    }
  ],
  paginationInfo: {
    startingItemIndex: 0,
    endingItemIndex: 0,
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
      newState.friendsById.push({
        id: Math.round(Math.random() * 10000000),
        name: action.payload.name,
        gender: action.payload.gender,
      });

      return newState;
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item) => item.id !== action.id)
      };
    case types.STAR_FRIEND:
      const friendIndex = newState.friendsById.findIndex((item) => item.id === action.id);
      newState.friendsById[friendIndex].starred = !newState.friendsById[friendIndex].starred;
      
      return newState;
    case types.REFRESH_PAGINATION:
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
      const start = newItemCount * newState.paginationInfo.currentPage;

      newState.paginationInfo.startingItemIndex = start + 1;
      newState.paginationInfo.endingItemIndex = start + newItemCount;
      
      const differences = newState.paginationInfo.endingItemIndex > newState.friendsById.length ? newState.paginationInfo.endingItemIndex - newState.friendsById.length : 0;
      if(differences) {
        newState.paginationInfo.endingItemIndex -= differences;
      }

      newState.paginationInfo.totalPages = Math.ceil(list.length / newItemCount);
      newState.paginationInfo.currentPageFriendsList = list.slice(start, newState.paginationInfo.endingItemIndex);
      return newState;
    case types.CHANGE_PAGINATION_PAGE:
      const { pageNumber } = action;

      if(pageNumber < 0) { return newState; }
      if(pageNumber > newState.paginationInfo.totalPages - 1) { return newState; }

      newState.paginationInfo.currentPage = pageNumber;

      const startIndex = newState.paginationInfo.itemCount * newState.paginationInfo.currentPage;
      newState.paginationInfo.startingItemIndex = startIndex + 1;

      newState.paginationInfo.endingItemIndex = startIndex + newState.paginationInfo.itemCount;
      
      const difference = newState.paginationInfo.endingItemIndex > newState.friendsById.length ? newState.paginationInfo.endingItemIndex - newState.friendsById.length : 0;
      if(difference) {
        newState.paginationInfo.endingItemIndex -= difference;
      }

      newState.paginationInfo.currentPageFriendsList = newState.friendsById.slice(startIndex, newState.paginationInfo.endingItemIndex);
      return newState;
    default:
      return state;
  }
}
