import { emailValidateFn, passwordValidateFn, nameValidateFn } from './validateFunctions'

export default (isDev) => ({
  formatError(err) {
    let {response: {data: {message: text}}} = err
    console.log('format error', err.message ? err.message : '', '\nERR >> ', err)

    let title = 'Упс... что то пошло не так!!!'

    if (err.response) {
      switch (err.response.status) {
        case 400:
          title = 'Ошибка ввода'
          break
        case 500:
          title = 'Ошибка сервера'
          break
      }
      text = err.response.data.message ? err.response.data.message : 'Попробуйте еще раз'
    }

    return {
      type: 'error',
      title,
      text,
    }
  },

  formFieldByName(val) {
    const fieldsList = {
      login: {
        value: '',
        name: 'login',
        type: 'text',
        componentName: 'SingleText',
        emptyErrorText: 'Необходимо ввести e-mail адрес (пример: example@gmail.com)',
        validateFunction: emailValidateFn,
        required: true,
        label: 'Адрес почты (e-mail)',
      },
      password: {
        value: '',
        name: 'password',
        type: 'text',
        componentName: 'SingleText',
        emptyErrorText: 'Необходимо указать пароль (не менее 8 символов)',
        validateFunction: passwordValidateFn,
        required: true,
        label: 'Пароль',
      }
    }
    return fieldsList[val]
  }
});
