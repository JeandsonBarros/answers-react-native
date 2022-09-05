export async function getAnswers(questionId, page) {

    const response = await fetch(`https://api-suas-questoes.herokuapp.com/answers/${questionId}?page=${page}`)
    const data = await response.json()
   
    return data
}