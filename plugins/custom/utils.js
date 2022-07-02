import {fieldsList} from './formFields'

export default (isDev) => ({
  formatError(err) {
    // const {response} = err
    // const {data } = response
    // const {message: text} = data
    console.log('format error', err.message ? err.message : '', '\nERR >> ', err)

    let title = 'Упс... что то пошло не так!!!'
    let message = err?.response?.data?.message ? err.response.data.message : 'Попробуйте еще раз'
    if (err.response) {
      switch (err.response.status) {
        case 400:
          title = 'Ошибка ввода'

          break
        case 500:
          title = 'Ошибка сервера'
          break
      }
    }

    return {
      type: 'error',
      title,
      text: message,
    }
  },

  formFieldByName(val) {
    if (!fieldsList[val]) return {}
    return fieldsList[val]
  },
  getFormValues(form) {
    return form.steps.reduce((obj, {rows}) => {
      rows
        .flat()
        .forEach(({id, value}) => {
          obj[id] = value
        })
      return obj
    }, {})
  },
  getRequiredFields(form) {
    return form.steps.reduce((arr, {rows}) => {
      rows
        .flat()
        .forEach(({id, required}) => {
         if (required) arr.push(id)
        })
      return arr
    }, [])
  },
  isInvalidForm(form) {
    return !!form.steps
      .find(({ rows }) => rows
        .flat()
        .find(({ validateFunction, value, required }) => {
          return !validateFunction(value, required).result
        }))
  },
  groupBy: (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

});
