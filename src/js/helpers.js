import { async } from 'regenerator-runtime';
import { API_URL, TIME_OUT } from './config';

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(TIME_OUT)]);
    // extracting data from promise using json
    const data = await res.json();
    // guard for throwing new error

    if (!res.ok)
      throw new Error(`loading failed : ${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
