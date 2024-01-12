const express = require('express')

const app = express()

const appName = process.env.APP_NAME ?? 'App'

app.get('/', (req, res, next) => {
  res.send(`<h1> ${appName} </h1>`)
})

app.listen('3000', () => {
  console.log(`${appName} start`)
})
