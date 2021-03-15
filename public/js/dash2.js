$(document).ready(function(){
    $('#sendPasswords').click(function(e){
        e.preventDefault()
        const passwordOne = $('#pass1').val()
        const passwordTwo = $('#pass2').val()

        if(passwordOne === passwordTwo){
            axios.post('/api/changeUserPassword',{passwordOne,passwordTwo})
                .then(ok => {
                    console.log(ok)
                })
                .catch(e => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error al cambiar tu contraseña',
                        icon: 'error'
                    })
                })
        }else{
            Swal.fire({
                title: 'Contraseñas incorrectas',
                icon: 'error',
                text: 'Tus contraseñas deben coincidir, asegurate de que lo hagan'
            })
        }

    })
    $('.contImgHover').click(function(e){
        e.preventDefault();
        Swal.fire({
            text: 'Elige tu nueva imagen de perfil',
            input: 'file',
            title: 'Imagen de perfil',
            inputAttributes:{
                'accept': 'image/*',
                'multiple': false
            }
        })
        .then(dataSet => {
            const formData = new FormData();
            formData.append("myFiles", dataSet.value[0]);
            axios.post('/api/changeImgProfile',formData,{
               headers: {
                   contentType: 'multipart/form-data'
               }
           })
            .then(ok => {
                console.log(ok)
                Swal.fire({
                    title: 'Imagen Cambiada',
                    icon: 'success',
                    text: 'Actuliza la imagen para ver tu nueva imagen'
                })
            })
            .catch(e => console.log(e))
        })
        .catch(e => {
            console.log(e)
        })
    })
    $('.editUserBtn').click(function(e){
        e.preventDefault();
        const keyChange = $(this).attr('keyChange')
        Swal.fire({
            title: 'Cambiar nombre de usuario',
            text: 'Escribe tu nuevo nombre de usuario',
            input: 'text',
            showCancelButton: true
        })
            .then(dataAlert => {
                const name = dataAlert.value                
                axios.post('/api/changeUserName',{username: name})
                    .then(ok => {
                        Swal.fire({
                            title: 'Bien hecho',
                            icon: 'success',
                            text: 'Tu nombre de usuario se ha cambiado satisfactoriamente actualiza la pagina para verlo',
                            showCancelButton: false
                        })
                    })
                    .catch(console.log(e))
            })
            .catch(e => {
                console.log(e)
            })
    })
    $('body').on('click', '.selectRetrieveDoc .selector .imageInsert',function(e){
        e.preventDefault()
        $('.selectRetrieveDoc').css('display','none')
        $('.selector').css('display','none')
        const ruta = $(this).attr('ruta')
        Swal.fire({
            title: 'Parrafo',
            text: 'Selecciona el parrafo donde se insertara la imagen',
            input: 'select',
            inputOptions:{
                'Parrafos':{
                    1: 'Parrafo 1',
                    2: 'Parrafo 2',
                    3: 'Parrafo 3',
                    4: 'Parrafo 4',
                    5: 'Parrafo 5',
                }
            }
        })
        .then(data => {
            let divs = $('.wp-leafis').children().length
            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            const divNum = data.value
            if(divNum > divs){
                let position = arrayData.length - 1
                let child = $(`#${arrayData[position]}`).children()[0].id
                $(`#${child}`).append(`<img src="/${element.ruta}">&nbsp`)

            }else{
                let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                $(`#${child}`).append(`<img src="/${ruta}">&nbsp`)
            }
        })
        .catch(e => console.log(e))
    })
    $('body').on('click', '.wp-division .wp-content .leaf .wp-allArticles .wp-article .wp-actions .visibleArticleBtn',function(e){
        e.preventDefault()
        const changerKey = $(this).attr('changerKey')
        Swal.fire({
            title:'Cambia la visibilidad del articulo',
            text: 'Que visibilidad quieres que tenga tu articulo',
            input: 'select',
            showCancelButton: false,
            inputOptions:{
                'Visibilidad':{
                    visible: 'Visible',
                    hide: 'Oculto'
                }
            }
        })
            .then(ok => {
                const visibilityType = (ok.value === 'visible') ? true : false
                axios({
                    url: '/api/changeVisibleArticle',
                    method: 'PUT',
                    data: {visible:visibilityType,id:changerKey}
                })
                    .then(ok => console.log(ok))
                    .catch(e => console.log(e))
            })
            .catch(e => {
                console.log(e)
            })
    })
    $('body').on('click','.wp-division .wp-content .leaf .wp-allArticles .wp-article .wp-actions .deleteArticlebtn',function(e){
        e.preventDefault()
        const deleterKey = $(this).attr('deleterKey')
        Swal.fire({
            title: 'Cuidado!',
            text: 'Si eliminas este articulo no lo podras recuperar',
            icon: 'warning',
            showCancelButton: true,
        })
            .then(ok => {
                if(ok.isConfirmed){
                    axios({
                        url: '/api/deleteArticle',
                        method: 'DELETE',
                        data: {deleterKey}
                    })
                        .then(ok => console.log(ok))
                        .catch(err => console.log(err))
                }else{

                }
            })
            .catch(e => {
                console.log(e)
            })
    })
    $('body').on('click', '.selectRetrieveDoc .selectorVideo .videoInsert ',function(e){
        e.preventDefault()
        $('.selectRetrieveDoc').css('display','none')
        $('.selectorVideo').css('display','none')
        const ruta = $(this).attr('ruta')
        const typeOfFile = ruta.substring(ruta.lastIndexOf('.')+1)
        Swal.fire({
            title: 'Parrafo',
            text: 'Selecciona el parrafo donde se insertara la imagen',
            input: 'select',
            inputOptions:{
                'Parrafos':{
                    1: 'Parrafo 1',
                    2: 'Parrafo 2',
                    3: 'Parrafo 3',
                    4: 'Parrafo 4',
                    5: 'Parrafo 5',
                }
            }
        })
        .then(data => {
            let divs = $('.wp-leafis').children().length
            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            const divNum = data.value
            if(divNum > divs){
                let position = arrayData.length - 1
                let child = $(`#${arrayData[position]}`).children()[0].id
                $(`#${child}`).append(`<video width="320" height="240" controls><source src="/${ruta}" type="video/${typeOfFile}"></video>&nbsp`)

            }else{
                let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                $(`#${child}`).append(`<video width="320" height="240" controls><source src="/${ruta}" type="video/${typeOfFile}"></video>&nbsp`)
            }
        })
        .catch(e => console.log(e))
    })
    $('body').on('click','.addBlog .wp-editer .wp-leaf .wp-leafis .wp-edt .deleteP',function(e) {
        e.preventDefault();
        const deleterKey = $(this).attr('deleterKey')
        $(`#edt${deleterKey}`).remove()
    })
    $('body').on('click','.wp-division .leaf .wp-files .card-file .wp-infoMan .wp-btnUse .clickerView',function(e){
        e.preventDefault()
        const keyChanger = $(this).attr('keyChanger')
        Swal.fire({
            title: 'Visibilidad del documento',
            text: 'Elije si este articulo sera visible o no',
            input: 'select',
            inputOptions:{
                'Visibilidad':{
                    visible:'Visible',
                    hide: 'Oculto'
                }
            }
        })
            .then(ok => {
                const visible = (ok.value === 'visible') ? true : false
                axios.put('/api/changeDocVisibility',{keyChanger,visible})
                    .then(ok => {
                        console.log(ok)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.error(err)
            })
    })
    $('body').on('click','.wp-division .leaf .wp-files .card-file .wp-actions .delete',function(e){
        e.preventDefault()
        const deleterKey = $(this).attr('deleterkey') || 'null'
        Swal.fire({
            title: '!Cuidado',
            text: 'Esta accion no sera reversible estas seguro ?',
            showCancelButton: true,
            icon: 'warning',
            confirmButtonText: 'Eliminar'

        }).then(result => {
            if(result.isConfirmed){
                console.log(deleterKey)
                if(deleterKey === 'null'){
                    Swal.fire({
                        title: 'Error del Documento',
                        text: 'Este documento posee un y no puede ser eliminado por favor comunicate con el administrador',
                        icon : 'error'
                    })
                }else{
                    axios({
                        url: '/api/deleteDoc',
                        method: 'DELETE',
                        data: {deleterKey}
                    }).then(ok => {
                        putData()
                    }).catch(e => {
                        console.log(e)
                    })
                }
            }else{  

            }
        }).catch(e => {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error desconocido comunicate con el administrador',
                icon : 'error'
            })
        })
        
    })
