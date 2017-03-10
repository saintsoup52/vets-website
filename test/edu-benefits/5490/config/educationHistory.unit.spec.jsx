import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import sinon from 'sinon';
import ReactTestUtils from 'react-addons-test-utils';

import { DefinitionTester, submitForm } from '../../../util/schemaform-utils.jsx';
import formConfig from '../../../../src/js/edu-benefits/5490/config/form';

describe('Edu 5490 educationHistory', () => {
  const { schema, uiSchema } = formConfig.chapters.educationHistory.pages.educationHistory;
  it('should render', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
          schema={schema}
          data={{}}
          definitions={formConfig.defaultDefinitions}
          uiSchema={uiSchema}/>
    );
    const fields = Array.from(findDOMNode(form).querySelectorAll('input, select'));

    expect(fields.length)
      .to.equal(1);
  });

  it('should render diploma date', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
          schema={schema}
          data={{}}
          definitions={formConfig.defaultDefinitions}
          uiSchema={uiSchema}/>
    );
    const formDOM = findDOMNode(form);

    ReactTestUtils.Simulate.change(formDOM.querySelector('select'), {
      target: {
        value: 'graduated'
      }
    });

    expect(formDOM.querySelectorAll('input,select').length).to.equal(17);

    ReactTestUtils.Simulate.change(formDOM.querySelector('select'), {
      target: {
        value: 'ged'
      }
    });

    expect(formDOM.querySelectorAll('input,select').length).to.equal(17);
  });

  it('should render high school questions', () => {
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
          schema={schema}
          data={{}}
          definitions={formConfig.defaultDefinitions}
          uiSchema={uiSchema}/>
    );
    const formDOM = findDOMNode(form);

    ReactTestUtils.Simulate.change(formDOM.querySelector('select'), {
      target: {
        value: 'graduationExpected'
      }
    });

    expect(formDOM.querySelectorAll('input,select').length).to.equal(13);
  });

  it('should have no required inputs', () => {
    const onSubmit = sinon.spy();
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
          schema={schema}
          onSubmit={onSubmit}
          data={{}}
          definitions={formConfig.defaultDefinitions}
          uiSchema={uiSchema}/>
    );
    const formDOM = findDOMNode(form);
    submitForm(form);

    expect(Array.from(formDOM.querySelectorAll('.usa-input-error'))).to.be.empty;

    expect(onSubmit.called).to.be.true;
  });

  it('should add another', () => {
    const onSubmit = sinon.spy();
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester
          schema={schema}
          onSubmit={onSubmit}
          data={{}}
          definitions={formConfig.defaultDefinitions}
          uiSchema={uiSchema}/>
    );
    const formDOM = findDOMNode(form);
    ReactTestUtils.Simulate.change(formDOM.querySelector('select'), {
      target: {
        value: 'graduated'
      }
    });
    ReactTestUtils.Simulate.change(formDOM.querySelector('#root_postHighSchoolTrainings_0_name'), {
      target: {
        value: 'A college name'
      }
    });
    ReactTestUtils.Simulate.click(formDOM.querySelector('.va-growable-add-btn'));

    expect(formDOM.querySelector('.va-growable-background').textContent)
      .to.contain('A college name');
  });
});
