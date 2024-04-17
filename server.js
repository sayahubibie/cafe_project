const app = require("./app")

//port = process.env.port || 3000
port = 3000
app.listen(port, ()=>{
    console.log("server is listening on port 3000")

})