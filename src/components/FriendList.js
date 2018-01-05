import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import FriendListItem from './FriendListItem';
import PaginationControls from './PaginationControls';

import styles from './FriendList.css';

class FriendList extends Component {
  componentWillMount() {
    this.props.refreshPaginationInfo(
      this.props.friendListInfo.friendsById,
      this.props.listItemCountPerPage,
    );
  }

  componentWillReceiveProps (nextProps) {
    const nextFriendsList = nextProps.friendListInfo.friendsById;
    const oldFriendsList = this.props.friendListInfo.friendsById;

    if (JSON.stringify(oldFriendsList) !== JSON.stringify(nextFriendsList)) {
      nextProps.refreshPaginationInfo(nextFriendsList, nextProps.listItemCountPerPage);
    }
  }

  render () {
    const { friendsById, paginationInfo } = this.props.friendListInfo;
    const { itemCount, currentPageFriendsList } = paginationInfo;

    const friendsList = !itemCount ? friendsById : currentPageFriendsList;
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
        <PaginationControls
          totalPages={paginationInfo.totalPages}
          currentPage={paginationInfo.currentPage}
          changePaginationPage={this.props.changePaginationPage}
        />
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