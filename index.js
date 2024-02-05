let activeTab = 'current'
const API_KEY = 'a5837db97d72016c81a7a776f4240db9'
const API_URL = `https://gateway.marvel.com/v1/public/comics?limit=100&apikey=${API_KEY}`
let commicsOnPage = 0
checkkCommicsOnPage(commicsOnPage)
document.querySelector(`[data-id='${activeTab}']`).classList.add('button-page_active')

document.querySelector(`[data-id='next']`).addEventListener('click',()=>
{
    commicsOnPage+=20
    renderAllCommics(commicsOnPage)
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    checkkCommicsOnPage(commicsOnPage)
})
document.querySelector(`[data-id='prev']`).addEventListener('click',()=>
{
   
    if(commicsOnPage > 0)
    {
        commicsOnPage-=20
        renderAllCommics(commicsOnPage)
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    checkkCommicsOnPage(commicsOnPage) 

})

function checkkCommicsOnPage(param)
{
    if(param === 0)
    {
        document.querySelector('[data-id="prev"]').setAttribute('disabled',true)
    }
    else
    {
        document.querySelector('[data-id="prev"]').removeAttribute('disabled',true)
    }
}



async function renderAllCommics(offset)
{
    document.querySelector('.comics').innerHTML = ``
    let data = await fetch(`https://gateway.marvel.com:443/v1/public/comics?format=comic&limit=20&offset=${offset}&apikey=${API_KEY}`)
    .then((result)=>{return result.json()})
    .then((result) => {
        console.log(result.data.results); 
        render(result.data.results)
    }
    )
}
async function renderCharByID(id)
{
    let data = await fetch(`https://gateway.marvel.com:443/v1/public/comics/${id}/characters?apikey=${API_KEY}`)
    .then((result)=>{return result.json()})
    .then((result) => {
        renderCharByCommics(result.data.results); 
    }
    )
}



renderAllCommics(commicsOnPage)
function render(array)
{    
    for(let i = 0; i < array.length; i++)
    {
        let div = document.createElement('div')
        div.addEventListener('click', renderChar(array[i].id))
        div.className = 'comics-item'
        div.innerHTML = `
        <h3 class='comics-title'>${array[i].title}</h3>
        <img class='comics-img' src='${array[i].thumbnail.path + '.' + array[i].thumbnail.extension}'/>
        `
        document.querySelector('.comics').append(div)
    }
}
function renderChar(id)
{
    return()=>
    {
        renderCharByID(id)
    }
}
function renderCharByCommics(array){
    document.querySelector('.modal-char').innerHTML = ''
    document.querySelector('.modal').style.transform = 'translate(-50%,-50%) scale(1)'
    document.querySelector('.modal-close').addEventListener('click',()=>
    {
        document.querySelector('.modal').style.transform = 'translate(-50%,-50%) scale(0)'
    })
    if(array.length === 0){
        document.querySelector('.modal-char').innerHTML = `
        <p>Персонажей нету</p>`
        return
    }
    for(let i =0; i < array.length;i++){
        let div = document.createElement('div')
        div.className = 'modal-item'
        div.innerHTML = `
        <img class='modal-img' src='${array[i].thumbnail.path + '.' + array[i].thumbnail.extension}'/>
        <h4 class='modal-title'>${array[i].name}</h4>
        `
        document.querySelector('.modal-char').append(div)
    }
} 