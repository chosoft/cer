$(document).ready(function(){
    $('.toggle').click(function(e){
        e.preventDefault();
        let btn = $(this)

        let input = $(`#${$(this).attr('toggle')}`)


        let p1 = btn.children()[0].id
        let p2 = btn.children()[1].id
        if(input.attr('type') === "password"){
            input.attr('type','text')
            $(`#${p1}`).css('display','none')
            $(`#${p2}`).css('display','block')
        }else{
            input.attr('type','password')
            $(`#${p1}`).css('display','block')
            $(`#${p2}`).css('display','none')
        } 
    })

    $('#regist').click(function(e){
        e.preventDefault()
        const data = {
            username:$('#username').val(),
            correo: $('#correo').val(),
            password: $('#pass1').val(),
            passwordConf: $('#pass2').val(),
        }

        axios({
            method: 'POST',
            data,
            url: '/api/registro',
        }).then(ok => {
            console.log(ok)
            if(ok.data === 'error'){
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Ha ocurrido un error en el servidor'
                })
            }else if(ok.data === 'nulos'){
                Swal.fire({
                    title: 'Cuidado',
                    icon: 'warning',
                    text: 'Por favor rellene todos los campos'
                })
            }else if(ok.data === 'registerYet'){
                Swal.fire({
                    title: 'Correo en uso',
                    icon: 'warning',
                    text: 'Este correo ya esta registrado use otro'
                })
            }else if(ok.data === 'ok'){
                Swal.fire({
                    title: 'Bien hecho',
                    icon: 'success',
                    text: 'Te has logueado correctamente, espera a que tu usuario sea activado'
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Ha ocurrido un error en el servidor'
                })
            }
        }).catch(e => {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Ha ocurrido un error en el servidor'
            })
        })
    })

    $('#hbr').click(function(e){
        e.preventDefault()
        const menu = $('#phone').css('display')

        if(menu === 'flex'){
            $('#phone').css('display','none')
        }else{
            $('#phone').css('display','flex')
        }
    })

    $('#log').click(function(e) {
        e.preventDefault()

        const data = {
            correo: $('#correo').val(),
            password: $('#pass1').val(),
            
        }
        axios({
            method: 'POST',
            url: 'api/login',
            data,

        }).then(ok => {
            console.log(ok)
            if(ok.data === 'success') {
                Swal.fire({
                    title: 'Logueado correctamente',
                    icon: 'success',
                    text: 'Sera redireccionado en breve'
                })
                setTimeout(function () {
                    location.href = '/dash'
                },1000)
            }else if(ok.data === 'dataNull'){
                Swal.fire({
                    title: 'Cuidado',
                    icon: 'warning',
                    text: 'Por favor verifique que todos los campos esten llenos'
                })
            }else if(ok.data ==='notUser'){
                Swal.fire({
                    title: '!Uups',
                    icon: 'warning',
                    text: 'Parece que este usuario no esta registrado o esta inactivo'
                })
            }else if(ok.data === 'badLogin'){
                Swal.fire({
                    tile: '!Ey',
                    icon: 'warning',
                    text: 'Parece que la combinacion de usuario y contraseña no coinciden, o tal vez este usuario no exista'
                })
            }else if(ok.data === 'serverError'){
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Ha ocurrido un error en el servidor. Comunicate con el administrador'
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Ha ocurrido un error en el servidor. Comunicate con el administrador'
                })
            }
        }).catch(e => {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Ha ocurrido un error en el servidor. Comunicate con el administrador'
            })
        })
    })
})