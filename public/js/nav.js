const menuBtn = document.querySelector('.menu-btn')
const nav = document.querySelector('.nav')
const body = document.querySelector('body')

menuBtn.addEventListener('click',()=>{
    nav.classList.toggle('visible')
    if(nav.classList.contains('visible')){
        body.style.position = 'fixed'

    }else {
        body.style.position = 'static'
    }
})