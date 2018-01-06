import {
  addFriend, deleteFriend, starFriend,
  refreshPaginationInfo, changePaginationPage
} from './FriendsActions';

import * as types from '../constants/ActionTypes';
import * as genderTypes from '../constants/GenderTypes';

describe('Friend actions:',  () => {
  const name = 'Friend';
  const id = 1;

  const maleFriend = { id, name, gender: genderTypes.MALE, starred: true };
  const femaleFriend = { id, name, gender: genderTypes.FEMALE, starred: true };
  const friendList = [ maleFriend, femaleFriend ];

  describe('Add friend:', () => {
    it('should be able to add friends with name and gender', () => {
      expect(addFriend(name, genderTypes.MALE)).toEqual({
        type: types.ADD_FRIEND,
        payload: { name, gender: genderTypes.MALE }
      });
    });

    it('should be able to add male friends', () => {
      expect(addFriend(name, genderTypes.MALE).payload.gender).toEqual(genderTypes.MALE);
    });

    it('should be able to add female friends', () => {
      expect(addFriend(name, genderTypes.FEMALE).payload.gender).toEqual(genderTypes.FEMALE);
    });
    
    it('should be able to add friends with only the name', () => {
      expect(addFriend(name)).toEqual({
        type: types.ADD_FRIEND,
        payload: { name }
      });
    });
    
    it('should not be able to add friends without names', () => {
      expect(addFriend()).toBeUndefined();
    });

    it('should not be able to add friends with an unknown gender', () => {
      expect(addFriend(name, 'unknown-gender')).toBeUndefined();
    });
  });

  describe('Delete friend:', () => {
    it('should be able to delete friends with given identifier', () => {
      expect(deleteFriend(id)).toEqual({
        type: types.DELETE_FRIEND,
        id,
      });
    });

    it('should not be able to delete friends with different identifier than a given one', () => {
      expect(deleteFriend(id)).not.toEqual({
        type: types.DELETE_FRIEND,
        id: id + 1,
      });
    });
  });

  describe('Star friend:', () => {
    it('should be able to star friends with given identifier', () => {
      expect(starFriend(id)).toEqual({
        type: types.STAR_FRIEND,
        id,
      });
    });

    it('should not be able to star friends with different identifier than a given one', () => {
      expect(starFriend(id)).not.toEqual({
        type: types.STAR_FRIEND,
        id: id + 1,
      });
    });
  });

  describe('Refresh Pagination:', () => {
    it('should be able to refresh pagination information', () => {
      expect(refreshPaginationInfo(friendList, 2)).toEqual({
        type: types.REFRESH_PAGINATION,
        payload: { friendList, itemCount: 2 },
      });
    });
  });

  describe('Change Pagination Page:', () => {
    it('should be able to change pagination page', () => {
      expect(changePaginationPage(2)).toEqual({
        type: types.CHANGE_PAGINATION_PAGE,
        pageNumber: 2,
      });
    });
  });
});