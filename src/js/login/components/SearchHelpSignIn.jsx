import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import HelpMenu from '../../common/components/HelpMenu';
import SearchMenu from '../../common/components/SearchMenu';
import SignInProfileMenu from './SignInProfileMenu';

import DropDown from '../../common/components/DropDown';
import IconUser from '../../common/components/svgicons/IconUser';

import { updateLoggedInStatus } from '../actions';

class SearchHelpSignIn extends React.Component {
  render() {
    let content;
    let greeting;

    console.log(this.props);

    if (this.props.login.currentlyLoggedIn) {
      if (this.props.profile.userFullName.first) {
        const firstName = _.startCase(_.toLower(this.props.profile.userFullName.first));
        greeting = firstName;
      } else {
        greeting = this.props.profile.email;
      }
      content = <SignInProfileMenu greeting={greeting}/>;
    } else {
      content = (<div>
        <a href="#" onClick={this.props.onUserLogin}>Sign In</a><span className="signin-spacer">|</span><a href="#" onClick={this.props.onUserSignup}>Register</a>
      </div>
      );
    }
    return (
      <div>
        <SearchMenu/>
        <HelpMenu/>
        <div className="sign-in-link">
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userState = state.user;
  return {
    login: userState.login,
    profile: userState.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateLoggedInStatus: (update) => {
      dispatch(updateLoggedInStatus(update));
    }
  }; 
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(SearchHelpSignIn);
export { SearchHelpSignIn };
