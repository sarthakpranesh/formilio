const mongoose = require('mongoose');
const chalk = require('chalk');

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@formilio-2020-mvcqj.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
)
    .then(() => {
      console.log(chalk.green('MongoDb Connected'));
    })
    .catch((err) => {
      console.log(chalk.red('MongoDb failed to connect'));
    });