/*     $('body').on('click','.addBlog .wp-editer .wp-leaf .wp-leafis .wp-edt .optionsP',function(e){
        e.preventDefault()
        const parent = $(this).parent()
        Swal.fire({
            title:'Como se vera este parrafo',
            text:'Selecciona un tipo de parrafo',
            input:'select',
            showCancelButton: false,
            inputOptions:{
                'Parrafos':{
                    coverimage:'Imagen al inicio',
                    finalCover: 'Imagen al final',
                    normalCover: 'Imagen en posicion original'
                }
            }
        })
        .then(data => {
            const typeParagraph = data.value
            parent.attr('typep', typeParagraph)
        })
        .catch(e => Swal.fire({
            title: 'Error',
            text:'Ha ocurrido un error al completar la accion',
            icon: 'error'
        }))
    }) */
    $('#fileUp').change(function(e){
        let formData = new FormData()
        let filesList = e.target.files
        let admitedFiles = []
        let admitedExtension = ['zip','pdf','rtf','rar','txt','mp3','avi','wm','wmv','mpg','mpeg','wav','midi','mp4','pptx','pptm','potm','ppam','ppsx','sldm','thmx','sldx','ppsm','potx','xlsx','xlsm','xltx','xltm','xlsb','xlam','doc','docx','docm','dotx','dotm','jpg','png','gif','tiff','svg','bmp','eps','jpeg','jfif']
        for (let i = 0; i < filesList.length; i++) {
            for (let j = 0; j < admitedExtension.length; j++) {
                if(filesList[i].name.substring(filesList[i].name.lastIndexOf('.') + 1).toLowerCase() === admitedExtension[j]){
                    admitedFiles.push(filesList[i]);
                }else{

                }
            }
        }
        for (let x = 0; x < admitedFiles.length; x++) {
            formData.append('myFiles',admitedFiles[x]);                        
        }
        $('.uploaderFiles').css('width','0%')
        $('.uploaderFiles').css('opacity','0')
        $('.loaderUpFile').css('display','flex')
        $('.wp-charger').html(`<div class="wp-titleChg">
                <h1 id="innerld">100%</h1>
            </div>
            <div class="LoaderBalls">
                <div class="LoaderBalls__item"></div>
                <div class="LoaderBalls__item"></div>
                <div class="LoaderBalls__item"></div>
            </div>`)

        axios.post('/api/uploadDoc',formData,{
            onUploadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    let total = progressEvent.total
                    let cargado = progressEvent.loaded
                    let porcentaje = Math.round((cargado*100)/total)
                    $('#innerld').text(`${porcentaje}%`)
                }else{
                    $('#innerld').text(`ERROR`)
                }
            },
            headers:{
                'content-type':'multipart/form-data',
            }
        }
        ).then((ok) => {
            putData()
            $('.loaderUpFile').css('display','none')
            $('.wp-charger').html(``)
            Swal.fire({
                title: 'Bien hecho',
                text: 'Los archivos se han subido de forma satisfactoria',
                icon: 'success'
            })
        }).catch(e => {
            console.log(e)
        })
    })
    
    $('#addBlog').click(function(e){
        $('.addBlog').css('display','flex')
        $('.addBlog').css('opacity','1')
        $('.addBlog').css('width','100%')
    }) 
    $('#saveEraser').click(function(e){
        e.preventDefault()
        let divs = $('.wp-leafis').children().length
        if(divs <= 0){

        }else{
            const eraserGroup = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
            let allParagraphs = Object.values($('.wp-leafis').children())
            const title = $('.wp-title')[0].textContent
            allParagraphs.pop()
            allParagraphs.pop()
            let dataToSend = []
            allParagraphs.forEach(element => {
                dataToSend.push([element.attributes.typep.value,element.childNodes[1].innerHTML])
            })
            axios.post('/api/eraserSave',{title,group:eraserGroup,paragraphs: dataToSend})
                .then((response) => {
                    if(response.data === 'ok'){
                        Swal.fire({
                            title: 'Borrador guardado exitosamente',
                            text: 'el borrador se ha guardado lo puedes editar en la seccion de Articulos',
                            icon: 'success'
                        })
                    }else{
                        Swal.fire({
                            title:'Error',
                            text: 'Ha ocurrido un errro a la hora de guardar este borrador'
                        })
                    }
                })
                .catch((e) => {
                    console.log(e)
                }) 

        }
    })
    $('.close-add').click(function(e){
        e.preventDefault()
        if( $('.wp-leafis').children().length <= 0){
            $('.addBlog').css('width','0%')
            $('.wp-title').text('Sin titulo')
            $('.addBlog').css('opacity','0')
            $('.addBlog').css('width','0%')
        }else{
            Swal.fire({
                title: 'Seguro que no quieres añadir este articulo ?',
                text: 'Este no sera guardado en ninguna parte, a menos de lo hayas guardado como borrador',
                icon: 'warning',
                showCancelButton: true,
            }).then(result => {
                if(result.isConfirmed){
                    $('.addBlog').css('width','0%')
                    $('.addBlog').css('opacity','0')
                    $('.addBlog').css('width','0%')
                    $('.wp-title').text('Sin titulo')
                    $('.wp-leafis').empty()
                }else{
    
                }
            })
        }
    })

    $('#addDoc').click(function(e){
        e.preventDefault()
        $('.uploaderFiles').css('display','flex')
        $('.uploaderFiles').css('opacity','1')
        $('.uploaderFiles').css('width','100%')
    })
    
    $('.drop').on('dragover', function(e){
        e.preventDefault()
        $(this).css({'transform':'scale(1.03)','border':'5px dashed #000000'})
        return false
    })
    $('.drop').on('drop', function(e){
        e.preventDefault()
        $(this).css({'transform':'scale(1)','border':'5px dashed #ccc'})

        let formData = new FormData()
        let filesList = e.originalEvent.dataTransfer.files
        let admitedFiles = []
        let admitedExtension = ['zip','pdf','rtf','rar','txt','mp3','avi','wm','wmv','mpg','mpeg','wav','midi','mp4','pptx','pptm','potm','ppam','ppsx','sldm','thmx','sldx','ppsm','potx','xlsx','xlsm','xltx','xltm','xlsb','xlam','doc','docx','docm','dotx','dotm','jpg','png','gif','tiff','svg','bmp','eps','jpeg','jfif']
        for (let i = 0; i < filesList.length; i++) {
            for (let j = 0; j < admitedExtension.length; j++) {
                if(filesList[i].name.substring(filesList[i].name.lastIndexOf('.') + 1).toLowerCase() === admitedExtension[j]){
                    admitedFiles.push(filesList[i]);
                }else{

                }
            }
        }
        for (let x = 0; x < admitedFiles.length; x++) {
            formData.append('myFiles',admitedFiles[x]);                        
        }
        $('.uploaderFiles').css('width','0%')
        $('.uploaderFiles').css('opacity','0')
        $('.loaderUpFile').css('display','flex')
        $('.wp-charger').html(`<div class="wp-titleChg">
                <h1 id="innerld"></h1>
            </div>
            <div class="LoaderBalls">
                <div class="LoaderBalls__item"></div>
                <div class="LoaderBalls__item"></div>
                <div class="LoaderBalls__item"></div>
            </div>`)

        axios.post('/api/uploadDoc',formData,{
            onUploadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable) {
                    let total = progressEvent.total
                    let cargado = progressEvent.loaded
                    let porcentaje = Math.round((cargado*100)/total)
                    $('#innerld').text(`${porcentaje}%`)
                }else{
                    $('#innerld').text(`ERROR`)
                }
            },
            headers:{
                'content-type':'multipart/form-data',
            }
        }
        ).then((ok) => {
            putData()
            console.log(ok)
            $('.loaderUpFile').css('display','none')
            $('.wp-charger').html(``)
            Swal.fire({
                title: 'Bien hecho',
                text: 'Los archivos se han subido de forma satisfactoria',
                icon: 'success'
            })
        }).catch(e => {
            console.log(e)
        })
    })
    
    $('.drop').on('dragleave', function(e){
        e.preventDefault()
        $(this).css({'transform':'scale(1)','border':'5px dashed #ccc'})
        return false

    })
    $('.closer').click(function(e){
        e.preventDefault()
        $('.uploaderFiles').css('width','0%')
        $('.uploaderFiles').css('opacity','0')
    })

    $('#addP').on('click',function(e) {
        e.preventDefault()
        const idLen = `${$('.wp-leafis').children().length}-${Date.now()}`
        if($('.wp-leafis').children().length >= 5){

        }else{
            $('.wp-leafis').append(`
                <div class="wp-edt" id="edt${idLen}" typep="normalCover">
                    <div contenteditable="true"  class="wp-parah"  id="puts${idLen}">
    
                    </div>
                    <button class="deleteP" deleterKey="${idLen}" id="deleteButton${idLen}">
                        <img src="icons/close.svg" alt="x-image">                 
                    </button>
                </div>
            `)
        }

    })
    $('#linkAdd').on('click',function(e) {
        e.preventDefault()
        let divs = $('.wp-leafis').children().length
        if(divs <= 0){

        }else{

            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            Swal.mixin({
                showCancelButton: true,
                progressSteps: ['1', '2', '3']
            }).queue([
            {
                title: 'Añadir enlace',
                input: 'text',
                text: 'Texto del enlace',
                inputPlaceholder: 'Enlace',
            }, 
            {
                title: 'Direccion del enlace',
                input: 'text',
                text: 'Direccion del enlace',
                inputPlaceholder: 'https://colamer.edu.co',
            },
            {
                title: 'Parrafo donde se añadira el enlace',
                input: 'select',
                inputOptions:{
                    'Parrafos':{
                        1:'Parrafo 1',
                        2:'Parrafo 2',
                        3:'Parrafo 3',
                        4:'Parrafo 4',
                        5:'Parrafo 5'
                    }
                },
                inputPlaceholder: 'Selecciona parrafo',
            }
            ])        
            .then(data => {
                const divNum = data.value[2]
                if(divNum > divs){
                    let position = arrayData.length - 1
                    let child = $(`#${arrayData[position]}`).children()[0].id
                    $(`#${child}`).append(`<a href="${data.value[1]}">${data.value[0]}</a>&nbsp`)

                }else{
                    let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                    $(`#${child}`).append(`<a href="${data.value[1]}">${data.value[0]}</a>&nbsp`)
                }
            })
        }
    })    

    $('#boldAdd').on('click',function(e) {
        e.preventDefault()
        let divs = $('.wp-leafis').children().length
        if(divs <= 0){

        }else{

            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            Swal.mixin({
                showCancelButton: true,
                progressSteps: ['1', '2']
            }).queue([
            {
                title: 'Palabra en negrilla',
                input: 'text',
                text: 'Texto para insertar en negrilla',
                inputPlaceholder: 'Palabra para insertar',
            }, 
            {
                title: 'Parrafo donde se añadira el enlace',
                input: 'select',
                inputOptions:{
                    'Parrafos':{
                        1:'Parrafo 1',
                        2:'Parrafo 2',
                        3:'Parrafo 3',
                        4:'Parrafo 4',
                        5:'Parrafo 5'
                    }
                },
                inputPlaceholder: 'Selecciona parrafo',
            }
            ])        
            .then(data => {
                const divNum = data.value[1]
                if(divNum > divs){
                    let position = arrayData.length - 1
                    let child = $(`#${arrayData[position]}`).children()[0].id
                    $(`#${child}`).append(`<strong>${data.value[0]}</strong>&nbsp`)

                }else{
                    let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                    $(`#${child}`).append(`<strong>${data.value[0]}</strong>&nbsp`)
                }
            })
        }
    })
    $('.sender').click(function(e){
        e.preventDefault()
        if($('.wp-leafis').children().length <= 0 ){

        }else{
            let paragraphs = Object.values($('.wp-leafis').children())
            const title = $('.wp-title')[0].textContent
            paragraphs.pop()
            paragraphs.pop()
            let arrayParagraphs = []
            let innerReplaced
            paragraphs.forEach(paragraph => {
                innerReplaced = paragraph.children[0].innerHTML.replace((new RegExp("\s"),"\\s"))
                arrayParagraphs.push(innerReplaced)
            })
            axios.post('/api/saveUserArticle',{parrafos: arrayParagraphs,titulo:title})
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    })
    $('#italianAdd').on('click',function(e) {
        e.preventDefault()
        let divs = $('.wp-leafis').children().length
        if(divs <= 0){

        }else{

            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            Swal.mixin({
                showCancelButton: true,
                progressSteps: ['1', '2']
            }).queue([
            {
                title: 'Palabra en cursiva',
                input: 'text',
                text: 'Texto para insertar en cursiva',
                inputPlaceholder: 'Palabra para insertar',
            }, 
            {
                title: 'Parrafo donde se añadira la palabra cursiva',
                input: 'select',
                inputOptions:{
                    'Parrafos':{
                        1:'Parrafo 1',
                        2:'Parrafo 2',
                        3:'Parrafo 3',
                        4:'Parrafo 4',
                        5:'Parrafo 5'
                    }
                },
                inputPlaceholder: 'Selecciona parrafo',
            }
            ])        
            .then(data => {
                const divNum = data.value[1]
                if(divNum > divs){
                    let position = arrayData.length - 1
                    let child = $(`#${arrayData[position]}`).children()[0].id
                    $(`#${child}`).append(`<i>${data.value[0]}</i>&nbsp`)

                }else{
                    let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                    $(`#${child}`).append(`<i>${data.value[0]}</i>&nbsp`)
                }
            })
        }
    })
    $('#imageAdd').click(function(e) {
        e.preventDefault()
        let divs = $('.wp-leafis').children().length
        if(divs <= 0){

        }else{

            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            Swal.fire({
                title: 'Añadir la imagen',
                text: 'Como quiere añadir la imagen',
                input: 'select',
                inputOptions: {
                    'Imagen':{
                        link: 'Link',
                        add: 'Añadir',
                        yetUp: 'Imagen de Documentos'
                    }
                },
                inputPlaceholder: 'Selecciona como quieres añadir la imagen'
            }).then(option => {
                    if(option.value === 'link'){
                        Swal.mixin({
                            showCancelButton: true,
                            progressSteps: ['1', '2', '3']
                        }).queue([
                        {
                            title: 'Link de la imagen',
                            input: 'text',
                            text: 'Direccion del enlace',
                            inputPlaceholder: 'Link',
                        },
                        {
                            title: 'Parrafo donde se añadira el enlace',
                            input: 'select',
                            inputOptions:{
                                'Parrafos':{
                                    1:'Parrafo 1',
                                    2:'Parrafo 2',
                                    3:'Parrafo 3',
                                    4:'Parrafo 4',
                                    5:'Parrafo 5'
                                }
                            },
                            inputPlaceholder: 'Selecciona parrafo',
                        }
                        ]).then(dataInsert => {
                            let divNum = dataInsert.value[1]

                            if(divNum > divs){
                                let position = arrayData.length - 1
                                let child = $(`#${arrayData[position]}`).children()[0].id
                                $(`#${child}`).append(`<img src="${dataInsert.value[0]}">&nbsp`)
            
                            }else{
                                let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                                $(`#${child}`).append(`<img src="${dataInsert.value[0]}">&nbsp`)
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                    }else if(option.value === 'add'){
                        Swal.mixin({
                            showCancelButton: true,
                            progressSteps: ['1', '2', '3']
                        }).queue([
                        {
                            title: 'Añade la imagen',
                            input: 'file',
                            inputAttributes:{
                                'accept': 'image/*',
                                'multiple': false
                            }
                        },
                        {
                            title: 'Parrafo donde se añadira la imagen',
                            input: 'select',
                            inputOptions:{
                                'Parrafos':{
                                    1:'Parrafo 1',
                                    2:'Parrafo 2',
                                    3:'Parrafo 3',
                                    4:'Parrafo 4',
                                    5:'Parrafo 5'
                                }
                            },
                            inputPlaceholder: 'Selecciona parrafo',
                        }
                        ]).then(dataSet =>{
                            const formData = new FormData()
                            formData.append('myFiles',dataSet.value[0][0])
                            $('.loaderUpFile').css('display','flex')
                            $('.wp-charger').html(`<div class="wp-titleChg">
                                    <h1 id="innerld">100%</h1>
                                </div>
                                <div class="LoaderBalls">
                                    <div class="LoaderBalls__item"></div>
                                    <div class="LoaderBalls__item"></div>
                                    <div class="LoaderBalls__item"></div>
                                </div>`)

                            
                            axios.post('/api/uploadDoc',formData,{
                                onUploadProgress: (progressEvent) => {
                                    if (progressEvent.lengthComputable) {
                                        let total = progressEvent.total
                                        let cargado = progressEvent.loaded
                                        let porcentaje = Math.round((cargado*100)/total)
                                        $('#innerld').text(`${porcentaje}%`)
                                    }else{
                                        $('#innerld').text(`ERROR`)
                                    }
                                },
                                headers:{
                                    'content-type':'multipart/form-data',
                                    'svType':'blog'
                                }
                            }
                            ).then((ok) => {
                                console.log(ok)
                                $('.loaderUpFile').css('display','none')
                                $('.wp-charger').html(``)
                                Swal.fire({
                                    title: 'Bien hecho',
                                    text: 'Los archivos se han subido de forma satisfactoria',
                                    icon: 'success'
                                })
                                let divNum = dataSet.value[1]

                                if(divNum > divs){
                                    let position = arrayData.length - 1
                                    let child = $(`#${arrayData[position]}`).children()[0].id
                                    $(`#${child}`).append(`<img src="${ok.data}">&nbsp`)
                
                                }else{
                                    let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                                    $(`#${child}`).append(`<img src="/${ok.data}">&nbsp`)
                                }
                            }).catch(e => {
                                console.log(e)
                            })                            
                        }).catch(e => {
                            console.log(e)
                        })
                    }else{
                        axios.post('/api/retrieve/image',{})
                            .then(docs => {
                                if(docs.data === 'nulos'){
                                    Swal.fire({
                                        title: 'Imagenes no encontradas',
                                        text: 'No se han encontrado imagenes en los documentos guardados',
                                        icon: 'warning'
                                    })
                                }else{
                                    let insert = '<h3>Selecciona una imagen</h3>'
                                    docs.data.forEach(element => {
                                        insert += `
                                            <div class="imageInsert" id="${element._id}" ruta="${element.ruta}">
                                                <h4>${element.name}</h4>
                                                <img alt="Imagen ${element.name}" src="/${element.ruta}">
                                                <span class="date">${element.date}</span>
                                            </div>
                                        `
                                    })
                                    $('.selectRetrieveDoc').css('display','flex')
                                    $('.selector').css('display','flex')
                                    $('.selector').html(insert)
                                }
                            })
                            .catch(err => console.log(err))
                    }
            }).catch(e => {
                console.log(e)
            })
        }
    })
    $('#videoAdd').click(function(e){
        e.preventDefault()
        let divs = $('.wp-leafis').children().length

        if(divs <= 0){

        }else{
            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            Swal.fire({
                title: 'Añadir video',
                text: 'Elige como añadiras el video',
                input: 'select',
                inputOptions:{
                    youtube: 'Youtube',
                    addVideo: 'Añadir',
                    docs: 'Video de Documentos'
                }
            })
                .then(data => {
                    const value = data.value
                    if(value === 'youtube'){
                        Swal.mixin({
                            showCancelButton: true,
                            progressSteps: ['1', '2', '3']
                        }).queue([
                        {
                            title: 'Iframe del video',
                            input: 'text',
                            text: 'Video embebido de youtube',
                            inputPlaceholder: 'Texto copiado de Youtube',
                        },
                        {
                            title: 'Parrafo donde se añadira el video',
                            input: 'select',
                            inputOptions:{
                                'Parrafos':{
                                    1:'Parrafo 1',
                                    2:'Parrafo 2',
                                    3:'Parrafo 3',
                                    4:'Parrafo 4',
                                    5:'Parrafo 5'
                                }
                            },
                            inputPlaceholder: 'Selecciona parrafo',
                        }
                        ])
                            .then(data => {
                                const dataInsert = data.value
                                let divNum = dataInsert[1]

                                if(divNum > divs){
                                    let position = arrayData.length - 1
                                    let child = $(`#${arrayData[position]}`).children()[0].id
                                    $(`#${child}`).append(`${dataInsert[0]}&nbsp`)
                
                                }else{
                                    let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                                    $(`#${child}`).append(`${dataInsert[0]}&nbsp`)
                                }
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }else if (value === 'addVideo'){
                        Swal.mixin({
                            showCancelButton: true,
                            progressSteps: ['1', '2', '3']
                        }).queue([
                            {
                                title: 'Añade la imagen',
                                input: 'file',
                                inputAttributes:{
                                    'accept': 'video/*',
                                    multiple: false
                                }
                            },
                            {
                                title: 'Parrafo donde se añadira el video',
                                input: 'select',
                                inputOptions:{
                                    'Parrafos':{
                                        1:'Parrafo 1',
                                        2:'Parrafo 2',
                                        3:'Parrafo 3',
                                        4:'Parrafo 4',
                                        5:'Parrafo 5'
                                    }
                                },
                                inputPlaceholder: 'Selecciona parrafo',
                            }
                        ])
                            .then(dataSet => {
                                const formData = new FormData()
                                formData.append('myFiles',dataSet.value[0][0])
                                $('.loaderUpFile').css('display','flex')
                                $('.wp-charger').html(`<div class="wp-titleChg">
                                        <h1 id="innerld">100%</h1>
                                    </div>
                                    <div class="LoaderBalls">
                                        <div class="LoaderBalls__item"></div>
                                        <div class="LoaderBalls__item"></div>
                                        <div class="LoaderBalls__item"></div>
                                    </div>`)
    
                                
                                axios.post('/api/uploadDoc',formData,{
                                    onUploadProgress: (progressEvent) => {
                                        if (progressEvent.lengthComputable) {
                                            let total = progressEvent.total
                                            let cargado = progressEvent.loaded
                                            let porcentaje = Math.round((cargado*100)/total)
                                            $('#innerld').text(`${porcentaje}%`)
                                        }else{
                                            $('#innerld').text(`ERROR`)
                                        }
                                    },
                                    headers:{
                                        'content-type':'multipart/form-data',
                                        'svType':'blog'
                                    }
                                }
                                ).then((ok) => {
                                    const typeOfVideo = ok.data.substring(ok.data.lastIndexOf('.')+1)
                                    $('.loaderUpFile').css('display','none')
                                    $('.wp-charger').html(``)
                                    Swal.fire({
                                        title: 'Bien hecho',
                                        text: 'Los archivos se han subido de forma satisfactoria',
                                        icon: 'success'
                                    })
                                    let divNum = dataSet.value[1]
    
                                    if(divNum > divs){
                                        let position = arrayData.length - 1
                                        let child = $(`#${arrayData[position]}`).children()[0].id
                                        $(`#${child}`).append(`<video width="320" height="240" controls>
                                        <source src="/${ok.data}" type="video/${typeOfVideo}">
                                      </video> &nbsp`)
                    
                                    }else{
                                        let child = $(`#${arrayData[divNum-1]}`).children()[0].id
                                        $(`#${child}`).append(`<video width="320" height="240" controls>
                                        <source src="/${ok.data}" type="video/${typeOfVideo}">
                                      </video> &nbsp`)
                                    }
                                }).catch(e => {
                                    console.log(e)
                                })                  
                            })
                    }else{
                        axios.post('/api/retrieve/video',{})
                            .then(docs => {
                                console.log(docs)
                                if(docs.data === 'nulos'){
                                    Swal.fire({
                                        title: 'Videos no encontrados',
                                        text: 'No se han encontrado videos en los documentos guardados',
                                        icon: 'warning'
                                    })
                                }else if(Array.isArray(docs.data)){
                                    let insert = '<h3>Selecciona un video</h3>'
                                    let typeOfVideo = ''
                                    docs.data.forEach(element => {
                                        typeOfVideo = element.name.substring(element.name.lastIndexOf('.')+1)
                                        insert += `
                                            <div class="videoInsert" id="${element._id}" ruta="${element.ruta}">
                                                <h4>${element.name}</h4>
                                                <video alt="Video ${element.name}" >
                                                    <source src="/${element.ruta}" type="video/${typeOfVideo}">
                                                </video>
                                                <span class="date">${element.date}</span>
                                            </div>
                                        `
                                    })
                                    $('.selectRetrieveDoc').css('display','flex')
                                    $('.selectorVideo').css('display','flex')
                                    $('.selectorVideo').html(insert)
                                }else{
                                    window.location = '/loguearse'
                                }
                            })
                            .catch(err => console.log(err))
                    }
                })
        }
    })
    function putData(){
        let toFilter = window.location.search
        let filter = toFilter.substring(toFilter.lastIndexOf('=')+1)
        axios.post('/documentos',{filter}).then(data => {
            if(data.data.length <= 0 || data.data === undefined || data.data === null || data.data === '' || data.data === 'nulos'){
                $('.leaf').html('')
                let template = `<div class="empty-title">
                            <h1>Parece que no tienes ningun Archivo Añadido</h1>
                        </div>
                        <div class="empty-message">
                            <p>Añade uno dandole click al boton de mas abajo a la derecha</p>
                        </div>
                        <div class="empty-img"><img src="icons/empty-blog.svg" alt="imagen vacios" /></div>`
                $('.leaf').html(template)
            }else{
                $('.leaf').html('')
                let template = '<div class="wp-files"><div>'
                $('.leaf').html(template)
                let insert = ''
                data.data.forEach((element) => {
                    insert += `
                    <div class="card-file">
                                <div class="wp-infoMan">
                                    <div class="wp-fileName">
                                        <h3>${element.name}</h3>
                                    </div>
                                    <div class="wp-btnUse">
                                        <button class="dotsDisplay clickerView">
                                            <img src="/icons/dots.svg">
                                        </button>
                                        <div class="wp-edtAct" id="${element._id}">
                                            <div class="wp-editing">
                                                <nav>
                                                    <div class="wp-actSend">
                                                        <label class="lbCheck" for="vsb">Visible</label>
                                                        <input type="checkbox" name="checkVisible" id="vsb">
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>     
                                <div class="wp-imgType">
                                    <img src="/icons/uploads/${element.type}.svg">
                                </div>                           
                                <div class="wp-actions">
                                    <a class="btnActions download" download="${element.name}" href="/${element.ruta}">
                                        Descargar
                                    </a>
                                    <button deleterKey="${element._id}" class="btnActions delete">Eliminar</button>
                                </div>
                            </div>
                    `
                })
                $('.wp-files').html(insert)

            }
        }).catch(e => {
            console.log(e)
            $('.loaderUpFile').css('display','none')
            $('.wp-charger').html(``)
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un erro inesperado, comunicate con el administrador',
                icon: 'error'
            })
        })
    }
})