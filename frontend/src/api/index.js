import Cookies from "js-cookie"

const axios = require("axios")

export const HOSTNAME = "157.245.208.168:80"
export const BASE_URL = "http://" + HOSTNAME + "/checkers/api"
export const GAMES_ENDPOINT = "games"
const USER_ENDPOINT = "users"

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
