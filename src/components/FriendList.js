import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import FriendListItem from './FriendListItem';

import styles from './FriendList.css';

class FriendList extends Component {
  render () {
    return (
      <ul className={styles.friendList}>
        {
          this.props.friends.map((friend, index) => {
            return (
              <FriendListItem
                key={index}
                id={index}
                name={friend.name}
                gender={friend.gender}
                starred={friend.starred}
                {...this.props.actions} />
            );
          })
        }
      </ul>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
