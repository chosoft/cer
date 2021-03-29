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

    $('#regist').click(async function(e){
        try {
            e.preventDefault()
            const dataRegister = {username:$('#username').val(),correo: $('#correo').val(),password: $('#pass1').val(),passwordConf: $('#pass2').val(),}
            const { data:response } = await axios({method: 'POST',dataRegister,url: '/api/registro',})
            if(response === 'serverError'){
                Swal.fire({title: 'Error',icon: 'error',text: 'Ha ocurrido un error en el servidor'})
            }else if(response === 'nulos'){
                Swal.fire({title: 'Cuidado',icon: 'warning',text: 'Por favor rellene todos los campos'})
            }else if(response === 'registerYet'){
                Swal.fire({title: 'Correo en uso',icon: 'warning',text: 'Este correo ya esta registrado use otro'})
            }else if(response === 'ok'){
                Swal.fire({title: 'Bien hecho',icon: 'success',text: 'Te has logueado correctamente, espera a que tu usuario sea activado'})
            }else if(response === 'badCheck'){
                Swal.fire({title: '!Uops',icon: 'error',text: 'Ha ocurrido un error a la hora de validar tus datos'})
            }else{
                Swal.fire({title: 'Error',icon: 'error',text: 'Ha ocurrido un error en el servidor'})
            }
        } catch (e) {
            Swal.fire({title: 'Error',icon: 'error',text: 'Ha ocurrido un error en el servidor'})
        }
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

    $('#log').click(async function(e) {
        try {
            e.preventDefault()
            const data = {correo: $('#correo').val(),password: $('#pass1').val(),}
            const {data: response} = await axios({method: 'POST',url: 'api/login',data,})
            console.log(response)

            if(response === 'success') {
                Swal.fire({title: 'Logueado correctamente',icon: 'success',text: 'Sera redireccionado en breve'})
                setTimeout(function () {location.href = '/dash'},1000)
            }else if(response === 'dataNull'){
                Swal.fire({title: 'Cuidado',icon: 'warning',text: 'Por favor verifique que todos los campos esten llenos'})
            }else if(response ==='notUser'){
                Swal.fire({title: '!Uups',icon: 'warning',text: 'Parece que este usuario no esta registrado o esta inactivo'})
            }else if(response === 'badLogin'){
                Swal.fire({tile: '!Ey',icon: 'warning',text: 'Parece que la combinacion de usuario y contraseña no coinciden, o tal vez este usuario no exista'})
            }else if(response === 'serverError'){
                Swal.fire({title: 'Error',icon: 'error',text: 'Ha ocurrido un error en el servidor. Comunicate con el administrador'})
            }else{
                Swal.fire({title: 'Error',icon: 'error',text: 'Ha ocurrido un error en el servidor. Comunicate con el administrador'})
            }
        } catch (e) {
            console.log(e +'asd')

            Swal.fire({title: 'Error',icon: 'error',text: 'Ha ocurrido un error en el servidor. Comunicate con el administrador'})
        }
    })
})