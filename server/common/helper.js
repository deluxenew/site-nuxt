const jwtDecode = require("jwt-decode");

const omit = (obj, props) => {
  const inProps = (key, props) => {
    return props.some((omitKey) => {
      return omitKey === key;
    });
  };
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!inProps(key, props)) {
      newObj[key] = obj[key];
    }
  });
  return newObj
}

const isTokenValid = (token) => {
  if (!token || token === 'false') {
    return false
  }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}

module.exports = {
  omit,
  isTokenValid
}
