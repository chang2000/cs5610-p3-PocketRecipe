import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import indexRouter from './routes/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'frontend/build')))

app.use('/', indexRouter)

export default app

// Code looks good to me, and the demo works well in terms of functionality
// But I didn't see 1000 records in you database
// The code can be organized better， maybe make some part modules and put them in separate files
