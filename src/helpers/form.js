import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	FormControl, FormGroup, ControlLabel, HelpBlock, Button
} from 'react-bootstrap';
import appConfig from '../config';
import DateTime from 'react-datetime';


export const FieldGroup_bk = ({ id, label, help, placeholder, ...props }) => (
	<FormGroup controlId={id}>
		<ControlLabel>{label}</ControlLabel>
		<FormControl {...props} />
		{help && <HelpBlock>{help}</HelpBlock>}
	</FormGroup>
)

export const TextareaGroup = ({ id, label, type, name, placeholder, ...props }) => (
	<div className='form-group'>
		<label className="control-label" htmlFor={id}>{label}</label>
		<textarea className='form-control' name={name} id={id} placeholder={placeholder} {...props} />
	</div>
)

export const PriceGroup = ({ id, label, is_fixed_price, fixed_price,  onChange, max_price, min_price }) => {
	let field = (<div className="form-inline row"><div className="col-md-6 col-xs-6"><input onChange={onChange} type={'text'} className='form-control' name="min_price" id={id} value={min_price} /></div><div className="col-md-6 col-xs-6"><input onChange={onChange} type={'text'} className='form-control' name="max_price" id={id} value={max_price} /></div></div>);
	if (is_fixed_price) {
		if (fixed_price == 0) {
			field = (<div className="form-inline row"><div className="col-md-12 col-xs-12"><input onChange={onChange} type={'text'} className='form-control' name="max_price" id={id} value={max_price} /></div></div>);
		} else {
			field = (<div className="form-inline row"><div className="col-md-12 col-xs-12"><input onChange={onChange} type={'text'} className='form-control' name="max_price" id={id} value={max_price} readOnly /></div></div>);
		}
	}
	return (<div className='form-group price-group'>
		<label className="control-label" htmlFor={id}>{label}</label>
		{field}
	</div>);
}

export const FieldGroup = ({ id, label, type, name, placeholder, ...props }) => (
	<div className='form-group'>
		<label className="control-label" htmlFor={id}>{label}</label>
		<input type={type? type : 'text'} className='form-control' name={name} id={id} placeholder={placeholder} {...props} />
	</div>
)

export const CheckBoxGroup = ({label, name, value, ...props}) => (
	<div className={props.isDisable ? 'checkbox disabled form-group' : 'checkbox form-group'}>
		<label className="control-label">
			<input type='checkbox' name={name} value={value} {...props}/> {label}
		</label>
	</div>
)

export const RadioGroup = ({label, name, value, ...props}) => (
	<div className={props.isDisable ? 'radio disabled form-group' : 'radio form-group'}>
		<label className="control-label">
			<input type="radio" name={name} value={value} {...props} />
			{label}
		</label>
	</div>
)

export const SelectGroup = ({label, name, ...props}) => (
	<div className={props.isDisable ? 'form-group disabled' : 'form-group'}>
		<label className="control-label">{label}</label>
		<select className="form-control" name={name} {...props}>
		{props.children}
		</select>
	</div>
)

var yesterday = DateTime.moment().subtract( 1, 'day' );
var valid = function( current ){
	return current.isAfter( yesterday );
};
export const DateTimeGroup = ({label, name, ...props}) => (
	<div className={props.isDisable ? 'form-group disabled' : 'form-group'}>
		<label className="control-label">{label}</label>
		<DateTime
			isValidDate={ valid }
			defaultValue={new Date()}
			className='datetime-input'
			inputProps={{readOnly: true}}
			{...props}
			/>
	</div>
)

