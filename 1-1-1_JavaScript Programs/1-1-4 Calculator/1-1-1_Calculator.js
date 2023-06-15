/*  https://www.youtube.com/watch?v=8IxIyI3JomE     */

const screenDisplay = document.querySelector('.screen') 
/*same as above but as a class 'screen'*/
const buttons = document.querySelectorAll('button')  
/*anything with the (element) of button Saves in the variable 'buttons'*/

let calculation = [] 
/*Array that stores all the values from the function 'calculate'
                            Let us used since we want the ability to clear the array */
let accumulativeCalculation /*  Delcaration of Value*/
  
function calculate(button) {   /* Funciton called 'calculate' with the parameter of 'button'*/
    const value = button.textContent /*Saved in the variable 'value' the text stored in 'button'*/

    if(value === "C") {     /*  Check to see if the 'CLEAR' button if it was then it  */
        calculation = []        /*  clears the displays and */
        screenDisplay.textContent = ' '     /*prints '.' to look like it clears the screen*/ 
    } else if (value === "="){              /*  Else checks to see if the equals '=' button was pushed if so,*/
        screenDisplay.textContent = eval(accumulativeCalculation) /*takes all the values in 'accumulativeCalculation' 
                                                                    and does the calculation... Remember +,-,/,*, is stored
                                                                    in the array.     */
    }  else {  

    calculation.push(value) /*(pushes) the values and stores in the array 'calculation'*/

    accumulativeCalculation = calculation.join('') 
        /*  stores in variable ---- takes all values in the array and joins them (so you don't
            hava a comma ','        */
    screenDisplay.textContent = accumulativeCalculation 
        /*because we declared 'screenDisplay' to go to the HTML class '.screen' we have it 
        equal to the  the varable 'accumulativeCalculation' */
    }
}

buttons.forEach(button=> button.addEventListener('click', () => calculate(button)))
/*'listen' for each time the button is pushed.  Every time its pushed run the (callback)
function 'calculate' with the parameter of 'button' */






