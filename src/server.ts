import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// destructuring the config object
const { port, database_url } = config;

async function main() {
  try {
    // connect to the database using mongoose
    await mongoose.connect(database_url as string);

    // server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
