import { addFriend, deleteFriend, starFriend, refreshPaginationInfo, changePaginationPage } from '../actions/FriendsActions';

import reducer, { initialState, defaultPaginationState } from './friendlist';
import * as genderTypes from '../constants/GenderTypes';

import { cloneDeep } from 'lodash';

const maleFriend = { id: 1, name: 'Male Friend', gender: genderTypes.MALE, starred: true };
const femaleFriend = { id: 2, name: 'Female Friend', gender: genderTypes.FEMALE, starred: false };
const mutualFriend = { id: 3, name: 'Mutual Friend', gender: genderTypes.MALE, starred: false };

const friendList = [ maleFriend, femaleFriend, mutualFriend ];

const mockInitialState = {
  friendsById: friendList,
  paginationInfo: {
    startingItemIndex: 0,
    endingItemIndex: 0,
    itemCount: 0,
    currentPage: 0,
    currentPageFriendsList: [],
    totalPages: 0,
  }
}

describe('Friend list reducer:', () => {
  it('should return return initial state if called without an action', () => {
    expect(reducer(undefined, { type: null })).toEqual(initialState);
  });

  describe('Add friend to friend list', () => {
    const state = reducer(mockInitialState, addFriend('Friend1', genderTypes.MALE));
    const newFriendIndex = state.friendsById.findIndex(friend => friend.name === 'Friend1');
    const newFriendList = friendList.concat([{
      id: state.friendsById[newFriendIndex].id,
      name: 'Friend1',
      gender: genderTypes.MALE,
      starred: false,
    }]);
    
    it('should expand friend list by one', () => {
      expect(state.friendsById.length).toEqual(friendList.length + 1);
    });
    
    it('should be able to find new friend in list', () => {
      expect(newFriendIndex).toBeDefined();
    });

    it('should have new friend added with it\'s information', () => {
      expect(state.friendsById).toEqual(newFriendList);
    });
  });

  describe('Delete friend from friend list', () => {
    const friendToDeleteId = 1;
    const state = reducer(mockInitialState, deleteFriend(friendToDeleteId));
    const newFriendList = friendList.filter(friend => friend.id !== friendToDeleteId);

    it('should decrease the size of list by one', () => {
      expect(state.friendsById.length).toEqual(friendList.length - 1);
    });

    it('shouldn\'t be able to find deleted friend', () => {
      expect(state.friendsById.find(friend => friend.id === friendToDeleteId)).toBeUndefined();
    });

    it('should have friend list without the friend in state', () => {
      expect(state.friendsById).toEqual(newFriendList);
    });
  });

  describe('Star friend', () => {
    const unstarState = reducer(mockInitialState, starFriend(1));
    const starState = reducer(mockInitialState, starFriend(2));

    const previouslyStarredFriend = unstarState.friendsById.find(friend => friend.id === 1);
    const unstarredFriend = starState.friendsById.find(friend => friend.id === 1);

    it('should unstar a previously starred friend', () => {
      expect(previouslyStarredFriend.starred).toBeFalsy();
    });

    it('should star an unstarred friend', () => {
      expect(unstarredFriend.starred).toBeTruthy();
    });
  });

  describe('Refresh Pagination', () => {
    describe('No Pagination', () => {
      const state = reducer(mockInitialState, refreshPaginationInfo(friendList, 0));
      it('should not change initial friend list', () => {
        expect(state.friendsById).toEqual(mockInitialState.friendsById);
      });
      
      it('should not update pagination information if the item count is zero', () => {
        expect(state.paginationInfo).toEqual(mockInitialState.paginationInfo);
      });
    })
    
    describe('Pagination - 2 items on page, 3 items in list', () => {
      const state = reducer(mockInitialState, refreshPaginationInfo(friendList, 2));
      const { paginationInfo: {
        itemCount, totalPages, startingItemIndex, endingItemIndex,
        currentPageFriendsList, currentPage,
      } } = state;

      it('should set the item count', () => {
        expect(itemCount).toEqual(2);
      });
      
      it('should calculate amount of pages', () => {
        expect(totalPages).toEqual(2);
      });

      it('should position the user on the first page', () => {
        expect(currentPage).toEqual(defaultPaginationState.currentPage);
      });

      it('should set number of starting item on page', () => {
        expect(startingItemIndex).toEqual(1);
      });

      it('should set number of ending item on page', () => {
        expect(endingItemIndex).toEqual(2);
      });

      it('should have length of page items equal to item count', () => {
        expect(currentPageFriendsList.length).toEqual(itemCount);
      });

      it('should filter out needed list items for active page', () => {
        const pageFriendList = friendList.slice(startingItemIndex - 1, endingItemIndex);
        expect(currentPageFriendsList).toEqual(pageFriendList);
      });

      describe('Second page, one list item short after deletion', () => {
        
        it('should calculate the difference if there are less items on the page than the item count', () => {
          // last page on pagination, and a list item is deleted
          const changedState = cloneDeep(state);
          changedState.paginationInfo.endingItemIndex = 4; // set item index to be above the list length
          const { paginationInfo: { endingItemIndex }, friendsById } = changedState;
  
          const difference = endingItemIndex > friendsById.length ? endingItemIndex - friendsById.length : 0;
  
          expect(difference).toEqual(1);
        });

        it('should calculate 0 in difference if the page is full of items', () => {
          // last page on pagination, and a list item is deleted
          const changedState = cloneDeep(state);
          changedState.paginationInfo.endingItemIndex = 3; // set item index to be above the list length
          const { paginationInfo: { endingItemIndex }, friendsById } = changedState;
  
          const difference = endingItemIndex > friendsById.length ? endingItemIndex - friendsById.length : 0;
  
          expect(difference).toEqual(0);
        });

      });
    });
  });
  
  describe('Change Pagination Page:', () => {
    const mockCopy = cloneDeep(mockInitialState);
    mockCopy.paginationInfo.itemCount = 2;
    mockCopy.paginationInfo.totalPages = 2;

    it('should only have one item in page array if current page is the last one', () => {
      const state = reducer(mockCopy, changePaginationPage(1));
      expect(state.paginationInfo.currentPageFriendsList.length).toEqual(1);
    });

    it('should have full page array if current page is full', () => {
      const state = reducer(mockCopy, changePaginationPage(0));
      expect(state.paginationInfo.currentPageFriendsList.length).toEqual(state.paginationInfo.itemCount);
    });

    it('pagination cannot go below page 0', () => {
      const state = reducer(mockCopy, changePaginationPage(-1));
      expect(state).toEqual(mockCopy);
    });

    it('pagination cannot go past the last page', () => {
      const state = reducer(mockCopy, changePaginationPage(6));
      expect(state).toEqual(mockCopy);
    });
  });
});
