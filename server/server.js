const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());


app.get('/api/:date?', (req, res) => {
    const {data} = req.params;
    let dateObj;
    if(!data){
        dateObj = new Date();
    }else if(isNaN(data)){
        dateObj = new Date(parseInt(data));
    }else{
        dateObj = new Date(data);
    }
    if(dateObj.toString === "Invalid Date"){
        res.json({error: "Invalid Date"});
    }
    res.json({
        unix: dateObj.getTime(),
        utc: dateObj.toUTCString()
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})