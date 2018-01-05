import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';

export default class PaginationControls extends React.Component {
  //#region MARK: Super Methods
  constructor(props, context) {
    super(props, context);

    this.handlePaginationToNextPage = this.handlePaginationToNextPage.bind(this);
    this.handlePaginationToPreviousPage = this.handlePaginationToPreviousPage.bind(this);
    this.handlePaginationToPageNumber = this.handlePaginationToPageNumber.bind(this);
  }
  //#endregion

  //# MARK: Pagination navigation handlers
  handlePaginationToNextPage() {
    const { currentPage, changePaginationPage } = this.props;

    changePaginationPage(currentPage + 1);
  }

  handlePaginationToPreviousPage() {
    const { currentPage, changePaginationPage } = this.props;

    changePaginationPage(currentPage- 1);
  }

  handlePaginationToPageNumber(pageNumber) {
    this.props.changePaginationPage(pageNumber);
  }
  //#endregion

  render() {
    return (
      <div>
        <ul className="pagination">
          <li>
            <button href="#" className="btn btn-default" aria-label="Previous" onClick={this.handlePaginationToPreviousPage}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {
            times(this.props.totalPages, (i) => (
              <li key={i}>
                <button href="#" className="btn btn-default" onClick={this.handlePaginationToPageNumber.bind(null, i)}>
                  {i + 1}
                </button>
              </li>
            ))
          }
          <li>
            <button href="#" className="btn btn-default" aria-label="Next" onClick={this.handlePaginationToNextPage}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

PaginationControls.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePaginationPage: PropTypes.func.isRequired,
}