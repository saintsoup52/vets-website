import _ from 'lodash/fp';

import { UPDATE_PROFILE_FIELD } from '../actions';
import { makeField } from '../../common/model/fields';

const initialState = {
  service: makeField(''),
  dob: makeField(''),
  gender: makeField(''),
  accountType: makeField('')
};

function dischargeInformation(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE_FIELD: {
      return _.set(action.propertyPath, action.value, state);
    }

    default:
      return state;
  }
}

export default dischargeInformation;
