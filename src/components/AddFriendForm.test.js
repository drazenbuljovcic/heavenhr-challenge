import React from 'react';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import AddFriendForm from './AddFriendForm';

describe('Form for adding new friends', () => {
  it('should match it\'s empty snapshot', () => {
    const component = renderer.create(<AddFriendForm addFriend={() => {}} />);
    expect(component).toMatchSnapshot();
  });
});