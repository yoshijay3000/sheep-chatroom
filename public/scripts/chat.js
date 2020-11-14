"use strict";

//set up Chatroom class
class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.unsub;
    }

    //get chats via real-time event listener
    getChats(){
      this.unsub = db.collection('chats')
        .where('room', '==', this.room)
        .orderBy('created_on')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change=>{
                if(change.type === 'added'){
                    chatUI.renderChats(change.doc.data())
                }
            });
        });
    }

    //add chat
    async addChat(message){

        const now = new Date();
        const chat = {
            room: this.room,
            username: this.username,
            created_on: firebase.firestore.Timestamp.fromDate(now),
            message,
        }

        db.collection('chats').add(chat)
          .then(sendMessage.reset())
          .catch(err=>console.log(err));
    }

    //switch rooms
    updateRoom(newRoom){
        this.room = newRoom;
        if (this.unsub){
            this.unsub()
        }
    }

    //update username
    updateUsername(newName){
        this.username = newName;
    }

}



