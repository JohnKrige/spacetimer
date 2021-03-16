const express = require('express');
const ejs = require('ejs');

app = express();

app.set("view engine","ejs");

app.use(express.static((__dirname, 'assets')));

app.get('/', (req,res) => {
    res.render('home')
})

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3500;
}
app.listen(port, (req,res) => {
    console.log('And we are live')
});