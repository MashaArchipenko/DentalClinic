const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json({extended:true}))
app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/link',require('./routes/link.routes'))
app.use('/api/review',require('./routes/review.routes'))
/*app.use('/api/card',require('./routes/card.routes'))
app.use('/api/clients',require('./routes/clients.routes'))
app.use('/api/priceList',require('./routes/priceList.routes'))*/


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
        app.listen(PORT, () => console.log(`app has been started on port ${PORT}...`))

    } catch (error) {
        console.log('Server error ', error.message)
        process.exit(1);
    }
}

start()