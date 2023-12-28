const dotenv = require("dotenv");
const path=require('path')
const filename = __filename;
var __dirname = path.dirname(filename)
dotenv.config({ path: path.join(__dirname, '.env') })
// dotenv.config({ path: "./config.env" });

const app = require("./app");
const PORT  = process.env.PORT;

app.listen(PORT, () => {
  console.log("running on http://localhost:", PORT);
});
