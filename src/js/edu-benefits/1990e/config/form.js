import {
  transform,
  eligibilityDescription
} from '../helpers';

import fullSchema1990e from 'vets-json-schema/dist/transfer-benefits-schema.json';

const {
  postHighSchoolTrainings,
} = fullSchema1990e.definitions;

import * as date from '../../../common/schemaform/definitions/date';
import * as dateRange from '../../../common/schemaform/definitions/dateRange';
import * as currentOrPastDate from '../../../common/schemaform/definitions/currentOrPastDate';
import * as fullName from '../../../common/schemaform/definitions/fullName';
import * as ssn from '../../../common/schemaform/definitions/ssn';

import IntroductionPage from '../components/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import EducationView from '../../components/EducationView';

import {
  benefitsLabels,
  genderLabels,
  hoursTypeLabels,
  relationshipLabels
} from '../../utils/helpers';

const {
  gender,
  relationship
} = fullSchema1990e.definitions;

const {
  benefit,
  faaFlightCertificatesInformation
} = fullSchema1990e.properties;

const formConfig = {
  urlPrefix: '/1990e/',
  submitUrl: '/v0/education_benefits_claims/1990e',
  trackingPrefix: 'edu-1990e-',
  transformForSubmit: transform,
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  defaultDefinitions: {
    dateRange: dateRange.schema
  },
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
            'view:educationHistory': {
              'ui:title': 'Please list all past post-high school trainings you have completed (or something like that):'
            },
            postHighSchoolTrainings: {
              'ui:title': 'Education after high school',
              'ui:options': {
                itemName: 'Training',
                viewField: EducationView,
                hideTitle: true,
              },
              items: {
                name: {
                  'ui:title': 'Name of college, university or other training provider'
                },
                city: {
                  'ui:title': 'City'
                },
                state: {
                  'ui:title': 'State'
                },
                dateRange: dateRange.uiSchema(
                  'From',
                  'To'
                ),
                hours: {
                  'ui:title': 'Hours completed'
                },
                hoursType: {
                  'ui:title': 'Type of hours',
                  'ui:options': {
                    labels: hoursTypeLabels
                  }          
                },
                degreeReceived: {
                  'ui:title': 'Degree, diploma or certificate received'
                },
                major: {
                  'ui:title': 'Major or course of study (NOT for high school)'
                }
              }
            },
            faaFlightCertificatesInformation: {
              'ui:title': 'If you have any FAA flight certificates, please list them here.',
              'ui:widget': 'textarea'
            }
          },
          schema: {
            type: 'object',
            properties: {
              highSchoolOrGedCompletionDate: date.schema,
              'view:educationHistory': {
                type: 'object',
                properties: {}
              },
              postHighSchoolTrainings,
              faaFlightCertificatesInformation
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
