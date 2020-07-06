const express = require(`express`)
const routes = require(`./routes`)
const app = express()
const port = 3000


app.use(express.urlencoded({extended: true}))
app.use(`/`, routes)

app.listen(port, () => {
    console.log(`todo App now online at port ${port}`)
})