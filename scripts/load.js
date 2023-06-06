window.addEventListener("load", askUserName);
function askUserName() {
  let Playername = prompt("Enter Player Name ", "");
  document.getElementById(
    "name"
  ).innerText = `Name : ${Playername}`;
  const button1= document.querySelector('#computer');
  button1.addEventListener('click',computer);
  const button2= document.querySelector('#local');
  button2.addEventListener('click',local);
  const button3= document.querySelector('#friends');
  button3.addEventListener('click',friends);
  const button4= document.querySelector('#online');
  button4.addEventListener('click',online);
}
function computer(){
  location.href="framecomputer.html";

}
function local(){
  location.href="framelocal.html"

}
function friends(){
  location.href="framenetwork.html"
}
function online(){

}