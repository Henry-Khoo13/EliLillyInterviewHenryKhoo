const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

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
*/
$(document).ready(() => {//Waits for Jquery to be ready
  $(function() {
      var $stocks = $('#stocksymbols');
      $.ajax({
          type: 'GET',
          url: '/stocks',
          success: function(StockSymbols) {
              $.each(StockSymbols, function(index, StockSymbols) {
                let testnum= StockSymbols.length;
                //$stocks.append('<p> Avalible Stocks: '+ StockSymbols[testnum]+ '</p>')
                for(let num = 0; num < testnum;num++){
                  $(document).ready(() => {//Waits for Jquery to be ready
                    $(function() {
                      $.ajax({
                        type: 'GET',
                        url: '/stocks/'+ StockSymbols[num],
                        success: function(StockValues) {
                            $.each(StockValues, function(index, StockValues) {
                                let IDStock = index+1;
                                $stocks.append('<p> Stock Number: '+ IDStock +' Stock Name: '+ StockSymbols[num] +' value: '+ StockValues.value + ' time stamp: ' + StockValues.timestamp+ '</p>')
                            })

                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                          alert("Failed to Fetch Data \n Status: "+xhr.status+" \n Thrown Error: "+thrownError);
                        }
                      })
                    });
                  })
                }
              })
              var delayInMilliseconds = 3000; //2 second

              setTimeout(function() {
                $('#spinner').removeAttr('id');
              }, delayInMilliseconds);

          },
          error: function (xhr, ajaxOptions, thrownError) {
            alert("Failed to Fetch Data \n Status: "+xhr.status+" \n Thrown Error: "+thrownError);
          }
      })
  })
});

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


