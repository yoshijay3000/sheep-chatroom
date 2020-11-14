"use strict";

//DOM queries
const rooms = document.querySelector('.chatrooms');
const chatroomButtons = document.querySelectorAll('.chatrooms button');
const chatList = document.querySelector('.chat-list');
const sendMessage = document.querySelector('.send-message');

class ChatUI{
    
    renderChats(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_on.toDate(),
            { addSuffix: true }
        );

        let html = `
        <li class="list-group-item bg-light ml-2 mr-2">
            <div>
                <span class="username">${data.username}:</span>
                <span>${data.message}</span>
            </div>
            <div class="time">${when}</div>
        </li>
        `;
        chatList.innerHTML += html;
        };

    clearChats(){
        chatList.innerHTML = '';
    }

    changeRoomColor(room){
        chatroomButtons.forEach(bt=>{
            bt.classList.remove('current');  
            if (bt.getAttribute('id') === room){
                bt.classList.add('current');
            }
        })
    }

}