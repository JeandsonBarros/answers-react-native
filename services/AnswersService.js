import { getToken } from "./TokenService"

export async function getAnswers(questionId, page) {

    const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/${questionId}?page=${page}`)
    const data = await response.json()

    return data
}

export async function getAnswersByUser(page) {

    try {

        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'GET',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/list/by/user?page=${page}`, fetchData)
        const data = await response.json()

        return data


    } catch (error) {
        console.log(error);
    }

}

export async function findAnswersByUser(page, search) {

    try {

        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'GET',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/list/by/user?search=${search}&page=${page}`, fetchData)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(error);
    }

}

export async function getOneAnswerByUser(questionId) {
    try {
    
        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'GET',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/${questionId}/answer/user`, fetchData)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(error);
    }
}

export async function postAnswer(questionId, answer){

    try {
        
        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'POST',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({answer})
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/${questionId}`, fetchData)
        const data = await response.json()

        return data.message

    } catch (error) {
        console.log(error);
    }

}

export async function putAnswer(questionId, answerId, answer){

    try {
        
        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'PUT',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({answer})
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/${questionId}/${answerId}`, fetchData)
        const data = await response.json()

        return data.message

    } catch (error) {
        console.log(error);
    }

}

export async function deleteAnswer(questionId, answerId){

    try {
        
        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'DELETE',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
           
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/${questionId}/${answerId}`, fetchData)
        const data = await response.json()

        return data.message

    } catch (error) {
        console.log(error);
    }

}
