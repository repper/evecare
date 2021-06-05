import React from 'react';
import axios from 'axios';
import merge from 'deepmerge';

export default class BaseApi {
	constructor(props) {}

	async fetchData(rq) {
		try {
			let axiosRq = {
				method: 'get',
				responseType: 'json',
				headers: {
					'Content-Type': 'application/json',
					Commtext: 'U4Dqaq77U4qV698cqXZ4',
				},
				validateStatus: status => {
					return true;
				},
			};

			if (
				rq.url == undefined
				//"https://autuskey.com/evecare/api/v1/user/weight-sync"
			) {
				//axiosRq.responseType = "text";
				axiosRq.transformResponse = [
					function(data) {
						// Do whatever you want to transform the data
						//console.log('***********', data);
						return data;
					},
				];
			}

			let isFormData = rq.data instanceof FormData;

			if (typeof rq.data != 'undefined') {
				axiosRq.method = 'post';
				if (!isFormData) {
					rq.data = JSON.stringify(rq.data);
				}
			}

			if (isFormData) {
				return axios.post(rq.url, rq.data, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'multipart/form-data',
						Commtext: 'U4Dqaq77U4qV698cqXZ4',
						Authorization: rq.headers.authorization,
					},
					responseType: 'text',
					validateStatus: status => {
						return true;
					},
				});
			} else {
				let axiosRqObj = merge(axiosRq, rq);
				return axios(axiosRqObj);
			}
		} catch (error) {
			console.log('errorbase', error);
			return null;
		}
		return null;
	}
}
