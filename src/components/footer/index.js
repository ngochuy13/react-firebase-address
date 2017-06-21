import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import {Container} from 'semantic-ui-react';
import { PageNames } from '../../constants';
if(process.env.WEBPACK) require('./index.scss');

class Footer extends Component {
	state = {
	}
	render() {
		return (
			<div className='footer'>
				<Container>
					Copyright © 2017 <a href="https://github.com/ngochuy13" target="_blank">HuyPham</a>
				</Container>
			</div>
		);
	}
}

export default withRouter(Footer);
