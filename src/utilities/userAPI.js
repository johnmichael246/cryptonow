import tokenService from './tokenService';
const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
  })
  .then(({token}) => token);
}

function getAuthRequestOptions(method) {
  return {
    method: method,
    headers: new Headers({'Authorization':'Bearer '+ tokenService.getToken()})
  };
}


function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type':'application/json'}),
    body: JSON.stringify(creds)
  })
    .then(res => {
    if (res.ok) return res.json();
    throw new Error('invalid credentials');
  })
  .then(({token}) => token);
}

export default {
  signup,
  login
};