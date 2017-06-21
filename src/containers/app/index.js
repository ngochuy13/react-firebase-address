/* global localStorage, location */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Container } from 'semantic-ui-react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import {addressRequest} from '../../actions'

if(process.env.WEBPACK) require('./index.scss');

class App extends Component {
	state = {
	};
	componentWillMount() {
		this.props.addressRequest();
	}
	componentDidMount () {
	}
	render() {
		let loading = '';
		if (this.props.loading === true) {
			loading = (
				<div className="loading">
					<img src="/assets/images/loading-1.gif" alt="Loading..."/>
				</div>
			)
		}

		return (
			<div className='app'>
				<Header title='8bitrockr.com' />
				<main>
					<div className="page-layout">
						<div className="main-content">
							<Container>
								{this.props.children}
							</Container>
						</div>
					</div>
				  <Footer />
				</main>
				{loading}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		address: state.address,
		loading: state.loading
	};
}

const mapDispatchToProps = {
	addressRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
