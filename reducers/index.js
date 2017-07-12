import {createStore, applyMiddleware, combineReducers} from "redux";
import app from './app/reducer';
import counter from './counter/reducer';
import userInfo from './userInfo';
import login from './login';

module.exports = combineReducers({
	app,
	counter,
	userInfo,
	login
});