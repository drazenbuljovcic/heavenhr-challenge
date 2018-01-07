import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import toJson from 'enzyme-to-json';

import * as genderTypes from '../constants/GenderTypes';

import FriendListItem from './FriendListItem';

configure({ 'adapter': new Adapter() });

describe('A Friend List Item', () => {
  const defaultProps = {
    key: 0,
    id: 0,
    name: '',
    gender: '',
    starred: false,
    starFriend: jest.fn(),
    deleteFriend: jest.fn(),
  };
  const component = shallow(<FriendListItem {...defaultProps} />);

  it('should match it\'s empty snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should display the friend name', () => {
    expect(toJson(shallow(
      <FriendListItem {...defaultProps} name='Friend' />
    ))).toMatchSnapshot();
  });

  it('should display gender icon if gender is specified', () => {
    expect(toJson(shallow(
      <FriendListItem {...defaultProps} name='Friend' gender={genderTypes.MALE}/>
    ))).toMatchSnapshot();
  });

  it('should be able to star the friend', () => {
    component.find('button[aria-label=\'Star Friend\']').simulate('click');
    expect(defaultProps.starFriend).toHaveBeenCalled();
  });

  it('should be able to delete the friend', () => {
    component.find('button[aria-label=\'Delete Friend\']').simulate('click');
    expect(defaultProps.deleteFriend).toHaveBeenCalled();
  });
});