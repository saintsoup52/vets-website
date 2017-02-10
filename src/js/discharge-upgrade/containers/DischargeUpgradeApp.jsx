import React from 'react';
import { connect } from 'react-redux';

import { yesNo } from '../utils/questions.js';
import { updateProfileField } from '../actions';
import { validateIfDirty, isNotBlank } from '../../common/utils/validations';

import ErrorableSelect from '../../common/components/form-elements/ErrorableSelect';

class DischargeUpgradeApp extends React.Component {

  render() {
    let isValid;

    if (this.props.required) {
      isValid = validateIfDirty(this.props.value, isNotBlank);
    } else {
      isValid = true;
    }

    return (
      <div className="row">
        <div className="small-12 columns">
          <div>
            Hello! I am working
            <ErrorableSelect errorMessage={isValid ? undefined : ''}
                label="Did you serve?"
                name="service"
                options={yesNo}
                value={this.props.service}
                onValueChange={(update) => {this.props.onStateChange('service', update);}}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    service: state.service,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStateChange: (field, update) => {
      dispatch(updateProfileField(field, update));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(DischargeUpgradeApp);
export { DischargeUpgradeApp };
