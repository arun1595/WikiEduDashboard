import React from 'react';
import NewAccountModal from './new_account_modal.jsx';
import { INSTRUCTOR_ROLE } from '../../constants';

const NewAccountButton = React.createClass({
  displayName: 'NewAccountButton',

  propTypes: {
    course: React.PropTypes.object.isRequired,
    passcode: React.PropTypes.string
  },

  getInitialState() {
    return {
      showModal: false
    };
  },

  openModal() {
    this.setState({ showModal: true });
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  render() {
    const { course } = this.props;
    // If register_accounts flag is set for the course, just link to the signup
    // endpoint for the user to register an account on their own.
    if (!course.flags || !course.flags.register_accounts) {
      return (
        <a href={`/users/auth/mediawiki_signup?origin=${window.location}`} className="button auth signup border margin">
          <i className="icon icon-wiki-logo" />{I18n.t('application.sign_up_extended')}
        </a>
      );
    }

    // If register_accounts flag is set for the course, use the NewAccountButton.
    let buttonOrModal;
    if (this.state.showModal) {
      buttonOrModal = <NewAccountModal course={course} passcode={this.props.passcode} closeModal={this.closeModal} currentUser={this.props.currentUser} />;
    } else {
      buttonOrModal = (
        <button onClick={this.openModal} key="request_account" className="button auth signup border margin request_accounts">
          <i className="icon icon-wiki-logo" /> {currentUser.role === INSTRUCTOR_ROLE ? I18n.t('application.create_accounts') : I18n.t('application.request_account')}
        </button>
      );
    }

    return buttonOrModal;
  }
});

export default NewAccountButton;
