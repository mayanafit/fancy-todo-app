require('dotenv').config()
const express = require(`express`)
const routes = require(`./routes`)
const cors = require(`cors`)
const errorHandler = require(`./middlewares/errorHandler`)
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(`/`, routes) 
app.use(errorHandler)
 
app.listen(port, () => {
    console.log(`todo App now online at port ${port}`)
})   