
import { saveToken, deleteToken, getToken} from "./TokenService";

export async function login(email, password) {

    let fetchData = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }

    const response = await fetch(`https://api-suas-questoes.herokuapp.com/auth/login`, fetchData)
    const data = await response.json()

    const asSaveToken = await saveToken(data.token)
    
    return asSaveToken? data.message: "Erro ao logar"
    
}

export async function logout(){
   
    const asDeleted = await deleteToken()
    
    return asDeleted 
}

export async function deleteAccount(email, password) {
    try {

        let token = await getToken()
        token = await JSON.parse(token)
       
        let fetchData = {
            method: 'DELETE',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                 password:password 
                })

        }

        console.log(fetchData);
       
        const response = await fetch(`https://api-suas-questoes.herokuapp.com/auth/delete/${email}`, fetchData)
        const data = await response.json() 

        console.log(data);

        return data.message  
       

    } catch (error) {
        console.log(error);
    }
}