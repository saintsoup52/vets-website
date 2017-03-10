import React from 'react';
import DropDown from '../../common/components/DropDown';
import IconUser from '../../common/components/svgicons/IconUser';

class SignInProfileMenu extends React.Component {
  render() {
    const icon = <IconUser color="#fff"/>;;

    const dropDownContents = (
      <ul>
        <li><a href="/profile">Account</a></li>
        <li><a href="#" onClick={this.props.onUserLogout}>Sign Out</a></li>
      </ul>
    );

    return (
      <DropDown
          buttonText={greeting}
          contents={dropDownContents}
          id="usermenu"
          icon={icon}
          isOpen={false}/>
    );
  }
}

SignInProfileMenu.propTypes = {
  cssClass: React.PropTypes.string
};

export default SignInProfileMenu;
