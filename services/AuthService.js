
import { saveToken, deleteToken} from "./TokenService";

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