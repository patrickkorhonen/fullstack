import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
  const replace = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, {id: id, name: newObject.name, number: newObject.number})
  }

  const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }
  
  export default { getAll, create, replace, deletePerson }