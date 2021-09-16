import { emailValidateFn, nameValidateFn, passwordValidateFn } from "./validateFunctions";

export const fieldsList = {
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
  },
  name: {
    value: '',
    name: 'name',
    type: 'text',
    componentName: 'SingleText',
    emptyErrorText: 'Необходимо указать Ваше имя',
    validateFunction: nameValidateFn,
    required: false,
    label: 'Ваше Имя'
  }
}
