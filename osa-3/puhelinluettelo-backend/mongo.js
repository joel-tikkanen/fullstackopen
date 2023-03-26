const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})


Person.find({}).then(result => {
    console.log("phonebook: ")
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
})