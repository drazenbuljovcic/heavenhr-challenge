import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';

export default class PaginationControls extends React.Component {
  //#region MARK: Super Methods
  constructor(props, context) {
    super(props, context);

    this.handlePaginationToNextPage = this.handlePaginationToNextPage.bind(this);
    this.handlePaginationToPreviousPage = this.handlePaginationToPreviousPage.bind(this);
  }
  //#endregion

  handlePaginationToNextPage() {
    const { currentPage, changePaginationPage } = this.props;

    changePaginationPage(currentPage + 1);
  }

  handlePaginationToPreviousPage() {
    const { currentPage, changePaginationPage } = this.props;

    changePaginationPage(currentPage- 1);
  }

  render() {
    return (
      <div>
        <ul className="pagination">
          <li>
            <a href="#" className="btn btn-default" aria-label="Previous" onClick={this.handlePaginationToPreviousPage}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {
            times(this.props.totalPages, (i) => (
              <li key={i}>
                <a href="#" className="btn btn-default">
                  {i + 1}
                </a>
              </li>
            ))
          }
          <li>
            <a href="#" className="btn btn-default" aria-label="Next" onClick={this.handlePaginationToNextPage}>
              <span aria-hidden="true">&raquo;</span>
            </a>
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