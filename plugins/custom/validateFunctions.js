export const requireFieldCheck = (val, require) => {
  if (!val && !require) return {
    result: true,
    errMessage: ''
  }
}

export const emailValidateFn = (val, require) => {
  requireFieldCheck(val, require)
  const em = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  return {
    result: em.test(val.toLowerCase()),
    errMessage: 'Введите корректный логин'
  };
}

export const passwordValidateFn = (val, require) => {
  requireFieldCheck(val, require)
  const messageError = (val, re) => {
    const cyr = /[^0-9a-zA-Z\-_]/
    if (cyr.test(val.toLowerCase())) return "Недопустимые символы";
    return re;
  }
  const re = /^[0-9a-zA-Z\-_]{6,}$/
  return {
    result: re.test(val),
    errMessage: messageError(val, 'Пароль должен содержать не менее 6 символов')
  };
}

export const nameValidateFn = (val, require) => {
  requireFieldCheck(val, require)
  return {
    result: val.length >= 3,
    errMessage: 'Имя не короче 3 символов'
  };
}



