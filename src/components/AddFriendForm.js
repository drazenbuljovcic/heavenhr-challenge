import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import classnames from 'classnames';
import styles from './AddFriendForm.css';

class AddFriendForm extends Component {
  //#region MARK: Super methods
  constructor (props, context) {
    super(props, context);

    this.state = {
      name: '',
      gender: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //#endregion

  //#region MARK: Event handlers
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  
  handleGenderChange(e) {
    this.setState({ 'gender': e.target.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    
    if(!this.state.name) { return; }

    this.props.addFriend(this.state.name, this.state.gender);

    e.target.reset();
    this.input.focus();
    this.setState({ name: '', gender: '' });
  }
  //#endregion

  render () {
    return (
      <form onSubmit={this.handleSubmit} className={classnames(styles.friendForm)}>
        <input
          type="text"
          autoFocus="true"
          ref={input => this.input = input}
          className={classnames('form-control', styles.addFriendInput)}
          placeholder="Name of your friend"
          value={this.state.name}
          onChange={this.handleNameChange} />

        <div className={classnames(styles.genderSelectionContainer)}>
          <input type="radio" id="gender-male" value="male" name="gender" onChange={this.handleGenderChange} />
          <label htmlFor="gender-male">
            <i className={classnames('btn btn-default fa fa-male')} aria-hidden="true"></i>
          </label>

          <input type="radio" id="gender-female" value="female" name="gender" onChange={this.handleGenderChange} />
          <label htmlFor="gender-female">
            <i className={classnames('btn btn-default fa fa-female')} aria-hidden="true"></i>
          </label>
        </div>

        <button className={classnames('btn btn-success')} type="submit">
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
      </form>
    );
  }
}

AddFriendForm.propTypes = {
  addFriend: PropTypes.func.isRequired,
};

export default AddFriendForm;
