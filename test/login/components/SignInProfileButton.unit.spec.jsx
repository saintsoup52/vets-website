import React from 'react';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';

import { SignInProfileButton } from '../../../src/js/login/components/SignInProfileButton.jsx';

describe('<SignInProfileButton>', () => {
  const loginData = {
    currentlyLoggedIn: false,
    loginUrl: ''
  };

  let tree = SkinDeep.shallowRender(<SignInProfileButton login={loginData}/>);

  it('should render', () => {
    const vdom = tree.getRenderOutput();
    expect(vdom).to.not.be.undefined;
  });

  it('should display signin or signup links when user is not logged in.', () => {
    const link = tree.everySubTree('a');
    expect(link).to.have.lengthOf(2);
  });

  it('should display email address when user is logged in but not has not identity proofed.', () => {
    // const link = tree.everySubTree('a');
    // expect(link).to.have.lengthOf(2);
  });

  it('should display first name when user is logged in and has identity proofed.', () => {
    // const link = tree.everySubTree('a');
    // expect(link).to.have.lengthOf(2);
  });

  const signedInData = { currentlyLoggedIn: true, loginUrl: '' };
  const verifiedProfileData = { userFullName: { first: 'Sharon' } };
  const nonVerifiedProfileData = { email: 'fake@aol.com', userFullName: { first: null } };


  it('should display profile, and signout links when user is logged in.', () => {
    tree = SkinDeep.shallowRender(<SignInProfileButton login={signedInData} profile={nonVerifiedProfileData}/>);
    const link = tree.everySubTree('a');
    expect(link).to.have.lengthOf(2);
  });

  it('should display email when user is logged in and first name has not been provided.', () => {
    tree = SkinDeep.shallowRender(<SignInProfileButton login={signedInData} profile={nonVerifiedProfileData}/>);
    const greeting = tree.everySubTree('.greeting');
    expect(greeting).to.have.lengthOf(1);
    expect(greeting).to.equal('fake@aol.com');
  });

  it('should display first name, profile, and signout links when user is logged in and first name has been provided.', () => {
    tree = SkinDeep.shallowRender(<SignInProfileButton login={signedInData} profile={verifiedProfileData}/>);
    const greeting = tree.everySubTree('.greeting');
    expect(greeting).to.have.lengthOf(1);
  });
});
