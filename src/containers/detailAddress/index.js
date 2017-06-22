import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import {each} from 'lodash';
import {Grid, Form, Button} from 'semantic-ui-react';
import {addressDetailRequest, addressUpdateRequest, changeStatusAddress} from '../../actions'

if(process.env.WEBPACK) require('./index.scss');

class DetailAddress extends Component {
	state = {
		addressKey: '',
		street: '',
		ward: '',
		district: '',
		city: '',
		country: ''
	}
	componentWillMount() {
		if ((this.props.params || {}).key !== '') {
			this.setState({
				addressKey: (this.props.params || {}).key
			});
			this.props.addressDetailRequest((this.props.params || {}).key);
		} else {
			this.props.router.push('/');
		}
	}
	componentWillReceiveProps(nextProps) {
		if ((nextProps.detailAddress||{}).status == 'success') {
			this.setState({
				...(nextProps.detailAddress||{}).data
			});
		}
		if ((nextProps.updateAddress||{}).status == 'success') {
			// this.setState({
			// 	...(nextProps.updateAddress||{}).data
			// });
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
	handleUpdate = (e) => {
		e.preventDefault();
		this.props.addressUpdateRequest(this.state);
	}
	render() {

		return (
			<div className='detail-address'>
				<div className="content-detail-address">
					<Grid columns={3}>
						<Grid.Row>
							<Grid.Column>
							</Grid.Column>
							<Grid.Column>
								<h1>Detail Address</h1>
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
									<Button type='submit' onClick={this.handleUpdate}>Update</Button>
								</Form>
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
		detailAddress: state.detailAddress,
		updateAddress: state.updateAddress
	};
}

const mapDispatchToProps = {
	addressDetailRequest,
	addressUpdateRequest,
	changeStatusAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailAddress));
