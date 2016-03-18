"use strict";

import React from 'react';
import { Link } from 'react-router';

var Home = React.createClass({
	render: function() {
		return (
			<div className="jumbotron">
				<h1>Treebo Administration</h1>
				<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
			</div>
		);
	}
});

module.exports = Home;