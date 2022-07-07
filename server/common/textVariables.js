module.exports = {
  response: {
    information: {
      common: "Информационное сообщение",
      code_100: "Этот промежуточный ответ указывает, что клиент должен продолжить запрос или проигнорировать ответ, если запрос уже завершен.",
      code_101: "Этот код отправляется в ответ на Upgrade заголовок запроса от клиента и указывает протокол, на который переключается сервер.",
      code_102: "Этот код указывает на то, что сервер получил и обрабатывает запрос, но ответа пока нет.",
      code_103: "Этот код состояния в первую очередь предназначен для использования с Linkзаголовком, позволяя пользовательскому агенту начать предварительную загрузку ресурсов, пока сервер готовит ответ.",
    },
    success: {
      common: "Успешно",
      code_200: "Данные получены.",
      code_201: "Создание/добавление выполнено успешно.",
      code_202: "Запрос получен, но еще не исполнен.",
      code_203: "Неверные авторизационные данные.",
      code_204: "Нет контента для отправки.",
    },
    redirect: {
      common: "Редирект",
      code_300: "Необходимо выбрать вариант перехода.",
      code_301: "URL запрошенного ресурса был изменен навсегда.",
      code_302: "URL временно изменен.",
      code_303: "Ответ из другого источника.",
    },
    clientError: {
      common: "Ошибка на стороне клинта",
      code_400: "Заполните все обязадельные поля.",
      code_401: "Не авторизован.",
      code_403: "У Вас нет прав.",
      code_404: "Не найдено",
      code_409: "Такая категория уже существует",
    },
    serverError: {
      common: "Ошибка на стороне сервера",
      code_500: "Сервер столкнулся с ситуацией, которую он не знает, как с ней справиться.",
      code_501: "Метод запроса не поддерживается сервером и не может быть обработан.",
      code_502: "Неверное направление.",
      code_503: "Сервис недоступен.",
      code_504: "Ответ не может быть получен вовремя.",
    }
  }
}
