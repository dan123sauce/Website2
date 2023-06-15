let score = JSON.parse(localStorage.getItem
  ('score')) || {
        wins: 0,
        loose: 0,
        ties: 0,
      };
    
  updateScoreElement()  

  let isAutoPlaying = false;
  let intervalID;    

  function autoplay() {
    if (!isAutoPlaying) {
      intervalID = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalID);
      isAutoPlaying = false
    }
  }    

  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('Rock')
    });

  document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('Paper')
    });  

  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('Scissors')
    });    

  document.body.addEventListener('keydown',(event) => {
    console.log(event.key);
    if (event.key === 'r') {console.log('Rock'); playGame('Rock')} 
    else if (event.key === 'p') {console.log('Paper'); playGame('Paper')}
    else if (event.key === 's') {console.log('Scissors'); playGame('Scissors')}
  
    else if (event.key === 'R') {console.log('Rock'); playGame('Rock')}
    else if (event.key === 'P') {console.log('Paper'); playGame('Paper')}
    else if (event.key === 'S') {console.log('Scissors'); playGame('Scissors')}
  } ) 

  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'Rock') {
      if (computerMove === 'Rock'){result = 'You Tie';}
      else if (computerMove === 'Paper'){result = 'You Win';}
      else if (computerMove === 'Scissors'){result = 'You Loose';}
    }
   
    if (playerMove === 'Paper') {
      if (computerMove === 'Rock'){result = 'You Win';}
      else if (computerMove === 'Paper'){result = 'You Tie';}
      else if (computerMove === 'Scissors'){result = 'You Loose';}
    }
    
    if (playerMove === 'Scissors') {
      if (computerMove === 'Rock'){result = 'You Loose';}
      else if (computerMove === 'Paper'){result = 'You Win';}
      else if (computerMove === 'Scissors'){result = 'You Tie';}
    }

    if(result === 'You Win') {score.wins += 1;}
    else if(result === 'You Loose') {score.loose += 1;}
    else if(result === 'You Tie') {score.ties += 1;}
    
    localStorage.setItem('score' , JSON.stringify(score));

    updateScoreElement(); 

    document.querySelector('.js-result') .innerHTML = `${result}`;
    document.querySelector('.js-moves') .innerHTML 
    = `you <img src="Images/${playerMove}-emoji.png" class="move-icon">
           <img src="Images/${computerMove}-emoji.png" class="move-icon">
     Computer`;
  }

  function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = ` Wins: ${score.wins}, Losses: ${score.loose}, Ties: ${score.ties}` 
  }

  function pickComputerMove(){
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber <1/3) {
          computerMove ='Rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
          computerMove ='Paper';
    } else if (randomNumber >= 2/3) {
          computerMove ='Scissors';
    }

    console.log(randomNumber)
    return computerMove;
  }