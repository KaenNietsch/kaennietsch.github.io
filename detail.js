import products from "./beats.js";
let temporaryContent = document.getElementById('temporaryContent');
let app = document.getElementById('beats');

const loadTemplate=()=>{
    fetch('/template.html')
    .then(response=>response.text())
    .then(html =>{
        app.innerHTML = html;
        let contentTab = document.getElementById('contentTab');
        contentTab.innerHTML = temporaryContent.innerHTML;
        temporaryContent.innerHTML = null;
        initApp();
    })
}
loadTemplate();
const initApp=()=>{
    let idProduct = new URLSearchParams(window.location.search).get('id');
    let info = products.filter((value)=>value.id == idProduct)[0];
    console.log(info);
    if(!info){
        window.location.href='/';
    }
    let detail = document.querySelector('.mp3_player');
    detail.querySelector('.cover-art').src = info.image;
    document.querySelector('.name').innerText = info.name;
    detail.querySelector('.price').innerText = '$'+info.price;
    detail.querySelector('.description').innerText = info.description;
}