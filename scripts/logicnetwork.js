import dbOperations from "./db-operations.js";
window.addEventListener('load', bindEvents);
var isGameStart = false;
var turnValue = true;
let buttons ;
function bindEvents(){
    
     buttons = document.querySelectorAll('.btn');
    buttons.forEach(button=>button.addEventListener('click', printXorZero));
    //document.querySelector('#gen-code').removeEventListener('click',printXorZero);
    //document.querySelector('#join-code').removeEventListener('click',printXorZero);
    document.querySelector('#gen-code').addEventListener('click', generateCode);
    document.querySelector('#join-code').addEventListener('click', joinWithCode);
    //console.log('All buttons ', buttons, ' Len ', buttons.length);
}



async function printXorZero(){
    console.log('Print X or zero called...');
    let value = await dbOperations.getXorZero(localStorage.firstplayerid || localStorage.secondplayerid);
    console.log('Value is ',value);
    if(!value){
        value = true;
        this.innerText = "X";
        dbOperations.setXOrZero(localStorage.firstplayerid ||
            localStorage.secondplayerid,this.id,value)
    }
    if( localStorage.playername === value.playername){
    if(value ){
        value = value.value;
        this.innerText = value?"X":"0";
        console.log('Inside value if ', value);
        value = !value;
    }
    else{
        console.log('this would be only first time inside else ', value);
        value = true;
        this.innerText = "X";
    }

    console.log("Now Value is ",value);
    dbOperations.setXOrZero(localStorage.firstplayerid ||
         localStorage.secondplayerid,this.id,value)
    }
}

function joinWithCode(){
    console.log('Join with Code....');
    const id = prompt("Enter the join code");
     dbOperations.joinGroup(id, buttons);
    // p.then(d=>{
    //     console.log('Promise then .....');  
    //     console.log('Data::::: ', d);
    //     localStorage.secondplayerid = d.groupid;
    //     dbOperations.realTimeListeners(d.groupid);
    // }).catch(err=>console.log('Error in Update Join ', err));
}

function generateCode(){
    //console.log('Gen Code');
    // Group Name Ask
    const groupName = prompt("Enter the Group Name");
    alert("Group Name is "+groupName);
    const promise = dbOperations.addGroup(groupName);
    promise.then(doc=>{
        document.querySelector('#joinid').innerText = 'Join Id is '+doc.id;
        const p = dbOperations.addFirstPlayerInGroup(doc.id);
        p.then(d=>{
            alert("First Player Join....  And Waiting for Second to Join...");
            
            document.querySelector('#joinid').innerText = 
            "First Player Join....  And Waiting for Second to Join... Join id is " +  doc.id;
            localStorage.firstplayerid = doc.id;
            alert("Store Id in LocalStorage");
            dbOperations.realTimeListeners(doc.id, buttons);
        }).catch(err=>{
            console.log('Error Joining first Player ', err);
        })
        console.log('Doc is ', doc);
    }).catch(err=>{
        console.log('Error During Add a Group ', err);
    })

}