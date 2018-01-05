import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';

const PaginationControls = props => (
  <div>
    <ul className="pagination">
      <li>
        <button href="#" className="btn btn-default" aria-label="Previous" onClick={props.handlePaginationToPreviousPage}>
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      {
        times(props.totalPages, (i) => (
          <li key={i}>
            <button href="#" className="btn btn-default" onClick={props.handlePaginationToPageNumber.bind(null, i)}>
              {i + 1}
            </button>
          </li>
        ))
      }
      <li>
        <button href="#" className="btn btn-default" aria-label="Next" onClick={props.handlePaginationToNextPage}>
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </div>
);

PaginationControls.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePaginationToNextPage: PropTypes.func.isRequired,
  handlePaginationToPreviousPage: PropTypes.func.isRequired,
  handlePaginationToPageNumber: PropTypes.func.isRequired,
}

export default PaginationControls;