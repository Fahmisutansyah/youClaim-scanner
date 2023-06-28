import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:3000'
})

export function login(email, password) {
  return new Promise((resolve, reject) => {
    api
      .post(`/users/login`, {
        email,
        password
      })
      .then(({ data }) => {
        resolve({ data })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function getCampaignId(slug) {
  return new Promise((resolve, reject) => {
    api
      .get(`/campaign/id?s=${slug}`)
      .then(({ data }) => {
        resolve({ data })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function generate(body, token) {
  return new Promise((resolve, reject) => {
    api
      .post(`/voucher?tkn=${token}`, body)
      .then(({ data }) => {
        resolve({ data })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function redeem(payload) {
  return new Promise((resolve, reject) => {
    api
      .put(
        `/voucher`,
        { uniqueCode: payload.uniqueCode },
        {
          headers: {
            token: localStorage.claimToken
          }
        }
      )
      .then(({ data }) => {
        resolve({ data })
      })
      .catch((err) => {
        reject(err)
      })
  })
}
