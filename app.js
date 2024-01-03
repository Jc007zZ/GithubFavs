let pessoas = []

let input = document.getElementById('search')
let form = document.querySelector('.search')
let app = document.querySelector('.pessoas')

form.addEventListener('submit', e => {
    e.preventDefault()
    request(input.value)
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
    <div class="pessoa" id="${resposta.cssId}">
                <div class="img_nome">
                    <img src="${resposta.avatar_url}">
                    <div class="pessoa_nomes">
                        <h1>${resposta.login}</h1>
                        <p>${resposta.name}</p>
                    </div>
                </div>

                <div class="numbers">
                        <p>${resposta.public_repos}</p>
                        <p>${resposta.followers}</p>
                    </div>
                    <i class="fa-solid fa-xmark"></i>
            </div>
    `
    app.innerHTML += htmlContent
}

function remove() {
    
}

function update() {    
    app.innerHTML = ""
    for(entry of pessoas){
        console.log(entry)
        criar(entry)
    }
}

