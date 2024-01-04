let pessoas = []
pessoas = JSON.parse(localStorage.getItem('pessoas'))
let input = document.getElementById('search')
let form = document.querySelector('.search')
let app = document.querySelector('.dados')

update()

form.addEventListener('submit', e => {
    e.preventDefault()
    request(input.value)
    input.value = ''
} )

async function request(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    if(!response.ok){
        throw 'Erro na request'
    }
   let resposta = await response.json()
   resposta.cssId = pessoas.length
   pessoas.push(resposta)
    update()
}

function criar(resposta) {
    let htmlContent = `
    <div class="row">
            <div class="content">
                <img src="${resposta.avatar_url}">
                <div>
                    <h1>${resposta.login}</h1>
                    <p>${resposta.name}</p>
                </div>
            </div>

            <div class="content">
                <p>${resposta.public_repos}</p>
            </div>
            <div class="content">
                <div></div>
                <p>${resposta.followers}</p>
                <i class="fa-solid fa-xmark" onclick="remove(${resposta.idCss})"></i>
            </div>
    </div>`
  
    app.innerHTML += htmlContent
}

function remove(element) {
    pessoas.splice(element, 1)
    update()
}

function update() {    
    localStorage.setItem('pessoas', JSON.stringify  (pessoas))
    app.innerHTML = ""
    let idNumber = 0
    for(entry of pessoas){
        console.log(entry)
        entry.idCss = idNumber
        idNumber++
        criar(entry, idNumber)
    }
}




