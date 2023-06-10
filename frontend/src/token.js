import Cookies from 'js-cookie';

const tokenName = 'chat';

export const createToken = (token) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  Cookies.set(tokenName, token, { expires: expirationDate, path: '/' });
};

export const getToken = () => {
  return Cookies.get(tokenName);
};
