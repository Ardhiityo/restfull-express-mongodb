const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/restfull').then(() => console.log('Connect to MongoDB')).catch((e) => console.log(e));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('index', {
        products
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const product = new Product(req.body);
    product.save();
    res.redirect(`/`);
});


app.get('/edit/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findById(id);
    res.render('edit', {
        product
    });
})

app.put('/edit/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.redirect(`/`);
})

app.delete('/delete/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/');
})

app.get('/drop', async (req, res) => {
    const product = await Product.deleteMany({});
    res.redirect('/');
})

//Port
const port = 3000;
app.listen(port, () => console.log('listening on port http://localhost:3000'));