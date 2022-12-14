const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')


function DrawTitle(){//Draws a Title for the Line Graph
  ctx.font = "30px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Graphical Representation of Stocks", 475, 35)
}



function DrawLabels(){//Draws a Labels for the Graph 
  ctx.font = "12px Arial";
  let NumLabel = ["100","90","80","70","60","50","40","30","20","10","0"]
  for(let num = 1;num<12;num++){
    ctx.fillText(NumLabel[num-1], 20, 50*num);//Y-axis (Values of the stock)
  }
  ctx.font = "15px Arial";
  ctx.fillText("Timestamp (X)", 900, 575) //X-axis Timestamp (Label)
  ctx.font = "15px Arial";
  ctx.fillText("Value (Y)", 33, 20) //Y-axis Value (Label)
}



function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

DrawTitle()
DrawLabels()

$(document).ready(() => {//Waits for Jquery to be ready
  $(function() {
      var $stocks = $('#values');//Attaches the stock variable with the values ID to set the data to the ID
      $.ajax({//Performing an ajax of type get on the /stocks to retrieve the stock symbols head in it (e.g FB, AAPL, IBM etc)
          type: 'GET',
          url: '/stocks',
          success: function(StockSymbols) {
              $.each(StockSymbols, function(index, StockSymbols) {
                let testnum= StockSymbols.length;
                for(let num = 0; num < testnum; num++){//For each stock... (FB, APPL, IBM, etc)

                  const Arr = []
                  //Array Holds all the Stock Values so that the program that draws the graph, can fetch the previous stock value and draw a line between the two points


                  $(document).ready(() => {//Waits for Jquery to be ready
                    $(function() {
                      $.ajax({//Performing an ajax of type get on the /stocks/(Each Comapny (FB, APPL, IBM, etc)) to get Stock data ( Values and Timestamps)
                        type: 'GET',
                        url: '/stocks/'+ StockSymbols[num],
                        
                        success: function(StockValues) {//Sets the colour for each stock company to differentiate on the graph
                          let colour = 'red'
                          switch(StockSymbols[num]){
                            case 'MSFT':
                              colour = 'Blue'
                              break;
                            case 'AAPL':
                              colour = 'Green'
                              break;
                            case 'FB':
                              colour = 'Red'
                              break;
                            case 'EA':
                              colour = 'Brown'
                              break;
                            case 'IBM':
                              colour = 'Orange'
                              break;
                          }
                          
                          $stocks.append('<h2> Stock Name: ' + StockSymbols[num]+' (Colour on Chart: '+colour+ ') </h2>')//Adds a header for each stock along with add information about the colour of each stock
                          $.each(StockValues, function(index, StockValues) {//Runs through the stock data
                            let IDStock = index+1;
                            var date = new Date(StockValues.timestamp) 

                            //https://www.tutorialrepublic.com/faq/how-to-convert-a-unix-timestamp-to-time-in-javascript.php#:~:text=Answer%3A%20Use%20the%20new%20Date,%3A00%3A00%20UTC).

                            Arr.push(550 - (Math.round((StockValues.value/100)*500)))
                            if(index != 0){
                              let XValue1=((index-1)*90)+50;
                              let XValue2=(index*90)+50;
                              let YValue1=Arr[index-1];
                              let YValue2=Arr[index];
                              drawLine([XValue1, YValue1], [XValue2, YValue2],colour)
                            }
                            /*
                            The above draws lines between data points (Starting from the second data point, getting information from the previous data point and drawing a line between them)
                            */

                            $stocks.append('<p> S'+ IDStock +': Value: '+ StockValues.value + ' Time Stamp: ' + date+ '</p>')
                            //Appends the data to stocks to be presented in the HTML
                          })

                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                          alert("Failed to Fetch Data \n Status: "+xhr.status+" \n Thrown Error: "+thrownError);
                        }//Try catch utilised to display an error on the website when the program fails to load a stock and allows the code to continue running without the server crashing
                      })
                    });
                  })
                  
                  
                }
              })
              var delayInMilliseconds = 3000; //2 second

              setTimeout(function() {
                $('#spinner').removeAttr('id');
              }, delayInMilliseconds);
              //The spinner is delayed 2 seconds to show that the spinner is working before it is removed once the data is loaded

          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("Failed to Fetch Data \n Status: "+xhr.status+" \n Thrown Error: "+thrownError);
          }//Try catch utilised to display an error on the website when the program fails to load a stock and allows the code to continue running without the server crashing

      })


  })
});


//Scrapped Code (Old Code/Iterations on making the final code)
/*
Scrapped Code
$(document).ready(() => {
  $(function() {
      var $stocks = $('#values');
      $.ajax({
          type: 'GET',
          url: '/stocks/FB',
          success: function(stock) {
              $.each(stock, function(index, stock) {
                  $stocks.append('<p> value: '+ stock.value + ' time stamp: ' + stock.timestamp+ '</p>')
              })

              $('#spinner').style.display = "none";
          }
      })
  })
});
                  /*
                  for(let num = 0; num < StockSymbols.length();num++){
                    $(document).ready(() => {//Waits for Jquery to be ready
                      $(function() {
                        $.ajax({
                          type: 'GET',
                          url: '/stocks/'+ StockSymbols[num],
                          success: function(StockValues) {
                              $.each(StockValues, function(index, StockValues) {
                                  $stocks.append('<p> Stock Name:'+ StockSymbols[num] +'value: '+ StockValues.value + ' time stamp: ' + StockValues.timestamp+ '</p>')
                              })
                
                              $('#spinner').style.display = "none";
                          }
                        })
                      });
                    })
                  }
                  //$stocks.append('<p> Avalible Stocks: '+num+' '+ StockSymbols[num] + '</p>')
                  */
