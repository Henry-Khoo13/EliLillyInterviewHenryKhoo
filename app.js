const express = require('express')
const path = require('path')
const { nextTick } = require('process')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))
//Routes to the static Folder

app.get('/stocks', async (req, res,next) => {//Retrieves the data from /Stocks 
  try{
    const stockSymbols = await stocks.getStocks()
    console.log(stockSymbols)//Displays the information (Stocks avalible) collected to the console
    res.send({ stockSymbols })
  }
  catch(err){
    next(err)
  }//Try catch used to identify errors and allow the program to continue running if the Stock isn't avalible 

})

app.get('/stocks/:symbol', async (req, res, next) => {//Retrieves the data from specified Stock (e.g FB, IBM, APPL, etc)
  try {
    const { params: { symbol } } = req
    const data = await stocks.getStockPoints(symbol, new Date())
    console.log(symbol)//Displays the information (Stocks avalible) collected to the console
    console.log(data)//Along with displaying the data (values and timestamps)
    res.send(data)
  }
  catch(err)
  {
    next(err)
  }//Try catch used to identify errors and allow the program to continue running if the Stock isn't avalible 

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

scrapped code
  //throw new Error('Error Retreiving Stock Information') 
    //throw new Error('Error Retreiving Avalible Stocks') 

  setTimeout(() => {
    try{
      console.log("Stock Handling Issue")
      throw new Error("Error!")
    }
    catch(error){
      next(error)
    }
    } , 1000)

  .then(data=>res.send(data))
  .catch(err=>{
    console.error(err)
    res.redirect('/error')
  })
  app.get('/error', (req, res) => {
  res.send("Custom error landing page.")
})

    */
