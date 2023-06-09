import Cookies from 'js-cookie';

const tokenName = 'chat';

export const createToken = (token) => {
  Cookies.set(tokenName, token);
};

export const getToken = () => {
  return Cookies.get(tokenName);
};
