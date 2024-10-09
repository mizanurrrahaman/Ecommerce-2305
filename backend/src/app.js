import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'

// convert `import.meta.url` to __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cors({ origin: '*' }))

// ejs setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// all routes
app.use('/api/v1/users/', userRouter)

export default app







{/*
    import express from "express"
    
    const app = express();
    
    // middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
    export default app

*/}