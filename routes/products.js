const {Router} = require('express')
const Product = require('../models/Product')
const router = Router()

router.get('/', async (req, res) => {
    const products = await (await Product.find({}).lean()).reverse()

    res.render('index', {
        products,
        isChange: false
    })
})

router.post('/add', async (req, res) => {
    const data = req.body

    await Product.create({
        name: data.name,
        producer: data.producer,
        article: data.article,
        availability: Number(data.availability),
        price: Number(data.price)
    })
    
    res.redirect('/')
})

router.post('/edit', async (req, res) => {
    const product = await Product.findById(req.body.id)
    
    if (req.body.action == 'change') {
        const products = await (await Product.find({}).lean()).reverse()
        const product = await Product.findById(req.body.id)

        res.render('index', {
            products,
            isChange: true,
            product,
            id: req.body.id
        })
    } else if (req.body.action == 'remove') {
        await product.remove()

        res.redirect('/')
    }
})

router.post('/change', async (req, res) => {
    const data = req.body

    await Product.updateOne({_id: req.body.id}, {
        name: data.name,
        producer: data.producer,
        article: data.article,
        availability: Number(data.availability),
        price: Number(data.price)
    })

    res.redirect('/')
})

module.exports = router