import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import subCategoryRouter from './routes/subCategoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import variationRouter from './routes/variation.route.js'
import inventoryRouter from './routes/inventoryRoutes.js'
import cardRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

// convert `import.meta.url` to __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cors({ 
    origin: "*", 
    credential: true
 }))

// ejs setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// all routes
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/', categoryRouter)
app.use('/api/v1/', subCategoryRouter)
app.use('/api/v1/', productRouter)
app.use('/api/v1/variation/', variationRouter)
app.use('/api/v1/inventories/', inventoryRouter)
app.use('/api/v1/carts/', cardRouter)
//app.use('/api/v1/order/', orderRouter)
export default app



//murad14146

//UVIwc5XQYbASnGW9



{/*
    import express from "express"
    
    const app = express();
    
    // middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
    export default app

*/}//mongodb+srv://muradchowdhury0077:3ViRoJhFXTa469F2@cluster0.5epwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


//mongodb+srv://muradchowdhury0077:3ViRoJhFXTa469F2@cluster0.5epwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0




//mongodb+srv://murad14146:UVIwc5XQYbASnGW9@cluster0.aikb4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0