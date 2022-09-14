import { getToken } from './TokenService'

export async function getQuantyLikes(idAnswer) {

    try {

        const response = await fetch('https://api-suas-questoes.herokuapp.com/like-answers/' + idAnswer)
        const data = await response.json()

        const quantity = { count: data.quantit_likes }

        return quantity
    } catch (error) {
        console.log(error);
    }

}

export async function getAnswersLikes() {

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

        const response = await fetch('https://api-suas-questoes.herokuapp.com/like-answers/', fetchData)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(error);
    }

}

export async function getAsAnswersLikes(answerId) {

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

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/like-answers/as-like/${answerId}`, fetchData)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(error);
    }

}

export async function postAnswersLikes(answerId) {

    try {

        let token = await getToken()
        token = await JSON.parse(token)

        let fetchData = {
            method: 'POST',
            headers: {
                'authorization': "Bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/like-answers/${answerId}`, fetchData)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(error);
    }

}

export async function deleteAnswersLikes(answerId) {

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

        const response = await fetch(`https://api-suas-questoes.herokuapp.com/like-answers/${answerId}`, fetchData)
        const data = await response.json()

        return data

    } catch (error) {
        console.log(error);
    }

}

