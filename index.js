const app = require('./api/server')

const { PORT } = require('./secret')

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})