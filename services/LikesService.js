export async function getQuantyLikes(idAnswer) {

    const response = await fetch('https://api-suas-questoes.herokuapp.com/like-answers/' + idAnswer)
    const data = await response.json()

    const quantity = { count: data.quantit_likes }

    return quantity
}