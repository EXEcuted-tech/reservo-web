require('dotenv').config();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
  

const PORT = process.env.PORT || 5000; 

const app = require('./routes')

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET","POST"],
    credentials: true,
}));

app.get('/', (req,res)=>{
    res.json({
        successful: true,
        data:[1,2,3],
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});



module.exports = db