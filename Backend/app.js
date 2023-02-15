const express = require('express');
const mongoose = require("mongoose")
var cors = require('cors');
const User = require('./models/User');
const app = express()

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://127.0.0.1:27017/Rcs_Angola')
  .then(() => console.log('Connected!'));



app.post("/Login", async(req, res) => {

    const {username, password} = req.body

    console.log(username)

    const userExists = await User.findOne({username})

    if (userExists) {
        return res.status(400).send("User already exists")
    }

    const user = await User.create({
        username: username,
        Password:password
    })
    if(user) {
      res.send(user)
    } else {
        res.json.status(401).json("Something went wrong on register user")
    }
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})