import {Factory} from "./app.js"

let input = document.getElementById('search')
let form = document.querySelector('.search')
let app = document.querySelector('.dados')
let geral

geral = Factory({app})

form.addEventListener('submit', e => {
    e.preventDefault()
    geral.request(input.value)
    input.value = ''
} )





