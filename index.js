const express = require('express')
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// })

const traineeRoute = require('./routes/trainee-routes')

app.use("/v1/api/trainees", traineeRoute)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
    
})

