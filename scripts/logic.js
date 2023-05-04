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
var isXor0 = false;
var isGameEnd = false;
function printXor0()
{
      const currentButton= this;
      if(!isGameEnd && currentButton.innerText.length==0){
            fillCount++;
            currentButton.innerText = isXor0?"X":"0";
            if(fillCount>4 && isGameOver()){
                const winner = isXor0?"X":"0";
                isGameEnd = true;
                window.document.getElementById('msg').innerText = 'Game Win by '+winner;
                return;
            }
            if(fillCount==9){
                window.document.getElementById('msg').innerText = 'Game Draw';
                isGameEnd = true;
            }
            isXor0 = !isXor0;
      }

      //this.innerText="keshav";
      //this holds the current calling object reference 
      //this - keyword(current object reference/address)
     // console.log('print x or 0 call',this);
}
//must not be blank
// 8 possibilities (same value(row,column, diagonal))
var fillCount = 0;
function isThreeSame(one, two, three){
//first check isNotBlank
//then compare all these
if(isNotBlank(one) && isNotBlank(two) && isNotBlank(three))
{
    return one.innerText == two.innerText && one.innerText == three.innerText;
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