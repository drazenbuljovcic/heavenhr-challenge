import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson from 'enzyme-to-json';

import * as genderTypes from '../constants/GenderTypes';
import { ITEM_COUNT } from '../constants/FriendListPagination';

import FriendList from './FriendList';
import FriendListItem from './FriendListItem';
import PaginationControls from './PaginationControls';

configure({ adapter: new Adapter() });

describe('Friend List', () => {
  const maleFriend = { id: 1, name: 'Male Friend', gender: genderTypes.MALE, starred: true };
  const femaleFriend = { id: 2, name: 'Female Friend', gender: genderTypes.FEMALE, starred: false };
  const mutualFriend = { id: 3, name: 'Mutual Friend', gender: genderTypes.MALE, starred: false };

  const defaultProps = {
    listItemCountPerPage: ITEM_COUNT,
    refreshPaginationInfo: jest.fn(),
    changePaginationPage: jest.fn(),
    friendListInfo: { friendsById: [], paginationInfo: { itemCount: 0 } },
    actions: { starFriend: jest.fn(), deleteFriend: jest.fn() },
  };
  const component = shallow(<FriendList {...defaultProps} />);

  it('should match it\'s empty snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should display all friends if item count is 0', () => {
    const tmpComponent = shallow(<FriendList {...defaultProps} friendListInfo={{
      friendsById: [ maleFriend, femaleFriend, mutualFriend ], paginationInfo: { itemCount: 0 }
    }} />);

    expect(tmpComponent).toMatchSnapshot();
  });

  it('should display a matching number of items to page item count', () => {
    const tmpComponent = shallow(<FriendList {...defaultProps} friendListInfo={{
      friendsById: [ maleFriend, femaleFriend, mutualFriend ],
      paginationInfo: {
        itemCount: 2,
        currentPageFriendsList: [ maleFriend, femaleFriend ],
        totalPages: 0,
        currentPage: 0,
        startingItemIndex: 0,
        endingItemIndex: 0
      }
    }} />);

    expect(tmpComponent).toMatchSnapshot();
  });
});