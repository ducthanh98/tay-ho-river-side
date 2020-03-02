import Api from '../constants/Api';
import {STRINGS} from '../resource';

function fetchWithTimeOut(promise, ms = 30000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(STRINGS.Cant_connect_internet));
    }, ms);
    promise.then(resolve, reject);
  });
}
/**
 *
 * @param {*} api
 * @param {*} header {method,}
 */
const CommonCall = async (api, header) => {
  console.log('api', api);
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    const head = {...header, headers};
    let response = await fetchWithTimeOut(fetch(api, head));
    console.log('response', response);
    //maintance
    if (response.status === 502) {
      return {isSuccess: false, message: STRINGS.error_500};
    }

    const result = await response.json();
    console.log('result', result);

    return result;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

const FetchApi = {
  example: ({param1, params2}) => {
    const header = {method: 'GET'};
    const api = Api.example({param1, params2});
    return CommonCall(api, header);
  },
};

export {FetchApi};
