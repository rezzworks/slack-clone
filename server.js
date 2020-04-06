const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:5802c885-ab9d-409b-aa98-5dbcfc69efd1',
  key: 
    '805c9211-8fc1-49a3-a78f-c3db86a4d47c:CUz/ePJ7GosEkEpO7kpEqG6oV2qOh1pctNMfDxhdeig='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      //console.log('Error:', error)
      if(error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        //res.sendStatus(error.statusCode).json(error)
        res.sendStatus(500)
        console.log(JSON.stringify(error))
      }
    })
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
