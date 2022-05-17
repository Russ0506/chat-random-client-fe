import {LOGIN_USER} from './types';
import { request } from '../util/axios';

export function loginUser(userInfo){
	const data = request("post", "/authenticate", userInfo);

	console.log(data);
	return {
		type : LOGIN_USER
		, payload : data
	}
}