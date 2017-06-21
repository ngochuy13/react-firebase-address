import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

if(process.env.WEBPACK) require('./index.scss');

class NotFound extends Component {
	componentWillMount() {
	}
	render() {

		return (
			<div className="container page-404">
				<div className="page-404-number">404</div>
				<div className="page-404-text">Page not found</div>
				<div className="page-404-text-sub">Please try one of the following page:</div>
				<div className="page-404-button">
					<div className="button-">
						<Link to={"/"}>Home Page</Link>
					</div>

				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
	};
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotFound));
