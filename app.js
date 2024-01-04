   export function Factory({app}){
    let pessoas = []

    if(!(localStorage.getItem('pessoas') == null)){
        pessoas = JSON.parse(localStorage.getItem('pessoas'))
        update()
    }

    async function request(userName) {
        const response = await fetch(`https://api.github.com/users/${userName}`)

         if(pessoas.find( entry => entry.login === userName) !== undefined){
               throw new Error('ja existe')
         }


        if(!response.ok){
            throw 'Erro na request'
        }

       let resposta = await response.json()
       resposta.cssId = pessoas.length
       pessoas.push(resposta)
       update()
    }

    
    function update() {    
        localStorage.setItem('pessoas', JSON.stringify(pessoas))
        app.innerHTML = ""
        let idNumber = 0
        for(let entry of pessoas){
            entry.idCss = idNumber
            idNumber++
            criar(entry, idNumber)
        }  
        let arr = document.querySelectorAll('i')
        arr.forEach(element => {
            element.addEventListener('click', () => remove(element.id))
        })
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
                    <i class="fa-solid fa-xmark" id="${resposta.idCss}"></i>
                </div>
        </div>`
      
        app.innerHTML += htmlContent
    }
    
    function remove(element) {
        pessoas.splice(element, 1)
        update()
    }
    
   
    return { update, remove, request }
}