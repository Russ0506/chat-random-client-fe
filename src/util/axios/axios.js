import axios from 'axios';


export const request = (method, url, data) => {
	return axios({
		method,
		url: url,
		data,
	})
	.then((res) => res.data)
	.catch((err) => console.log(err));
}

export const requestHeader = (method, url, data) => {
	return axios({
		method,
		url: url,
		data,
	})
	.then((res) => res)
	.catch((err) => console.log(err));
}
