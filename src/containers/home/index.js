import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {each} from 'lodash';
import {Table} from 'semantic-ui-react';

if(process.env.WEBPACK) require('./index.scss');

class Home extends Component {
	componentWillMount() {
	}
	detail = (keyDetail) => {
		console.log('keyDetail', keyDetail);
	}
	render() {
		let content = [];
		let dataAddress = this.props.listAddress || {};
		if (dataAddress.data) {
			const self = this;
			each(dataAddress.data, (item, index) => {
				content.push(
			      <tr key={index}>
			        <td>{item.street}</td>
			        <td>{item.ward}</td>
			        <td>{item.district}</td>
			        <td>{item.city}</td>
			        <td>{item.country}</td>
			        <td>
			        	<div onClick={this.detail.bind(self, index)}>
			        	<i className="edit outline big icon"></i>
			        	</div>
			        </td>
			      </tr>
				);
			})
		}
		return (
			<div className='home'>
				<div className="content-home">
					<h1>List Address</h1>
					<table className="ui celled padded table">
					    <thead>
					    	<tr>
						        <th>Street</th>
						        <th>Ward</th>
						        <th>District</th>
						        <th>City</th>
						        <th>Country</th>
						        <th></th>
					    	</tr>
					    </thead>
					    <tbody>
					     	{content}
					    </tbody>
					  </table>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		listAddress: state.listAddress
	};
}

const mapDispatchToProps = {
	// categoryRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
