import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import {Icon} from 'semantic-ui-react'

import { PageNames } from '../../constants';
if(process.env.WEBPACK) require('./index.scss');

class Header extends Component {
	render() {
		return (
			<div className='header'>
				<header>
			        <div className="header-inner ui container">
			        	<Link to={PageNames.HOME} >
				        	<span className="title">
				        		{this.props.title}
			        		</span>
				        	<span className="spacer" />
			        	</Link>
			        </div>
			    </header>
			</div>
		);
	}
}

export default withRouter(Header);
