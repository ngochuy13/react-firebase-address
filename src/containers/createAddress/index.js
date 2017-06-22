import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import {each} from 'lodash';
import {Grid, Form, Button} from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import {addressCreateRequest, changeStatusAddress} from '../../actions'

if(process.env.WEBPACK) require('./index.scss');

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
	ref={props.onMapLoad}
	defaultZoom={10}
	defaultCenter={{ lat: 10.80093264068755, lng: 106.61870956420898 }}
	onClick={props.onMapClick}
  >
	{props.markers.map(marker => (
	  <Marker
		{...marker}
		onRightClick={() => props.onMarkerRightClick(marker)}
	  />
	))}
  </GoogleMap>
));


class CreateAddress extends Component {
	state = {
		createType: '',
		street: '',
		ward: '',
		district: '',
		city: '',
		country: '',
		address: '',
		markers: []
	}
	componentWillMount() {
		if ((this.props.params || {}).key !== '') {
			this.setState({
				createType: (this.props.params || {}).type
			});
		} else {
			this.props.router.push('/');
		}
	}
	componentWillReceiveProps(nextProps) {
		if ((nextProps.createAddress||{}).status == 'success') {
			this.props.router.push('/');
		}
	}
	componentWillUnmount() {
		this.props.changeStatusAddress();
	}
	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}
	handleCreate = (e) => {
		e.preventDefault();
		this.props.addressCreateRequest({
			street: this.state.street || "",
			ward: this.state.ward || "",
			district: this.state.district || "",
			city: this.state.city || "",
			country: this.state.country || ""
		});
	}
	renderFrom = () => {
		return (
			<Form>
				<Form.Field>
					<label>Street</label>
					<input value={this.state.street} name='street' onChange={this.handleChange} placeholder='Street' />
				</Form.Field>
				<Form.Field>
					<label>Ward</label>
					<input value={this.state.ward} name='ward' onChange={this.handleChange} placeholder='Ward' />
				</Form.Field>
				<Form.Field>
					<label>District</label>
					<input value={this.state.district} name='district' onChange={this.handleChange} placeholder='District' />
				</Form.Field>
				<Form.Field>
					<label>City</label>
					<input value={this.state.city} name='city' onChange={this.handleChange} placeholder='City' />
				</Form.Field>
				<Form.Field>
					<label>Country</label>
					<input value={this.state.country} name='country' onChange={this.handleChange} placeholder='Country' />
				</Form.Field>
				<Button type='submit' onClick={this.handleCreate}>Create</Button>
			</Form>
		);
	}
	handleMapLoad = (map) => {
		this._mapComponent = map;
		if (map) {
			// console.log(map.getZoom());
		}
	}
	handleMapClick = (event) => {
		const nextMarkers = [
			{
				position: event.latLng,
				defaultAnimation: 2,
				key: Date.now()
			},
		];
		this.setState({
			markers: nextMarkers,
		});
		const lat = event.latLng.lat();
		const lng = event.latLng.lng();
		const geocoder = new google.maps.Geocoder();
		const latlng = new google.maps.LatLng(lat, lng);
		const self = this;
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				let address = results[0];
				self.setState({
					street: address.address_components[0].long_name + ' ' + address.address_components[1].long_name,
					ward: address.address_components[address.address_components.length - 4].long_name || '',
					district: address.address_components[address.address_components.length - 3].long_name || '',
					city: address.address_components[address.address_components.length - 2].long_name || '',
					country: address.address_components[address.address_components.length - 1].long_name || '',
					address: address.formatted_address || ''
				})
			}
		})
	}
	renderMap = () => {
		return (
			<Form>
				<div style={{height: `320px`, marginBottom: `20px`}}>
					<GettingStartedGoogleMap
						containerElement={
							<div style={{ height: `100%` }} />
						}
						mapElement={
							<div style={{ height: `100%` }} />
						}
						onMapLoad={this.handleMapLoad}
						onMapClick={this.handleMapClick}
						markers={this.state.markers}
					/>
				</div>
				<Form.Field>
					<label>Address</label>
					<input value={this.state.address} placeholder='Address' readOnly />
				</Form.Field>
				<Button type='submit' onClick={this.handleCreate}>Create</Button>
			</Form>
		);
	}
	setPlace = (data) => {
		const self = this;
		geocodeByAddress(data)
			.then(results => {
				let address = results[0];
				// console.log('address', address);
				self.setState({
					street: address.address_components[0].long_name + ' ' + address.address_components[1].long_name,
					ward: address.address_components[address.address_components.length - 4].long_name || '',
					district: address.address_components[address.address_components.length - 3].long_name || '',
					city: address.address_components[address.address_components.length - 2].long_name || '',
					country: address.address_components[address.address_components.length - 1].long_name || '',
					address: address.formatted_address || ''
				})
			})
			.catch(error => console.error('Error', error));
	}
	renderAutocomplete = () => {
		const inputProps = {
			value: this.state.address,
			onChange: address => this.setState({address})
		};
		const cssClasses = {
			root: 'form-group',
			input: 'form-control',
			autocompleteContainer: 'my-autocomplete-plance-container'
		};
		return (
			<Form>
				<Form.Field>
					<label>Address</label>
					<PlacesAutocomplete onSelect={this.setPlace} classNames={cssClasses} inputProps={inputProps} />
				</Form.Field>
				<Button type='submit' onClick={this.handleCreate}>Create</Button>
			</Form>
		);
	}
	render() {
		let content = '';
		switch (this.state.createType) {
			case 1:
			case '1':
				content = this.renderFrom();
				break;
			case 2:
			case '2':
				content = this.renderMap();
				break;
			case 3:
			case '3':
				content = this.renderAutocomplete();
				break;
			default:
				break;
		}
		return (
			<div className='detail-address'>
				<div className="content-detail-address">
					<Grid columns={3}>
						<Grid.Row>
							<Grid.Column>
							</Grid.Column>
							<Grid.Column>
								<h1>Create Address</h1>
								{content}
							</Grid.Column>
							<Grid.Column>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		createAddress: state.createAddress
	};
}

const mapDispatchToProps = {
	addressCreateRequest, changeStatusAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAddress));
