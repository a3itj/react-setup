"use strict";

import React from 'react';
import { Router, Route, IndexRoute, Redirect} from 'react-router';
import App from './components/app';
import About from './components/about/aboutPage';
import NotFound from './components/notFoundPage';
import Home from './components/homePage';


var routes = (
	<Router>
		<Route name="app" component={App}>
			<Redirect from="about-us" to="aboutqwq" />
		    <Redirect from="about/*" to="about" />
		  	<IndexRoute component={Home} />
		    <Route name="about" path="about" component={About} />
		    <Route path="/" component={Home} />
		    <Route path="*" component={NotFound} />

		</Route>
  	</Router>
);

module.exports = routes;