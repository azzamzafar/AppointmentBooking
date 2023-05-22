import { getUsers } from "./network_calls.mjs";
import { processForm,editEvent,deleteEvent } from "./eventlisteners.mjs";

const reg_form  = document.getElementById('registrationform');
const user_list = document.getElementById('users');

window.onload = async ()=>{
    reg_form.reset()    
    const resp = await getUsers();
    console.log('inside onload')
    console.log(resp)
    if (!resp.message){
        populateUserList(resp)
    }else{
        alert(resp.message)
    }
}

reg_form.addEventListener('submit',processForm);
user_list.addEventListener('click',editEvent);
user_list.addEventListener('click',deleteEvent);

function populateUserList(data){
    console.log(data)
    for (let i=0;i<data.length;i++){
        let li = document.createElement('li')
        li.setAttribute('data-id',data[i].id);
        li.innerHTML = `<b>name</b>:${data[i].name}|<b>email</b>:${data[i].email}`
        li.appendChild(createEditButton())
        li.appendChild(createDeleteButton())

        user_list.appendChild(li)
    }
}

function createEditButton(){
    let editbtn = document.createElement('button');
    editbtn.className = 'btn btn-primary edit';
    editbtn.textContent='Edit'
    return editbtn;
}


function createDeleteButton(){
    let deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger delete';
    deletebtn.textContent="Delete"
    return deletebtn;
}