//drawLine([50, 475], [100, 470],'red')
//drawLine([100, 470], [150, 300],'red')
//drawLine([150, 300], [200, 105],'red')
//Draws the graph
/*
$(document).ready(() => {//Waits for Jquery to be ready
  $(function() {
      var $stocks = $('#stocksymbols');
      $.ajax({
          type: 'GET',
          url: '/stocks',
          success: function(i) {
              $.each(i, function(index, i) {
                  $stocks.append('<p> Avalible Stocks: '+ i + '</p>')
              })

              $('#spinner').style.display = "none";
          }
      })
  })
});





                              if(index<9){
                                let colour = 'red'
                                switch(StockSymbols[num]){
                                  case 'MSFT':
                                    colour = 'blue'
                                    break;
                                  case 'AAPL':
                                    colour = 'green'
                                    break;
                                  case 'FB':
                                    colour = 'yellow'
                                    break;
                                  case 'EA':
                                    colour = 'brown'
                                    break;
                                  case 'EA':
                                    colour = 'brown'
                                    break;
                                  case 'IBM':
                                    colour = 'violet'
                                    break;
                                }




                                
                  console.log(StockValuesArray)

                  if(num > 0){
                    for(let num2 = 1; num2 < 10; num2++){
                      let colour = 'red'
                      switch(StockSymbols[num]){
                        case 'MSFT':
                          colour = 'blue'
                          break;
                        case 'AAPL':
                          colour = 'green'
                          break;
                        case 'FB':
                          colour = 'yellow'
                          break;
                        case 'EA':
                          colour = 'brown'
                          break;
                        case 'EA':
                          colour = 'brown'
                          break;
                        case 'IBM':
                          colour = 'violet'
                          break;
                      }
                      let YPoint1 = StockValuesArray[num2-1]
                      let YPoint2 = StockValuesArray[num2]
                      YPoint1 = (YPoint1 / 100)*500
                      YPoint2 = (YPoint2 / 100)*500
                      drawLine([XPoint, YPoint1], [XPoint + 50, YPoint2],colour)
                      XPoint = XPoint + 50 
                    }
                  }
                //$stocks.append('<p> Avalible Stocks: '+ StockSymbols[testnum]+ '</p>')
                const StockValuesArray = [];
                                    let XPoint = 50;
                  let colour = 'red'
            
                  switch(StockSymbols[num]){
                    case 'MSFT':
                      colour = 'blue'
                      break;
                    case 'AAPL':
                      colour = 'green'
                      break;
                    case 'FB':
                      colour = 'yellow'
                      break;
                    case 'EA':
                      colour = 'brown'
                      break;
                    case 'EA':
                      colour = 'brown'
                      break;
                    case 'IBM':
                      colour = 'violet'
                      break;
                  }
                                    for(let num2=0; num2<9;num2++){
                    
                    //let YPoint1 = Math.round((StockValuesArray[num2]/100)*500)
                    //let YPoint2 = Math.round((StockValuesArray[num2+1]/100)*500)
                    var a = parseInt(StockValuesArray[num2]);
                    var b = parseInt(StockValuesArray[num2+1]);
                    drawLine([XPoint, a], [50, b],colour)
                    XPoint = XPoint+50;
                    $stocks.append('<h1> Loaded Values </h1> <p>'+StockValuesArray[1]+ '</p>')
                  }
                                                let YPoint1 = 550- Math.round((StockValues.value/100)*500)
                              StockValuesArray.push(YPoint1)
                              +' T '+StockValuesArray[index]+




                              var xValues = [1669258071646,1669261671646,1669265271646,1669268871646,1669272471646,1669276071646,1669279671646,1669283271646,1669286871646,1669290471646];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: [10.518188315016062,23.55530867031957,62.85014891821203,95.58976465079557,94.43511634465092,60.35038683747566,21.797845660388923,10.9705843800179,36.90984913124538,77.95519678863242],
      borderColor: "red",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});
*/
/*                            //let Num = StockValuesArray[index]
                            //Arr.push(StockValues.value)
                                                        //drawLine([50, 50], [XValue, YValue])
                            
                            for(let x = 0; x < Arr.length;x++){
                              $stocks.append('<li> DATA WITHIN ' +Arr[x]+ '</li>')
                            }
                            //$stocks.append('<p> Test'+Arr[0]+ '</p>')
                            
                          //drawLine([50, 50], [50, 550])
                            */


//Graphing Data
/*
90
900

x-axis
90
1   2   3   4   5   6   7   8   9   10  11 
50 140 230 320 410 500 590 680 770 860 950

Y-axis
550 to 50
500
50

1   2   3   4   5   6   7   8   9   10 (10 20 30 40 50)
50 100 150 200 250 300 350 400 450 500

0  1  2  3  4  5  6  7  8  9  10 
50 55 60 65 70 75 80 85 90 95 100
0  5  10 15 20 25 30 35 40 45 50 

0 100
95.23423

95%
50 550
500 x 0.95

/ 100
500*

*/