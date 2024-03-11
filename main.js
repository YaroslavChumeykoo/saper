const container = document.querySelector('.container')


for( let i = 0; i < 81; i++){
    let render = `<span id=${i}></span>`
    container.insertAdjacentHTML('beforeend', render)
}

const block = document.querySelectorAll('span')

function getRandomInt() {
    return Math.floor(Math.random() * 80);
}
let counter_bomb = 0
while(counter_bomb < 10){
    let help = getRandomInt()
    if(block[help].classList.contains('bomba') == false){
        block[help].classList.add('bomba')
        counter_bomb++
    }
}

block.forEach((element, index) =>{
    let counter = 0
    if(element.classList.contains('bomba') == false){
        if(block[index - 10] && index != 0 && (index % 9) != 0)
            if(block[index - 10].classList.contains('bomba'))
                counter++
        if(block[index - 9])
            if(block[index - 9].classList.contains('bomba'))
                counter++
        if(block[index - 8] && index != 8 && (index % 9) != 8)
            if(block[index - 8].classList.contains('bomba'))
                counter++
        if(block[index - 1] && index != 0 && (index % 9) != 0)
            if(block[index - 1].classList.contains('bomba'))
                counter++
        if(block[index + 1] && index != 8 && (index % 9) != 8)
            if(block[index + 1].classList.contains('bomba'))
                counter++
        if(block[index + 8] && index != 0 && (index % 9) != 0)
            if(block[index + 8].classList.contains('bomba'))
                counter++
        if(block[index + 9])
            if(block[index + 9].classList.contains('bomba'))
                counter++
        if(block[index + 10] && index != 8 && (index % 9) != 8)
            if(block[index + 10].classList.contains('bomba'))
            counter++
        element.innerHTML = counter
        
    }
    element.style.backgroundColor = 'black'
})

block.forEach((item, index) =>{
    item.addEventListener('click', onBlockClick)
})

function reload(){
    location.reload()
}

function onBlockClick(event){

    proverka(event.target, Number(event.target.id))
}

const end = document.querySelector('h1')
const but = document.querySelector('button')
but.addEventListener('click', winer)

function winer(){
    let counter = 0
    block.forEach((element) =>{
        if(element.style.backgroundColor == 'black')
            counter++
        })
    if(counter == 10){
        end.innerHTML = 'Ура победа'
        setTimeout(reload, 5000)
    
    }
    else end.innerHTML = 'Открыты не все ячейки'
}
function proverka(element,index_el){
    if(element.classList.contains('bomba')){
        element.style.backgroundColor = 'red'
        end.innerHTML = 'Game over'
        block.forEach((item) =>{
            item.removeEventListener('click', onBlockClick)
        })
        setTimeout(reload, 2000)
    }
    if(element.classList.contains('bomba') == false){
        element.style.backgroundColor = 'pink'
    }
    if(element.innerHTML == 0 && element.classList.contains('bomba') == false){
        element.style.backgroundColor = 'green'
        vniz(index_el)
        vverx(index_el)
    }
    
}
function vniz(index_el){
    for(let i = 0; i <= 81; i +=9){
        if(index_el >= 72){
            pravo(index_el)
            levo(index_el)
            break
        }
        if(index_el + i >= 81){
            break
        }
        if(block[index_el + i].innerHTML != 0){
            block[index_el + i].style.backgroundColor = 'pink'
            break
        }
        block[index_el + i].style.backgroundColor = 'green'
        pravo(index_el + i)
        levo(index_el + i)
    }
}
function vverx(index_el){
    for(let i = 0; i <= 81; i +=9){
        if(index_el <= 8){
            pravo(index_el)
            levo(index_el)
            break
        }
        if(index_el - i < 0){
            break
        }
        if(block[index_el - i].innerHTML != 0){
            block[index_el - i].style.backgroundColor = 'pink'
            break
        }
        block[index_el - i].style.backgroundColor = 'green'
        pravo(index_el - i)
        levo(index_el - i)
    }
}

function pravo(index_el){
    for(let i = 1;i < 9;i++){
        if((index_el) == 8 || (index_el) % 9 == 8)
            break
        block[index_el + i].style.backgroundColor = 'green'
        if((index_el + i) == 8 || (index_el + i) % 9 == 8)
            break
        if(block[index_el + i].innerHTML != 0){
            block[index_el + i].style.backgroundColor = 'pink'
            break
        }    
    }
}
function levo(index_el){
    for(let i = 1;i < 9;i++){
        if((index_el) == 0 || (index_el) % 9 == 0)
            break
        block[index_el - i].style.backgroundColor = 'green'
        if((index_el - i) == 0 || (index_el - i) % 9 == 0)
            break
        if(block[index_el - i].innerHTML != 0){
            block[index_el - i].style.backgroundColor = 'pink'
            break
        }  
    }
}
