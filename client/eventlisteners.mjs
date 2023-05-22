import {putUser,postUser,deleteUser,getUser} from './network_calls.mjs'

const reg_form  = document.getElementById('registrationform');
const user_list = document.getElementById('users');
export async function processForm(e){
    e.preventDefault();
    const formdata = {}
    const method = reg_form.querySelector('input[name="_method"]').value;
    console.log(method)
    const inputs = reg_form.querySelectorAll('input[name]')
    for (const input of inputs){
        if (input.name=='id') continue;
        else if (input.name=='_method') continue;
        else{
            formdata[`${input.name}`]=input.value;
        }
        
    }
    console.log(formdata)
    if (method==='PUT'){
        const userId = reg_form.querySelector('input[name="id"]').value;
        console.log(userId)
        const resp = await putUser(userId,formdata)
        if (resp && resp.status<300){
            reg_form.reset();
            location.reload();
        }else{alert(resp)}
    }
    else{
        const resp = await postUser(formdata)
        if (resp && resp.status<300){
            reg_form.reset();
            location.reload();
        }else{alert(resp)}
    }
}
export async function editEvent(e){
    if (e.target.classList.contains('edit')){
        const userId = e.target.parentElement.getAttribute('data-id');
        console.log(userId)
         const response = await getUser(userId);
         if (response && !response.message){
             const inputs = reg_form.querySelectorAll('input[name]')
             for (const input of inputs){
                 if (input.name=='_method')input.value="PUT"
                 else if (input.name=='name') input.value = response.name
                 else if (input.name=='email') input.value=response.email;
                 else if (input.name=='contact')input.value=response.contact;
                 else if (input.name=='id')input.value = userId;
             }
         }else alert(response) 
    }
}
export async function deleteEvent(e){
    if (e.target.classList.contains('delete')){
        const userId = e.target.parentElement.getAttribute('data-id');
        const response = await deleteUser(userId);
        if (response.status<300) location.reload()
        else alert(response)
    }
}

