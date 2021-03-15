import axios from 'axios'

ENDPOINT = 'https://ecole-saint-augustin.herokuapp.com'

export const apiCheckEmail = async (value) => {
  const data = { email: value }
  let url = 'https://ecole-saint-augustin.herokuapp.com/users/checkemail'
  try {
    let response = await axios.post(url, data)
    if (response.status === 200) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const apiRegister = async (datas) => {
  let url = 'https://ecole-saint-augustin.herokuapp.com/users'

  try {
    let req = await axios.post(url, datas)
    return req
  } catch (err) {
    return err
  }
}
export const apiLogin = async (datas) => {
  let url = 'https://ecole-saint-augustin.herokuapp.com/users/login'

  try {
    let req = await axios.post(url, datas)
    return req
  } catch (err) {
    return err
  }
}

export const apiFecthUserDatas = async (id) => {
  let url = `http://localhost:3500/users/${id}`

  let result = await fetch(
    'http://localhost:3500/users/5ff991c7eba87d14d21fa08f'
  ).then((res) => {
    return res
  })

  return result.json()

  // axios.get(url).then((res) => res)
}

export const apiFecthTeam = async () => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/users/team`
  let result = await axios.get(URL)
  return result
}
export const apiFecthPage = async (obj) => {
  let URL = `${pprocess.env.REACT_APP_ENDPOINT || ENDPOINT}/pages/${
    obj.queryKey[1].alias
  }`
  let { data } = await axios.get(URL)

  return data
}
export const apiCreatePage = async (obj) => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/pages`
  let result = await axios.post(URL, obj.body, obj.options)
  return result
}

export const apiFecthAllPages = async () => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/pages`
  let { data } = await axios.get(URL)
  return data
}

export const apiUpdatePage = async (obj) => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/pages/${obj.id}`
  let { data } = await axios.put(URL, obj.body, obj.options)
  return data
}
export const apiUpdateClassroom = async ({ id, body, options }) => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/classrooms/${id}`
  let { data } = await axios.put(URL, body, options)
  return data
}

export const apiFecthClassroom = async (param) => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/classrooms/${param}`
  let { data } = await axios.get(URL)

  return data
}
export const apiFetchPaper = async (param) => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/papers/${param}`
  let { data } = await axios.get(URL)

  return data
}

export const apiPostPaper = async ({ id, body, options }) => {
  let URL = `${process.env.REACT_APP_ENDPOINT || ENDPOINT}/papers/${id}`
  let { data } = await axios.post(URL, body, options)
  return data
}
