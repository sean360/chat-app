//installed moduels
const express = require('express');

//node modules
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
console.log(publicPath);

const app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})