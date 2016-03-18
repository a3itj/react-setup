"use strict";

import React from 'react';

var About = React.createClass({
	render: function () {
		return (
			<div>
				<h1>About</h1>
				<p>
					This application uses the following technologies:
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Gulp</li>
						<li>Webpack</li>
					</ul>
				</p>
			</div>
		);
	}
});

module.exports = About;