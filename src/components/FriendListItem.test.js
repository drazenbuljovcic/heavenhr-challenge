import React from 'react';
import renderer from 'react-test-renderer';

import FriendListItem from './FriendListItem';

describe('A Friend List Item', () => {
  it('should match it\'s empty snapshot', () => {
    const component = renderer.create(
      <FriendListItem
        key={0}
        id={0}
        name={''}
        gender={''}
        starred={false}
        starFriend={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});