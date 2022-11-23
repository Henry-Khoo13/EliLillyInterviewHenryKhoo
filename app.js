const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))
//Routes to the static Folder

app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  console.log(stockSymbols)
    
  res.send({ stockSymbols })
})

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req
  const data = await stocks.getStockPoints(symbol, new Date())
  console.log(symbol)
  console.log(data)
  res.send(data)
})



app.listen(3000, () => console.log('Server is running!'))
//port 3000, message server that it is listening
/* Notes
Can Place into the search bar:
http://localhost:3000
http://localhost:3000/stocks
http://localhost:3000/stocks/FB
http://127.0.0.1:3000/stocks To get all the stocks 
http://127.0.0.1:3000/stocks/FB To get all the stocks of facebook with timestamps
*/
