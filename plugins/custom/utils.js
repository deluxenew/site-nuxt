export default (isDev) => ({
    formatError (err) {
        let {response: {data: {message: text }}} = err
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
});
