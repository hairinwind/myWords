// src/routes.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './modules/App';
import ViewWords from './modules/ViewWords';
import AddWords from './modules/AddWords';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={ViewWords}/>
		<Route path="/viewWords" component={ViewWords}/>
		<Route path="/addWords" component={AddWords}/>
	</Route>
);

export default routes;