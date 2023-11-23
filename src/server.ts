import app from "./app"
import config from "./app/config"

// destructing config object
const {port, database_url} = config


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })