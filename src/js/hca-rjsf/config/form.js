import _ from 'lodash/fp';

import fullSchemaHca from 'vets-json-schema/dist/10-10EZ-schema.json';

import { transform } from '../helpers';

import IntroductionPage from '../components/IntroductionPage';

import { uiSchema as fullNameUISchema } from '../../common/schemaform/definitions/fullName';
import * as ssn from '../../common/schemaform/definitions/ssn';

const {
  fullName,
  date
} = fullSchemaHca.definitions;

const {
  cityOfBirth,
  stateOfBirth
} = fullSchemaHca.properties;

const formConfig = {
  urlPrefix: '/',
  submitUrl: '',
  trackingPrefix: 'hca-rjsf-',
  transformForSubmit: transform,
  introduction: IntroductionPage,
  title: 'Apply for health care',
  subTitle: 'Form 10-10ez',
  chapters: {
    veteranInformation: {
      title: 'Veteran information',
      pages: {
        veteranInformation: {
          path: 'veteran-information/personal-information',
          title: 'Veteran information',
          initialData: {},
          uiSchema: {
            veteranFullName: _.merge(fullNameUISchema, {
              first: {
                'ui:errorMessages': {
                  minLength: 'Please provide a valid name. Must be at least 2 characters.'
                }
              }
            }),
            mothersMaidenName: {
              'ui:title': 'Mother’s maiden name'
            }
          },
          schema: {
            type: 'object',
            properties: {
              veteranFullName: _.merge(fullName, {
                properties: {
                  suffix: {
                    type: 'string'
                  }
                }
              }),
              mothersMaidenName: {
                type: 'string'
              }
            }
          }
        },
        birthInformation: {
          path: 'veteran-information/birth-information',
          title: 'Veteran information',
          initialData: {},
          uiSchema: {
            veteranDateOfBirth: {
              'ui:title': 'Date of birth'
            },
            veteranSocialSecurityNumber: ssn.uiSchema,
            cityOfBirth: {
              'ui:title': 'City of birth'
            },
            stateOfBirth: {
              'ui:title': 'State of birth'
            }
          },
          schema: {
            type: 'object',
            required: ['veteranDateOfBirth', 'veteranSocialSecurityNumber'],
            properties: {
              veteranDateOfBirth: date,
              veteranSocialSecurityNumber: ssn.schema,
              cityOfBirth,
              stateOfBirth: _.merge(stateOfBirth, {
                type: 'string'
              })
            }
          }
        },
        demographicInformation: {
          path: 'veteran-information/demographic-information',
          title: 'Veteran information',
          initialData: {},
          uiSchema: {},
          schema: {}
        },
        veteranAddress: {
          path: 'veteran-information/veteran-address',
          title: 'Permanent address',
          initialData: {},
          uiSchema: {},
          schema: {}
        },
        contactInformation: {
          path: 'veteran-information/contact-information',
          title: 'Contact information',
          initialData: {},
          uiSchema: {},
          schema: {}
        }
      }
    }
  }
};

export default formConfig;
