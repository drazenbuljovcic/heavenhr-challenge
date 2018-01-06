import React from 'react';
import renderer from 'react-test-renderer';

import FriendList from './FriendList';
import { ITEM_COUNT } from '../constants/FriendListPagination';

describe('Friend List', () => {
  it('should match it\'s empty snapshot', () => {
    const component = renderer.create(
      <FriendList 
        listItemCountPerPage={ITEM_COUNT}
        refreshPaginationInfo={() => {}}
        changePaginationPage={() => {}}
        friendListInfo={{ friendsById: [], paginationInfo: { itemCount: 0 }}}
        actions={{}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});