import Cookies from "js-cookie"

const axios = require("axios")

export const HOSTNAME = "localhost:80"
export const BASE_URL = "http://" + HOSTNAME + "/checkers/api"
export const GAMES_ENDPOINT = "games"
export const USER_ENDPOINT = "users"
export const LOGIN_ENDPOINT = "rest-auth/login"
export const LOGOUT_ENDPOINT = "rest-auth/logout"

export const MOVE_ACTION = "move"
export const JUMP_ACTION = "jump"


export function requestBoard(id) {
    var url = [BASE_URL, GAMES_ENDPOINT, id].join("/")
    url = url.endsWith('/') ? url : url + "/"
    return axios
        .get(url, {
            withCredentials: true
        })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

export function makeMove(game_id, endpoint, path) {
    var url = [BASE_URL, GAMES_ENDPOINT, game_id, endpoint].join("/")
    url = url.endsWith('/') ? url : url + "/"
    var csrftoken = Cookies.get('csrftoken')
    return axios({
        method: "post",
        url: url,
        headers: {'X-CSRFToken': csrftoken},
        data: {
            from_sq: path['from_sq'],
            to_sq: path['to_sq']
        },
        withCredentials: true,
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

export function userList() {
    var url = [BASE_URL, USER_ENDPOINT].join("/")
    url = url.endsWith('/') ? url : url + "/"
    return axios({
        method: "get",
        url: url,
        withCredentials: true,
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
}

export function getActiveUser() {
    console.log("api.getActiveUser")
    var url = [BASE_URL, USER_ENDPOINT, "me"].join("/")
    url = url.endsWith('/') ? url : url + "/"
    return axios({
        method: "get",
        url: url,
        withCredentials: true,
    })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function login(payload) {
    console.log("api.login")
    console.log(payload)
    var url = [BASE_URL, LOGIN_ENDPOINT].join("/")
    url = url.endsWith('/') ? url : url + "/"
    var csrftoken = Cookies.get('csrftoken')
    console.log(url)
    return axios({
        method: "post",
        url: url,
        headers: {'X-CSRFToken': csrftoken},
        data: {
            username: payload['username'],
            password: payload['password']
        },
        withCredentials: true,
    })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function logout(payload) {
    var url = [BASE_URL, LOGOUT_ENDPOINT].join("/")
    url = url.endsWith('/') ? url : url + "/"
    var csrftoken = Cookies.get('csrftoken')
    console.log(url)
    return axios({
        method: "post",
        url: url,
        headers: {'X-CSRFToken': csrftoken},
        withCredentials: true,
    })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
