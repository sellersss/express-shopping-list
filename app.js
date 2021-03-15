const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/items')
const ExpressError = require('./utils/expressError')

const app = express();

app.use(express.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}))

app.use("/items", routes)
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
  const err = new ExpressError("Page Not Found", 404)
  next(err);
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Server Error"

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app
