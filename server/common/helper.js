const jwtDecode = require("jwt-decode");
const logger = require('./logger')

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

const resInterceptors = (res, body) => {
  const { statusCode } = res
  logger(statusCode)
  return res.status(statusCode).json(body)
}

module.exports = {
  omit,
  isTokenValid,
  resInterceptors
}
