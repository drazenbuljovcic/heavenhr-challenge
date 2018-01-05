import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import classnames from 'classnames';
import styles from './FriendListItem.css';

class FriendListItem extends Component {
  render() {
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div>
            <span>{this.props.name}</span>
            <i className={classnames('fa', {
              'fa-male': this.props.gender === 'male',
              'fa-female': this.props.gender === 'female'
            })} aria-hidden="true" />
          </div>
          <div>
            <small>xx friends in common</small>
          </div>
        </div>
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => this.props.starFriend(this.props.id)}>
            <i className={classnames('fa', {
              'fa-star': this.props.starred,
              'fa-star-o': !this.props.starred
            })} />
          </button>
          <button className={`btn btn-default ${styles.btnAction}`}
                  onClick={() => this.props.deleteFriend(this.props.id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }
}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired
};

FriendListItem.defaultProps = {
  gender: '',
}

export default FriendListItem
