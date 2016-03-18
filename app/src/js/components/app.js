import React from 'react';
import { Router } from 'react-router';
import Header from './common/header';
import Home from './homePage';

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<div className="container-fluid">
					{this.props.children || <Home/>}
				</div>
			</div>
		);
	}
})

module.exports = App;