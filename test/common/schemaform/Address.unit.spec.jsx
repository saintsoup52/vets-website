import React from 'react';
import { expect } from 'chai';
import SkinDeep from 'skin-deep';
import sinon from 'sinon';

import Address from '../../../src/js/common/schemaform/Address';

const props = {
	formData: {
		country: 'USA',
	  street: '100 Test Lane',
	  street2: undefined,
	  city: 'Chicago',
	  state: 'IL',
	  postalCode: '60611',
	},
	schema: {
    type: 'object',
		properties: {
      country: {},
      street: {},
      street2: {},
      city: {},
      state: {},
      postalCode: {},
    },
    required: []
	},
	registry: {
		fields: {
			SchemaFields: f => f
		}
	},
	uiSchema: {},
	idSchema: {},
	errorSchema: {},
  touchedSchema: {}
}

describe('Schemaform: Address', () => {
  it('should render', () => {
    const onChange = sinon.spy();
    const onBlur = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <Address
          id="test"
          onChange={onChange}
          onBlur={onBlur}
          formData={props.formData}
          registry={props.registry}
          schema={props.schema}
          uiSchema={props.uiSchema}
          idSchema={props.idSchema}
          errorSchema={props.errorSchema}
          touchedSchema={props.touchedSchema}/>
    );

    const renderedSubTree1 = tree.everySubTree()[0];

    console.log(tree.props);
    // console.log(renderedSubTree1);
    console.log(renderedSubTree1.getRenderOuput);
    // console.log('getRenderOuput': renderedSubTree1.getRenderOutput());
    console.log('type': renderedSubTree1.type);
    console.log('props': renderedSubTree1.props);


    expect(tree.everySubTree('select').length).to.equal(2);
    expect(tree.everySubTree('input').length).to.equal(4);
  });
  xit('should render initial address', () => {
    const onChange = sinon.spy();
    const onBlur = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <Address
          id="test"
          formData={props.formData}
          onChange={onChange}
          onBlur={onBlur}/>
    );

    expect(tree.everySubTree('select')[0].props.value).to.equal('1');
    expect(tree.everySubTree('select')[1].props.value).to.equal('3');
    expect(tree.everySubTree('input')[0].props.value).to.equal('2010');
  });
  xit('should call onChange', () => {
    const onChange = sinon.spy();
    const onBlur = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <Address
          id="test"
          onChange={onChange}
          onBlur={onBlur}/>
    );

    const instance = tree.getMountedInstance();
    instance.handleChange('street', '200 Mock Drive');

    expect(onChange.called).to.be.true;
  });
  xit('should call onChange only when all fields filled out if required', () => {
    const onChange = sinon.spy();
    const onBlur = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <Address
          id="test"
          required
          onChange={onChange}
          onBlur={onBlur}/>
    );

    const instance = tree.getMountedInstance();
    instance.handleChange('country', 'France');
    instance.handleChange('street', '8 Rue Elzevir');
    instance.handleChange('city', 'Paris');
    instance.handleChange('postalCode', '75003');

    expect(onChange.firstCall.args[0]).to.be.undefined;
    expect(onChange.secondCall.args[0]).to.be.undefined;
    expect(onChange.thirdCall.args[0]).not.to.be.undefined;
    expect(onChange.fourthCall.args[0]).not.to.be.undefined;
  });
  xit('should call onBlur', () => {
    const onChange = sinon.spy();
    const onBlur = sinon.spy();
    const tree = SkinDeep.shallowRender(
      <Address
          id="test"
          onChange={onChange}
          onBlur={onBlur}/>
    );

    const instance = tree.getMountedInstance();
    instance.handleBlur('country');
    instance.handleBlur('street');
    instance.handleBlur('city');
    instance.handleBlur('state');
    instance.handleBlur('postalCode');

    expect(onBlur.calledOnce).to.be.true;
  });
});
