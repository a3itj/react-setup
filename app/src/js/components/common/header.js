"use strict";

import React from 'react';
import {Link} from 'react-router';

var Header = React.createClass({
	render: function() {
		return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                <img src="images/logo.png" />
              </Link>
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="about">About</Link></li>
              </ul>
          </div>
        </nav>
		);
	}
});

module.exports = Header;
