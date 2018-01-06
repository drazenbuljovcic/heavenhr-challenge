import React from 'react';
import renderer from 'react-test-renderer';

import PaginationControls from './PaginationControls';

describe('Pagination Controls', () => {
  it('should match it\'s empty snapshot', () => {
    const component = renderer.create(
      <PaginationControls
        totalPages={0}
        currentPage={0}
        totalCount={0}
        startingItemIndex={0}
        endingItemIndex={0}
        handlePaginationToFirstPage={() => {}}
        handlePaginationToLastPage={() => {}}
        handlePaginationToNextPage={() => {}}
        handlePaginationToPreviousPage={() => {}}
        handlePaginationToPageNumber={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});