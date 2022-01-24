import { async } from 'regenerator-runtime';
import { API_URL, TIME_OUT } from './config';

export const AJAX = async function (url, recipeObject = undefined) {
  try {
    const fetchPro = recipeObject
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeObject),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    // extracting data from promise using json
    const data = await res.json();
    // guard for throwing new error

    if (!res.ok)
      throw new Error(`loading failed : ${data.message} ${res.status}`);
    return data;
  } catch (err) {
    console.log(err);
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
