const gameBoard =  document.querySelector('#gameboard')  
    // This will look at entire document with anything with the ID of 'gameboard'
const infoDisplay = document.querySelector('#info')     
    // This will look at entire document with anything with the ID of 'info'
const startCells = ['','','','','','','','','',
]   /* These are going to be the start cells for the game.  
    // Since there are 9 squares we are entering 9 empty cells */ 

let go = 'circle'                                   // This is used as a place holder to say circle will go first.
infoDisplay.textContent = "Circle goes First"       // Assigns text "Circle goes First" to the <p> on the HTML file.



/* THis funciton is used to create 9 <div>s with a class of square and running the 'addGo' funciton when one of the squares is selected.*/
function createBoard() {                                  // Creates the Function 'createBoard'  
    startCells.forEach((_cell, index) => {                // We are using'_cell' since were not using a variable, but we need an index          
        const cellElement = document.createElement('div') // For each element in the array we are creating a <div> (square)
        cellElement.classList.add('square')               // Were using the CSS class 'square'  
        cellElement.id = index                            // index to assign an id to each element.  
        cellElement.addEventListener('click', addGo)      // The trigger - when they click on a square; it will run the 'addGo' funciton
        gameBoard.append(cellElement)                     // This will append to the the variable /cellElement 
    })
}

createBoard()


   //This funciton is used add a circle or square (that the user will select) to an element if there is not one already there
function addGo(e) {                      // name of funciton and pass 'e' for Event. so it will coorospond to the box (<div>) we selected.
   const goDisplay = document.createElement('div')      // Create another div in the variable 'goDisplay'
   goDisplay.classList.add(go)          // classList is used to use CSS property.  So if its a cross, it will add the CSS property in goDisplay. 
   e.target.append(goDisplay)           // Using e.target.append 'goDisplay' so it will display the cross or circle in the created <div>.    
   go = go === "circle" ? "cross" : "circle"  // This will switch back and forth (circle and cross) in the variable 'go'. For the different turns.

   e.target.removeEventListener("click", addGo)  // This is used to turn off the event listener so you cannot enter twice in the same <div>.
   infoDisplay.textContent = "it is now " + go + "'s turn" // Displays who's turn it is.
   
   checkScore()
}


//      Funciton to cross reference the winningCombos array and to see if either circle or square meet that combo (essentially winning).
function checkScore() {                                         //Funciton name                                
    const allSquares = document.querySelectorAll(".square")     // We grab all the element with the class of square. Basically the whole board.
    console.log(allSquares)                                     //  IGNORE - This was a check item for me to do programming check.    
    const winningCombos = [                                     //  Array with winning combinations
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]


        /*  Not it check the 'winningCombos and for checks each array and see if it has a circle.  Example if we have a circle in board position
                0,1,2   it will enter it in the variable called circleWns, it will enter the string "Circle Wins!", Turn off the ability to enter 
                either circle or square and return (the return is essentially ending the game.)  */ 
    winningCombos.forEach(array => {                                                               
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))
        
        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }     
    })


    // Same logic as above but used for 'cross'
    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))
        
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }     
    })
}
