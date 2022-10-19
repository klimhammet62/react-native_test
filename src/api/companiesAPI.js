export const companiesAPI = {
    data(text) {
        return fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${text}`)
            .then(response => response.json()).then(response => { return response })
    },
}