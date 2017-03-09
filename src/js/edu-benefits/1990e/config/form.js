import {
  transform,
  eligibilityDescription
} from '../helpers';

import fullSchema1990e from 'vets-json-schema/dist/transfer-benefits-schema.json';

const {
    postHighSchoolTrainings,
    school
} = fullSchema1990e.definitions;

import * as address from '../../../common/schemaform/definitions/address';
import * as date from '../../../common/schemaform/definitions/date';
import * as currentOrPastDate from '../../../common/schemaform/definitions/currentOrPastDate';
import * as fullName from '../../../common/schemaform/definitions/fullName';
import * as ssn from '../../../common/schemaform/definitions/ssn';

import IntroductionPage from '../components/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import {
  benefitsLabels,
  relationshipLabels,
  genderLabels
} from '../../utils/helpers';

const {
  gender,
  relationship
} = fullSchema1990e.definitions;

const {
  benefit
} = fullSchema1990e.properties;

const formConfig = {
  urlPrefix: '/1990e/',
  submitUrl: '/v0/education_benefits_claims/1990e',
  trackingPrefix: 'edu-1990e-',
  transformForSubmit: transform,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  title: 'Apply for transferred education benefits',
  subTitle: 'Form 22-1990e',
  chapters: {
    applicantInformation: {
      title: 'Applicant Information',
      pages: {
        applicantInformation: {
          path: 'applicant-information',
          title: 'Applicant information',
          initialData: {},
          uiSchema: {
            relativeFullName: fullName.uiSchema,
            relativeSocialSecurityNumber: ssn.uiSchema,
            relativeDateOfBirth: currentOrPastDate.uiSchema('Date of birth'),
            gender: {
              'ui:widget': 'radio',
              'ui:title': 'Gender',
              'ui:options': {
                labels: genderLabels
              }
            },
            relationship: {
              'ui:widget': 'radio',
              'ui:title': 'What is your relationship to the service member whose benefit is being transferred to you?',
              'ui:options': {
                labels: relationshipLabels
              }
            }
          },
          schema: {
            type: 'object',
            required: ['relativeFullName'],
            properties: {
              relativeFullName: fullName.schema,
              relativeSocialSecurityNumber: ssn.schema,
              relativeDateOfBirth: currentOrPastDate.schema,
              gender,
              relationship
            }
          }
        }
      }
    },
    benefitEligibility: {
      title: 'Benefit Eligibility',
      pages: {
        benefitEligibility: {
          path: 'benefit-eligibility',
          title: 'Benefit Eligibility',
          uiSchema: {
            'view:benefitDescription': {
              'ui:description': eligibilityDescription
            },
            benefit: {
              'ui:widget': 'radio',
              'ui:title': 'Select the benefit that is the best match for you.',
              'ui:options': {
                labels: benefitsLabels
              }
            }
          },
          schema: {
            type: 'object',
            properties: {
              'view:benefitDescription': {
                type: 'object',
                properties: {}
              },
              benefit
            }
          },
        }
      }
    },
    sponsorVeteran: {
      title: 'Sponsor Veteran',
      pages: {
      }
    },
    educationHistory: {
      title: 'Education History',
      pages: {
        educationHistory: {
          path: 'education-history',
          title: 'Education History',
          initialData: {
          },
          uiSchema: {
            highSchoolOrGedCompletionDate: date.uiSchema('When did you earn your high school diploma or equivalency certificate?'),
            // replace with postHighSchoolTrainings
            school: {
              name: {
                'ui:title': 'Name of college, university or other training provider'
              },
              address: _.pick(['city', 'state'], address.uiSchema()),
            }
          },
          schema: {
            type: 'object',
            properties: {
              highSchoolOrGedCompletionDate: date.schema,
              postHighSchoolTrainings
              /*
              school: _.set('properties.address',
                            _.pick(['type', 'required', 'properties.city', 'properties.state'], address.schema()),
                            school),
               */
            }
          }
        }
      }
    },
    employmentHistory: {
      title: 'Employment History',
      pages: {
      }
    },
    schoolSelection: {
      title: 'School Selection',
      pages: {
      }
    },
    personalInformation: {
      title: 'Personal Information',
      pages: {
      }
    }
  }
};


export default formConfig;
