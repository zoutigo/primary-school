import axios from 'axios'

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
  let URL = `${process.env.REACT_APP_ENDPOINT}/users/team`
  let result = await axios.get(URL)
  return result
}

export const apiFecthAllPages = async () => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/pages`
  let { data } = await axios.get(URL)
  return data
}

export const apiUpdatePage = async (obj) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/pages/${obj.id}`
  let { data } = await axios.put(URL, obj.body, obj.options)
  return data
}
export const apiUpdateClassroom = async ({ id, body, options }) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/classrooms/${id}`
  let { data } = await axios.put(URL, body, options)
  return data
}

export const apiFecthClassroom = async (param) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/classrooms/${param}`
  let { data } = await axios.get(URL)

  return data
}
export const apiFetchPaper = async (param) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/papers/${param}`
  let { data } = await axios.get(URL)

  return data
}

export const apiFetchEvents = async (param) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/events?${param}`
  let { data } = await axios.get(URL)

  return data
}

export const apiPostEvents = async ({ id, action, body, options }) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/events?action=${action}&id=${id}`
  let { data } = await axios.post(URL, body, options)
  return data
}

export const apiFecthPage = async (param) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/pages?${param}`
  let { data } = await axios.get(URL)

  return data
}

export const apiPostPaper = async ({ id, body, options, action }) => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/papers?action=${action}&id=${id}`
  let { data } = await axios.post(URL, body, options)
  return data
}

export const apiPostPage = async ({ id, body, options, action }) => {
  console.log('action:', action)
  let URL = `${process.env.REACT_APP_ENDPOINT}/pages?action=${action}&id=${id}`
  let result = await axios.post(URL, body, options)
  return result
}
