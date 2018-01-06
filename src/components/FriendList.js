import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import FriendListItem from './FriendListItem';
import PaginationControls from './PaginationControls';

import styles from './FriendList.css';

class FriendList extends Component {
  //#region MARK: Super methods
  constructor(props, context) {
    super(props, context);

    this.handlePaginationToNextPage = this.handlePaginationToNextPage.bind(this);
    this.handlePaginationToPreviousPage = this.handlePaginationToPreviousPage.bind(this);
    this.handlePaginationToPageNumber = this.handlePaginationToPageNumber.bind(this);
    this.handlePaginationToFirstPage = this.handlePaginationToFirstPage.bind(this);
    this.handlePaginationToLastPage = this.handlePaginationToLastPage.bind(this);
  }

  componentWillMount() {
    this.props.refreshPaginationInfo(
      this.props.friendListInfo.friendsById,
      this.props.listItemCountPerPage,
    );
  }

  componentWillReceiveProps (nextProps) {
    const nextFriendsList = nextProps.friendListInfo.friendsById;
    const oldFriendsList = this.props.friendListInfo.friendsById;

    const { totalPages, currentPage } = nextProps.friendListInfo.paginationInfo;
    if(totalPages === currentPage && !!currentPage) {
      this.handlePaginationToPreviousPage(); return;
    }

    if (JSON.stringify(oldFriendsList) !== JSON.stringify(nextFriendsList)) {
      nextProps.refreshPaginationInfo(nextFriendsList, nextProps.listItemCountPerPage);
    }
  }
  //#endregion

  //#region MARK: Pagination navigation handlers4
  handlePaginationToFirstPage() {
    this.props.changePaginationPage(0);
  }
  
  handlePaginationToLastPage() {
    this.props.changePaginationPage(this.props.friendListInfo.paginationInfo.totalPages - 1);
  }

  handlePaginationToNextPage() {
    this.props.changePaginationPage(this.props.friendListInfo.paginationInfo.currentPage + 1);
  }

  handlePaginationToPreviousPage() {
    this.props.changePaginationPage(this.props.friendListInfo.paginationInfo.currentPage - 1);
  }

  handlePaginationToPageNumber(pageNumber) {
    this.props.changePaginationPage(pageNumber);
  }
  //#endregion

  render () {
    const { friendsById, paginationInfo } = this.props.friendListInfo;
    const { itemCount, currentPageFriendsList } = paginationInfo;

    const friendsList = friendsById.length <= itemCount ? friendsById : currentPageFriendsList;
    return (
      <div>
        <ul className={styles.friendList}>
          {
            friendsList.map((friend, index) => {
              return (
                <FriendListItem
                  key={index}
                  id={friend.id}
                  name={friend.name}
                  gender={friend.gender}
                  starred={friend.starred}
                  {...this.props.actions} />
              );
            })
          }
        </ul>
        { friendsById.length > itemCount && (
          <PaginationControls
            totalPages={paginationInfo.totalPages}
            currentPage={paginationInfo.currentPage}
            totalCount={friendsById.length}
            startingItemIndex={paginationInfo.startingItemIndex}
            endingItemIndex={paginationInfo.endingItemIndex}
            handlePaginationToFirstPage={this.handlePaginationToFirstPage}
            handlePaginationToLastPage={this.handlePaginationToLastPage}
            handlePaginationToNextPage={this.handlePaginationToNextPage}
            handlePaginationToPreviousPage={this.handlePaginationToPreviousPage}
            handlePaginationToPageNumber={this.handlePaginationToPageNumber}
          />
        )}
      </div>
    );
  }
}

FriendList.propTypes = {
  friendListInfo: PropTypes.object.isRequired,
  listItemCountPerPage: PropTypes.number.isRequired,
  refreshPaginationInfo: PropTypes.func.isRequired,
  changePaginationPage: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
