
const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('give password as argument and other optional arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://anonymousgwidon:${password}@cluster0.4eeqixh.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {

  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length >= 4) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4] || ''
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}