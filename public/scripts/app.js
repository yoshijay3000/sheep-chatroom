"use strict";

//DOM queries
const loginForm = document.querySelector('.login');
const signupForm = document.querySelector('.signup');
const logoutBtn = document.querySelector('.logout-btn');
const loggedOut = document.querySelectorAll('.logged-out');
const loggedIn = document.querySelectorAll('.logged-in');

//initialize class instances
const chatroom = new Chatroom('general', null);
const chatUI = new ChatUI();

//send message
sendMessage.addEventListener('submit', e => {
    e.preventDefault();
    //prevent from sending an empty value
    if (sendMessage.message.value.trim().length !== 0){
        chatroom.addChat(sendMessage.message.value.trim());
    }
    
})

//change room
rooms.addEventListener('click', e=>{
    e.preventDefault();
    if (e.target.tagName === 'BUTTON'){
        const room = e.target.getAttribute('id');
        chatroom.updateRoom(room);
        
        //clear UI interface and show chats from new room
        chatUI.clearChats();
        chatroom.getChats();

        //change chatroom color
        chatUI.changeRoomColor(room);
        
    }
});


//sign up
signupForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = signupForm.SignupEmail.value.trim();
    const username = signupForm.SignupUsername.value.trim();
    const password = signupForm.SignupPassword.value;

    //create password-based account
    auth.createUserWithEmailAndPassword(email, password).then((cred)=>{
        //close modal and reset form after submit
        signupForm.reset();
        $('#SignupModal').modal('hide');

        //store user info in "users" collection
        const user = {
            uid: cred.user.uid,
            email: cred.user.email,
            username,
        }
        db.collection('users').doc(cred.user.uid).set(user)
          .then(() => {})
          .catch((err)=>{console.log(err)});

    }).catch(err=>console.log(err));


});


//login
loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = loginForm.LoginEmail.value.trim();
    const password = loginForm.LoginPassword.value;
    
    //sign in user
    auth.signInWithEmailAndPassword(email, password).then((cred)=>{
        //close modal and reset form after submit
        loginForm.reset();
        $('#LoginModal').modal('hide');
    }).catch(err=>console.log(err));

});

//logout
logoutBtn.addEventListener('click', e=>{
    e.preventDefault();
    auth.signOut();
});

//check current state of user (logged in or logged out)
auth.onAuthStateChanged((user)=>{
    if(user){
        //show username on navbar
        const navUsername = document.querySelector('.nav-username');
        db.collection('users').doc(user.uid).get().then(doc=>{
            let username = doc.data().username;
            navUsername.innerHTML = `Hi, ${username}!`;
            chatroom.updateUsername(username);
        }).catch(err=>console.log(err));
        //get chats on UI
        chatroom.getChats();
        //show logged out interface
        loggedIn.forEach(item => {
            item.classList.remove('d-none');
        });
        loggedOut.forEach(item => {
            item.classList.add('d-none');
        });

    }
    else{
        //clear chats on UI
        chatUI.clearChats();
        //show logged out interface
        loggedOut.forEach(item=>{
            item.classList.remove('d-none');
        });
        loggedIn.forEach(item=>{
            item.classList.add('d-none');
        });

    }
});