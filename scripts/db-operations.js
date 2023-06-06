import { db } from "./firebase-config.js";
import { addDoc, collection,setDoc, doc, query, where, getDocs, updateDoc, getDoc,onSnapshot } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
// export const dbOperations = {

    const dbOperations = {

        realTimeListeners(id, buttons){
            console.log('Listener Call.....');
            const unsub = onSnapshot(doc(db, "turns", id), (doc) => {
                //const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                console.log( "********** Realtime data: ", doc.data());
                const turnData = doc.data();
                if(turnData){
                console.log('Buttons :::: ', buttons);
                buttons[parseInt(turnData.buttonnumber-1)].innerText = turnData.value?"X":"0";
                }
                
              });
        },

        async getXorZero(id){
            const docRef = doc(db, "turns", id);
            const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                return docSnap.data();
                } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
                return null;
                }
        },

        async setXOrZero(id, buttonnumber, turn) {
            console.log('Id ',id, ' button number ', buttonnumber, 'Turn ', turn);
            await setDoc(doc(db, "turns", id), {
                groupid:id,
                buttonnumber : buttonnumber,
                playername : localStorage.playername==='Player 1'?"Player 2":'Player 1',
                //playername: playerName,
                value : turn
              });
        },
    addGroup(groupName){
        const pr =  addDoc(collection(db, "groups"), {
           'name':groupName
          });
          return pr;
    },
    addFirstPlayerInGroup(id){
        localStorage.playername = "Player 1";
            return addDoc(collection(db,'group_player_mapping'),{
                groupid:id,
                firstPlayer:'Player 1',
                secondPlayer:'',
                status : ''
            })
    },
    async joinGroup(id, buttons) {

    const q = query(collection(db, "group_player_mapping"), where("groupid", "==", id));

const querySnapshot = await getDocs(q);
querySnapshot.forEach(async (d) => {
  // doc.data() is never undefined for query doc snapshots
  console.log('****Data is ', d.id, " => ", d.data());
    //const e = {...doc.data()};
    const e = d.data();
    console.log('All Data is ', e);
    e.secondPlayer = 'Player2';
    localStorage.playername = "Player 2";
    e.status= 'S';
    console.log('After Updation Data ', e);

    await setDoc(doc(db, "group_player_mapping", d.id), e);
    console.log('E data is ', e);
    localStorage.secondplayerid = e.groupid;

        this.realTimeListeners(e.groupid, buttons);
    console.log(':::::After Update ');
});


        //const gp = doc(db, 'group_player_mapping', id);
        //return setDoc(gp, { secondPlayer: 'Player2', status:'S' }, { merge: true });
    }
}


export default dbOperations;
