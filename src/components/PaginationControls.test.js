import React from 'react';

import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-15';

import PaginationControls from './PaginationControls';

configure({ adapter: new Adapter() });

describe('Pagination Controls', () => {
  const defaultProps = {
    totalPages: 0,
    currentPage: 0,
    totalCount: 0,
    startingItemIndex: 0,
    endingItemIndex: 0,
    handlePaginationToFirstPage: jest.fn(),
    handlePaginationToLastPage: jest.fn(),
    handlePaginationToNextPage: jest.fn(),
    handlePaginationToPreviousPage: jest.fn(),
    handlePaginationToPageNumber: jest.fn(),
  };
  const component = shallow(<PaginationControls {...defaultProps}/>);

  it('should match it\'s empty snapshot', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should navigate to first page when backward button is pressed', () => {
    component.find('button[aria-label="Backward"]').simulate('click');
    expect(defaultProps.handlePaginationToFirstPage).toHaveBeenCalled();
  });

  it('should navigate to previous page when previous button is pressed', () => {
    component.find('button[aria-label="Previous"]').simulate('click');
    expect(defaultProps.handlePaginationToPreviousPage).toHaveBeenCalled();
  });

  it('should navigate to page number when page number button is pressed', () => {
    const tmpComponent = shallow(<PaginationControls {...defaultProps} totalPages={2}/>);
    tmpComponent.find('button[aria-label="Page 2"]').simulate('click');
    expect(defaultProps.handlePaginationToPageNumber).toHaveBeenCalledWith(1);
  });

  it('should navigate to next page when next button is pressed', () => {
    component.find('button[aria-label="Next"]').simulate('click');
    expect(defaultProps.handlePaginationToNextPage).toHaveBeenCalled();
  });

  it('should navigate to last page when forward button is pressed', () => {
    component.find('button[aria-label="Forward"]').simulate('click');
    expect(defaultProps.handlePaginationToLastPage).toHaveBeenCalled();
  });

  it('should not display previous and first page buttons if pagination is on first page', () => {
    const tmpComponent = shallow(<PaginationControls {...defaultProps} totalPages={2} currentPage={0} />);
    expect(toJson(tmpComponent)).toMatchSnapshot();
  });

  it('should not display next and forward page buttons if pagination is on last page', () => {
    const tmpComponent = shallow(<PaginationControls {...defaultProps} totalPages={2} currentPage={1} />);
    expect(toJson(tmpComponent)).toMatchSnapshot();
  });

  it('should display legend on the bottom', () => {
    const tmpComponent = shallow(<PaginationControls {...defaultProps} totalCount={5} startingItemIndex={2} endingItemIndex={3} />);
    expect(toJson(tmpComponent)).toMatchSnapshot();
  })
});