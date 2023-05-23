export const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:3000/'
    
})


export async function getUsers(){
    try{
        const resp = await axiosInstance.get('users');
        if (resp.status=200){
            const data = await resp.data; 
            return data;
        }else throw(Error)
    }catch(err){
        return err;
    }
}

export async function getUser(id){
    try{
        const resp = await axiosInstance.get(`users/${id}`)
        if (resp.status==200){
            const data = await resp.data;
            return data;
        }else throw(Error)
    }catch(err) {return err}
}

export async function postUser(formdata){
    try{
        const resp = await axiosInstance.post('users',{
            name:formdata.name,
            email:formdata.email,
            contact:formdata.contact
        })
        if (resp.status>=300) throw('Post not successfull!')
        else{
           return resp; 
        }
    }catch(err){
        return err;
    }
}
export async function putUser(id,body){
    try{
        const resp = await axiosInstance.put(`users/${id}`,body)
        if (resp.status<300){
            return resp;
        }else throw Error
    }catch(err){return err;}
}
export async function deleteUser(id){
    try{
        const response = await axiosInstance.delete(`users/${id}`);
        if (response.status<300){
            return response;
        }else{
            throw(Error)
        }
    }catch(err){
        alert(err)
    }
}