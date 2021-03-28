'use strict'

const buttonsToggle = document.querySelectorAll('.toggle')

buttonsToggle.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let inputToToggle = document.querySelector('#'+button.attributes[1].value)
        console.log(inputToToggle)
        let iconView = button.children[0].id
        let iconHide = button.children[1].id
        if(inputToToggle.attributes[1].value === 'password'){
            inputToToggle.setAttribute('type','text')
            document.querySelector(`#${iconView}`).style.display = 'none'
            document.querySelector(`#${iconHide}`).style.display = 'block'
        }else{
            inputToToggle.setAttribute('type','password')
            document.querySelector(`#${iconView}`).style.display = 'block'
            document.querySelector(`#${iconHide}`).style.display = 'none'
        }
    })
})


