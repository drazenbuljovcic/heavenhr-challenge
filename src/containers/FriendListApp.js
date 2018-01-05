import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './FriendListApp.css';

import { 
  addFriend,
  deleteFriend,
  starFriend,
  refreshPaginationInfo,
  changePaginationPage,
} from '../actions/FriendsActions';

import { FriendList, AddFriendForm } from '../components';

import { ITEM_COUNT } from '../constants/FriendListPagination';

class FriendListApp extends Component {

  render () {
    const { friendlist } = this.props;

    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendForm addFriend={actions.addFriend} />
        <FriendList
          listItemCountPerPage={ITEM_COUNT}
          refreshPaginationInfo={this.props.refreshPaginationInfo}
          changePaginationPage={this.props.changePaginationPage}
          friendListInfo={friendlist}
          actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  refreshPaginationInfo,
  changePaginationPage,
})(FriendListApp)
