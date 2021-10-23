import axios from 'axios'

const api = axios.create({
    baseURL: 'https://back-end-tarefa.herokuapp.com'
})
export default api
