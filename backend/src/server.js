import app from "./app.js"
import connectDb from "./db/connectDb.js"
import { serverPort } from './config/index.js'

// connect database
connectDb()

app.listen(serverPort, () => console.log("Server is running"))

//mongodb+srv://murad14146:UVIwc5XQYbASnGW9@cluster0.aikb4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
