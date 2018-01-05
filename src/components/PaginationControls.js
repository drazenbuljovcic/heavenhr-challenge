import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';

const PaginationControls = props => (
  <div>
    <ul className="pagination">
      <li>
        <button href="#" className="btn btn-default" aria-label="Previous" onClick={props.handlePaginationToFirstPage}>
          <i className="fa fa-fast-backward" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button href="#" className="btn btn-default" aria-label="Previous" onClick={props.handlePaginationToPreviousPage}>
          <i className="fa fa-step-backward" aria-hidden="true"></i>
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
        <i className="fa fa-step-forward" aria-hidden="true"></i>
        </button>
      </li>
      <li>
        <button href="#" className="btn btn-default" aria-label="Next" onClick={props.handlePaginationToLastPage}>
          <i className="fa fa-fast-forward" aria-hidden="true"></i>
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