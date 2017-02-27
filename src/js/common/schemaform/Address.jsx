import React from 'react';
import _ from 'lodash';
import { set, assign } from 'lodash/fp';

import { getDefaultFormState } from 'react-jsonschema-form/lib/utils';

import * as address from './definitions/address';
import { states } from '../utils/options-for-select';
import { pureWithDeepEquals } from './helpers';

const defaultStateSchema = address.schema().properties.state;

const militaryStates = states.USA.filter(state => state.value === 'AE' || state.value === 'AP' || state.value === 'AA');
const militaryStateSchema = assign(defaultStateSchema, {
  'enum': militaryStates.map(state => state.value),
  enumNames: militaryStates.map(state => state.label)
});

const stateSchemas = Object.keys(states).reduce((options, country) => {
  return assign(options, {
    [country]: assign(defaultStateSchema, {
      'enum': states[country].map(state => state.value),
      enumNames: states[country].map(state => state.label)
    })
  });
}, {});

/**
 * Input component for an address.
 */
class Address extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onPropertyBlur = this.onPropertyBlur.bind(this);
    this.isRequired = this.isRequired.bind(this);
    this.SchemaField = pureWithDeepEquals(props.registry.fields.SchemaField);
  }

  componentWillMount() {
    this.id = _.uniqueId('address-input-');
  }

  onPropertyBlur(name) {
    return (path = []) => {
      this.props.onBlur([name].concat(path));
    };
  }

  handleChange(path, update) {
    let newState = set(path, update, this.props.formData);

    // if country is changing we should clear the state
    if (path === 'country') {
      newState = set('state', undefined, newState);
    }

    this.props.onChange(newState);
  }

  isRequired(name) {
    const { schema } = this.props;
    const schemaRequired = Array.isArray(schema.required) &&
      schema.required.indexOf(name) !== -1;

    return schemaRequired;
  }

  isMilitaryCity(city) {
    const lowerCity = city.toLowerCase().trim();

    return lowerCity === 'apo' || lowerCity === 'fpo' || lowerCity === 'dpo';
  }

  render() {
    const {
      errorSchema,
      formContext,
      touchedSchema,
      schema,
      idSchema,
      uiSchema,
      registry
    } = this.props;
    const formData = this.props.formData
      ? this.props.formData
      : getDefaultFormState(schema, undefined, registry.definitions);
    const SchemaField = this.SchemaField;
    const TitleField = registry.fields.TitleField;
    const selectedCountry = formData.country;
    const title = uiSchema['ui:title'];
    let postalCodeUiSchema = uiSchema.postalCode;
    let stateUiSchema = uiSchema.state;
    let stateSchema = schema.properties.state;

    if (selectedCountry === 'CAN') {
      stateUiSchema = set('ui:title', 'Province', stateUiSchema);
    }

    if (selectedCountry === 'USA') {
      postalCodeUiSchema = set('ui:title', 'ZIP code', postalCodeUiSchema);
    }

    if (selectedCountry === 'USA' && formData.city && this.isMilitaryCity(formData.city)) {
      stateSchema = militaryStateSchema;
    } else if (stateSchemas[selectedCountry]) {
      stateSchema = stateSchemas[selectedCountry];
    }

    return (
      <div className={title ? 'schemaform-block' : undefined}>
        {title
            ? <TitleField
                id={`${idSchema.$id}__title`}
                title={title}
                formContext={formContext}/> : null}
        <SchemaField
            name="country"
            required={this.isRequired('country')}
            schema={schema.properties.country}
            uiSchema={uiSchema.country}
            idSchema={idSchema.country}
            formData={formData.country}
            errorSchema={errorSchema.country}
            registry={registry}
            formContext={formContext}
            touchedSchema={touchedSchema === undefined ? undefined : touchedSchema.country}
            onChange={(update) => {this.handleChange('country', update);}}
            onBlur={this.onPropertyBlur('country')}/>
        <SchemaField
            name="street"
            required={this.isRequired('street')}
            schema={schema.properties.street}
            uiSchema={uiSchema.street}
            idSchema={idSchema.street}
            formData={formData.street}
            errorSchema={errorSchema.street}
            registry={registry}
            formContext={formContext}
            touchedSchema={touchedSchema === undefined ? undefined : touchedSchema.street}
            onChange={(update) => {this.handleChange('street', update);}}
            onBlur={this.onPropertyBlur('street')}/>
        <SchemaField
            name="street2"
            required={this.isRequired('street2')}
            schema={schema.properties.street2}
            uiSchema={uiSchema.street2}
            idSchema={idSchema.street2}
            formData={formData.street2}
            errorSchema={errorSchema.street2}
            registry={registry}
            formContext={formContext}
            touchedSchema={touchedSchema === undefined ? undefined : touchedSchema.street2}
            onChange={(update) => {this.handleChange('street2', update);}}
            onBlur={this.onPropertyBlur('street2')}/>
        <SchemaField
            name="city"
            required={this.isRequired('city')}
            schema={schema.properties.city}
            uiSchema={uiSchema.city}
            idSchema={idSchema.city}
            formData={formData.city}
            errorSchema={errorSchema.city}
            registry={registry}
            formContext={formContext}
            touchedSchema={touchedSchema === undefined ? undefined : touchedSchema.city}
            onChange={(update) => {this.handleChange('city', update);}}
            onBlur={this.onPropertyBlur('city')}/>
        <SchemaField
            name="state"
            required={_.includes(['USA', 'CAN', 'MEX'], formData.country) && schema.required}
            schema={stateSchema}
            uiSchema={stateUiSchema}
            idSchema={idSchema.state}
            formData={formData.state}
            errorSchema={errorSchema.state}
            registry={registry}
            formContext={formContext}
            touchedSchema={touchedSchema === undefined ? undefined : touchedSchema.state}
            onChange={(update) => {this.handleChange('state', update);}}
            onBlur={this.onPropertyBlur('state')}/>
        <SchemaField
            name="postalCode"
            required={this.isRequired('postalCode')}
            schema={schema.properties.postalCode}
            uiSchema={postalCodeUiSchema}
            idSchema={idSchema.postalCode}
            formData={formData.postalCode}
            errorSchema={errorSchema.postalCode}
            registry={registry}
            formContext={formContext}
            touchedSchema={touchedSchema === undefined ? undefined : touchedSchema.postalCode}
            onChange={(update) => {this.handleChange('postalCode', update);}}
            onBlur={this.onPropertyBlur('postalCode')}/>
      </div>
    );
  }
}

export default Address;
