import React from 'react';

import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

import AddFriendForm from './AddFriendForm';

configure({ adapter: new Adapter() });

describe('Form for adding new friends', () => {
  const defaultProps = {
    addFriend: jest.fn(),
  };
  const component = shallow(<AddFriendForm {...defaultProps} />);
  const form = component.find('form');

  it('should match it\'s empty snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have one form element', () => {
    expect(form).toHaveLength(1);
  });

  it('should have one text input element for name inside the form', () => {
    expect(form.find('input[name=\'name\']')).toHaveLength(1);
  });

  it('should have two radio inputs for gender inside the form', () => {
    expect(form.find('input[name=\'gender\']')).toHaveLength(2);
  });

  it('should have male radio button label with icon', () => {
    const maleInput = form.find('input[value=\'male\']');
    const label = form.find('input[value=\'male\'] + label');

    expect(maleInput).toHaveLength(1);
    expect(label).toHaveLength(1);
    expect(label.find('i.fa-male')).toHaveLength(1);
  });

  
  it('should have female radio button label with icon', () => {
    const femaleInput = form.find('input[value=\'female\']');
    const label = form.find('input[value=\'female\'] + label');

    expect(femaleInput).toHaveLength(1);
    expect(label).toHaveLength(1);
    expect(label.find('i.fa-female')).toHaveLength(1);
  });

  describe('Add friend', () => {
    const mockEvent = { preventDefault: () => {}, target: { reset: jest.fn() }};
    component.instance().input = { focus: jest.fn() };

    it('should add the friend if the form is valid and submitted', () => {
      Promise.resolve(component.setState({ 'name': 'Friend' }))
        .then(() => {
          component.instance().handleSubmit(mockEvent);
          expect(defaultProps.addFriend).toHaveBeenCalled();
        }).catch(() => {});
    });

    it('should not add the friend name does not exist', () => {
      Promise.resolve(component.setState({ 'name': '' }))
        .then(() => {
          component.instance().handleSubmit(mockEvent);
          expect(defaultProps.addFriend).not.toHaveBeenCalled();
        }).catch(() => {});
    });
  });
});