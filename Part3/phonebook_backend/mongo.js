const mongoose = require('mongoose')

const password = process.argv[2];

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = `mongodb+srv://joonasandbacka_db_user:${password}@cluster0.2fz7fpd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const args = process.argv.slice(2);

const inputPassword = args[0];
const name = args[1];
const number = args[2];

if (!inputPassword) {
  console.log('Password missing!');
  process.exit(1);
}

if (!name || !number) {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({ name, number });
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}