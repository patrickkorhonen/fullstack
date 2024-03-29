const mongoose = require('mongoose')


const password = process.argv[2]

const url =
  `mongodb+srv://patrickkorhonen3:${password}@fullstack.wjdx8w3.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const puhelinluetteloSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const User = mongoose.model('User', puhelinluetteloSchema)

const user = new User({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length == 5) {
    user.save().then(result => {
        console.log(`added ${user.name} number ${user.number} to phonebook`)
        mongoose.connection.close()
    })
  }

if (process.argv.length == 3) {
    User.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(user => {
            console.log(user.name, user.number)
        })
        mongoose.connection.close()
    })
}