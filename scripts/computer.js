window.addEventListener('load',bindevents);
let buttons
function bindevents()
{
    buttons= window.document.getElementsByTagName('button');
//console.log('buttons are ', buttons.length);
// all 9 buttons must be clickable
    for(var i=0;i<buttons.length;i++)
    {
        buttons[i].addEventListener('click',printXor0);
    }
}
var isGameEnd = false;
function printXor0()
{
      const currentButton= this;
      if(!isGameEnd && currentButton.innerText.length==0){
            fillCount++;
            currentButton.innerText = "X";
            if(fillCount>4 && isGameOver()){
                isGameEnd = true;
                window.document.getElementById('msg').innerText = 'Game Win by You';
                return;
            }
            if(fillCount==9){
                window.document.getElementById('msg').innerText = 'Game Draw';
                isGameEnd = true;
                return;
            }
            computerplay();
            fillCount++;
            if(fillCount>4 && isGameOver()){
                  isGameEnd = true;
                  window.document.getElementById('msg').innerText = 'Game Win by Computer';
                  return;
              }
              if(fillCount==9){
                  window.document.getElementById('msg').innerText = 'Game Draw';
                  isGameEnd = true;
              }
      }

      //this.innerText="keshav";
      //this holds the current calling object reference 
      //this - keyword(current object reference/address)
     // console.log('print x or 0 call',this);
}
function computerplay(){
      const curButton =computerButton();
      curButton.innerText="0";
}
function computerButton(){
      if(canComputerWin()){
            return tempbutton;
      }
      else if(canPlayerWin()){
            return tempbutton;
      }
      else {
            //loop of buttons for randomly display 0;
            for(var i=0;i<buttons.length;i++){
                  if(!buttons[i].innerText.length>0){
                        return buttons[i];
                  }
            }
      }  
}
function canPlayerWin(){
      return isThreeSamePlayer(buttons[0], buttons[1], buttons[2]) || isThreeSamePlayer(buttons[3], buttons[4], buttons[5]) || isThreeSamePlayer(buttons[6], buttons[7], buttons[8]) || isThreeSamePlayer(buttons[0], buttons[3], buttons[6]) || isThreeSamePlayer(buttons[1], buttons[4], buttons[7]) || isThreeSamePlayer(buttons[2], buttons[5], buttons[8]) || isThreeSamePlayer(buttons[0], buttons[4], buttons[8]) || isThreeSamePlayer(buttons[2], buttons[4], buttons[6]);
}

function canComputerWin(){
      return isThreeSameComputer(buttons[0], buttons[1], buttons[2]) || isThreeSameComputer(buttons[3], buttons[4], buttons[5]) || isThreeSameComputer(buttons[6], buttons[7], buttons[8]) || isThreeSameComputer(buttons[0], buttons[3], buttons[6]) || isThreeSameComputer(buttons[1], buttons[4], buttons[7]) || isThreeSameComputer(buttons[2], buttons[5], buttons[8]) || isThreeSameComputer(buttons[0], buttons[4], buttons[8]) || isThreeSameComputer(buttons[2], buttons[4], buttons[6]);
}
//must not be blank
// 8 possibilities (same value(row,column, diagonal))
var fillCount = 0;
var tempbutton;
function isThreeSame(one, two, three){
//first check isNotBlank
//then compare all these
   if(isNotBlank(one) && isNotBlank(two) && isNotBlank(three))
   {
    return one.innerText == two.innerText && one.innerText == three.innerText;
   }
   return false;
}
function isThreeSamePlayer(one,two,three){
      if((!isNotBlank(one) && isNotBlank(two) && isNotBlank(three)) || (isNotBlank(one)&& !isNotBlank(two)&&isNotBlank(three))|| (isNotBlank(one)&&isNotBlank(two)&& !isNotBlank(three)))
      {
         var returnplayer=(one.innerText=='X' && two.innerText=='X') || (one.innerText=='X' && three.innerText=='X') || (two.innerText=='X' && three.innerText=='X');
         if(returnplayer){
            if(!isNotBlank(one)){
                  tempbutton=one;
            }
            else if(!isNotBlank(two)){
                  tempbutton=two;
            }
            else{
                  tempbutton=three;
            }
         }
          return returnplayer;
      }
      return false;
}
function isThreeSameComputer(one,two,three){
      if((!isNotBlank(one)&&isNotBlank(two)&&isNotBlank(three))||(isNotBlank(one)&& !isNotBlank(two)&&isNotBlank(three))|| (isNotBlank(one)&&isNotBlank(two)&& !isNotBlank(three)))
      {
            var returncomputer=(one.innerText=='0' && two.innerText=='0')||(one.innerText=='0' && three.innerText=='0') || (two.innerText=='0' && three.innerText=='0');
            if(returncomputer){
                  if(!isNotBlank(one)){
                        tempbutton=one;
                  }
                  else if(!isNotBlank(two)){
                        tempbutton=two;
                  }
                  else{
                        tempbutton=three;
                  }
            }
            return returncomputer;
      }
      return false;
}
function isNotBlank(currentButton){
    return currentButton.innerText.length>0;
}

function isGameOver(){
  //8 possibilities
  //call three same for row wise. column wise, diagonal wise
  //game draw
  return isThreeSame(buttons[0], buttons[1], buttons[2]) || isThreeSame(buttons[3], buttons[4], buttons[5]) || isThreeSame(buttons[6], buttons[7], buttons[8]) || isThreeSame(buttons[0], buttons[3], buttons[6]) || isThreeSame(buttons[1], buttons[4], buttons[7]) || isThreeSame(buttons[2], buttons[5], buttons[8]) || isThreeSame(buttons[0], buttons[4], buttons[8]) || isThreeSame(buttons[2], buttons[4], buttons[6]);
}

function playSound(){
    const sound = document.getElementById('sound');
    sound.play();
}