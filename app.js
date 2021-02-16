//Game values
let min=1,
    max=10,
    winningNum=getRandomNum(min,max),
    guessesLeft=3;

//UI Elements
const game=document.querySelector('#game'),
      minNum=document.querySelector('.min-num'),
      maxNum=document.querySelector('.max-num'),
      guessBtn=document.querySelector('#guess-btn'),
      guessInput=document.querySelector('#guess-input'),
      message=document.querySelector('.message');

//Assign UI min and max
minNum.textContent=min;
maxNum.textContent=max;

//Play again even listener
game.addEventListener('mousedown',function(e){  
    if(e.target.className==='play-again'){
        window.location.reload();
    }
})
//Listen for guess
guessBtn.addEventListener('click',function(){
   let guess=parseInt(guessInput.value);

   //Validate
   if(isNaN(guess) || guess<min ||guess>max){
       setMessage(`Please enter a number between ${min} and ${max}`,'red');
   }

   //Check if won
   if(guess===winningNum){
      gameOver(true,`${winningNum} is correct,YOU WIN!`);
   }else{
      guessesLeft=guessesLeft-1;
      if(guessesLeft===0){
         // Game Over-Lost
         gameOver(false,`GAME OVER!YOU LOST!The corect number was ${winningNum}`);
         
      }else{
          //Game Continues -answer wrong

          //Change border color
          guessInput.style.borderColor='red';

          //Clear Input
          guessInput.value='';

          //Tell use it`s the wrong number
         setMessage(`${guess} is not correct,${guessesLeft} guesses left`,'red');

      }
   }

});

//Game Over
function gameOver(won,msg){
     let color;
     won===true ? color='green' : color='red';

     //Disable input
     guessInput.disabled=true;
     //Change text color
     message.style.color=color;
     //Change borders color
     guessInput.style.borderColor=color;
     //Set message
     setMessage(msg);

     //Play again?
     guessBtn.value='Play again';
     guessBtn.className += 'play-again';  
}

//Get Winning Number
function getRandomNum(min,max){
   return Math.floor(Math.random()*(max-min+1)+min);  //We put the +min at the end because the min it may not be 1
}



//Set Message
function setMessage(msg,color){
    message.style.color=color;
    message.textContent=msg;
}