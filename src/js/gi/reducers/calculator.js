import { isFinite } from 'lodash';
import camelCaseKeysRecursive from 'camelcase-keys-recursive';

import {
  CALCULATOR_INPUTS_CHANGED,
  FETCH_PROFILE_SUCCEEDED
} from '../actions';

const INITIAL_STATE = {
  inState: 'yes',
  tuitionInState: 0,
  tuitionOutOfState: 0,
  tuitionFees: 0,
  books: 0,
  yellowRibbonRecipient: 'no',
  yellowRibbonAmount: 0,
  scholarships: 0,
  tuitionAssist: 0,
  enrolled: '1.0',
  enrolledOld: 'full',
  calendar: 'semesters',
  working: '30',
  numberNontradTerms: '2',
  lengthNontradTerms: '3',
  kickerEligible: 'no',
  kickerAmount: 200,
  buyUp: 'no',
  buyUpAmount: 600,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CALCULATOR_INPUTS_CHANGED: {
      const { field, value } = action;
      let convertedValue = value;

      const isDollarAmount = [
        'tuitionFees',
        'books',
        'yellowRibbonAmount',
        'scholarships',
        'tuitionAssist',
        'kickerAmount',
        'buyUpAmount'
      ].includes(field);

      if (isDollarAmount && !isFinite(value)) {
        const dollarAmount = value[0] === '$' ? +value.substring(1) : +value;
        convertedValue = isFinite(dollarAmount) ? dollarAmount : '';
      }

      const newState = {
        [field]: convertedValue,
      };

      if (field === 'inState') {
        newState.tuitionFees =
          value === 'yes' ?
          state.tuitionInState :
          state.tuitionOutOfState;
      }

      return {
        ...state,
        ...newState
      };
    }

    case FETCH_PROFILE_SUCCEEDED: {
      const camelPayload = camelCaseKeysRecursive(action.payload);

      const {
        tuitionInState,
        tuitionOutOfState,
        books,
        calendar
      } = camelPayload.data.attributes;

      return {
        ...INITIAL_STATE,
        tuitionInState,
        tuitionOutOfState,
        tuitionFees: tuitionInState,
        books,
        calendar
      };
    }

    default:
      return state;
  }
}