export const getCategories = () => {
    return fetch('https://api-gateway.remind.me/provider/category')
    .then(response => response.json())
    .catch(error => console.log(error.message))
}

export const getProvider = id => {
    return fetch(`https://api-gateway.remind.me/provider/categoryProvider/category/${id}`)
    .then(response => response.json())
    .catch(error => console.log(error.message))
}