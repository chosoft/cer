$(document).ready(function(){
    //ADD ARTICLE EVENTS ANDS FUNCTIONS
    
    //Open Modal to write the article
    $('#addBlog').click(function(e){
        $('.addBlog').css('display','flex')
        $('.addBlog').css('opacity','1')
        $('.addBlog').css('width','100%')
    }) 
    //Close Modal and Verify if is empty and clear all modal 
    $('.close-add').click(async function(e){
        try {            
            e.preventDefault()
            if( $('.wp-leafis').children().length <= 0){
                $('.addBlog').css('width','0%')
                $('.wp-title').text('Sin titulo')
                $('.addBlog').css('opacity','0')
                $('.addBlog').css('width','0%')
            }else{
                const { isConfirmed: confirmed } = await Swal.fire({title: '¿Seguro que no quieres aññadir este articulo?',text:'Este no e guardara, a exepcion de que tengas un borrador',icon: 'warning',showCancelButton: true})
                if(confirmed){
                    $('.addBlog').css('width','0%')
                    $('.addBlog').css('opacity','0')
                    $('.addBlog').css('width','0%')
                    $('.wp-title').text('Sin titulo')
                    $('.wp-leafis').empty()
                }else{

                }
            }
        } catch (e) {
            
        }
    })
    //Add Paragraph to the articles(MAX:5)
    $('#addP').on('click',async function(e) {
        try {
            e.preventDefault()
            const idParagraph = `${$('.wp-leafis').children().length}-${Date.now()}`
            if($('.wp-leafis').children().length >= 5){

            }else{
                $('.wp-leafis').append(`
                    <div class="wp-edt" id="edt${idParagraph}" typep="normalCover">
                        <div contenteditable="true"  class="wp-parah"  id="puts${idParagraph}">
        
                        </div>
                        <button class="deleteP" deleterKey="${idParagraph}" id="deleteButton${idParagraph}">
                            <img src="icons/close.svg" alt="x-image">                 
                        </button>
                    </div>
                `)
            }
        } catch (e) {
            
        }

    })
    //Delete Paragraph Button function
    $('body').on('click','.addBlog .wp-editer .wp-leaf .wp-leafis .wp-edt .deleteP',function(e) {
        e.preventDefault();
        const deleterKey = $(this).attr('deleterKey')
        $(`#edt${deleterKey}`).remove()
    })
    //Add Link to the paragraph
    $('#linkAdd').on('click',async function(e) {
        try {
            e.preventDefault()
            let divs = $('.wp-leafis').children().length
            if(divs <= 0) {

            }else{
                let arrayData = []
                for (let i = 0; i < divs; i++){
                    arrayData.push($('.wp-leafis').children()[i].id)
                }
                const {value: [textLink,urlLink,paragraph]} = await Swal.mixin({
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
                                inputOptions:{'Parrafos':{1:'Parrafo 1',2:'Parrafo 2',3:'Parrafo 3',4:'Parrafo 4',5:'Parrafo 5'}},
                            }
                            ])       
                if(paragraph > divs){
                    let position = arrayData.length - 1
                    let child = $(`#${arrayData[position]}`).children()[0].id
                    $(`#${child}`).append(`<a rel="noopener noreferrer" target="_blank" href="${urlLink}">${textLink}</a>&nbsp`)
                }else{
                    let child = $(`#${arrayData[paragraph-1]}`).children()[0].id
                    $(`#${child}`).append(`<a rel="noopener noreferrer" target="_blank" href="${urlLink}">${textLink}</a>&nbsp`)
                }
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de añadir tu link al parrafo ',icon: 'error'})
        }
    })   
    //Add a Bold word to the paragraph
    $('#boldAdd').on('click',async function(e) {
        try {
            e.preventDefault()
            let divs = $('.wp-leafis').children().length
            if(divs <= 0){

            }else{
                let arrayData = []
                for (let i = 0; i < divs; i++){
                    arrayData.push($('.wp-leafis').children()[i].id)
                }
                const { value: [bold,paragraph]} = await Swal.mixin({
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
                                                    inputOptions:{'Parrafos':{1:'Parrafo 1',2:'Parrafo 2',3:'Parrafo 3',4:'Parrafo 4',5:'Parrafo 5'}},
                                                }
                                                ])        
                if(paragraph > divs){
                    let position = arrayData.length - 1
                    let child = $(`#${arrayData[position]}`).children()[0].id
                    $(`#${child}`).append(`<strong>${bold}</strong>&nbsp`)
                }else{
                    let child = $(`#${arrayData[paragraph-1]}`).children()[0].id
                    $(`#${child}`).append(`<strong>${bold}</strong>&nbsp`)
                }
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de insertar tu palñabra en negrilla',icon: 'error'})
        }
    })
    //Add Italian to the paragraph 
    $('#italianAdd').on('click',async function(e) {
        try {
            e.preventDefault()
            let divs = $('.wp-leafis').children().length
            if(divs <= 0){
    
            }else{
    
                let arrayData = []
                for (let i = 0; i < divs; i++){
                    arrayData.push($('.wp-leafis').children()[i].id)
                }

                const { value: [italian,paragraph ]} = await Swal.mixin({
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
                                                    }
                                                    ])        
                if(paragraph > divs){
                    let position = arrayData.length - 1
                    let child = $(`#${arrayData[position]}`).children()[0].id
                    $(`#${child}`).append(`<i>${italian}</i>&nbsp`)
                }else{
                    let child = $(`#${arrayData[paragraph-1]}`).children()[0].id
                    $(`#${child}`).append(`<i>${italian}</i>&nbsp`)
                }
            }
        } catch (e) {
            
        }
    })
    //Add image to the article
    $('#imageAdd').click(async function(e) {
        try {
            e.preventDefault()
                    
            let divs = $('.wp-leafis').children().length
            if(divs <= 0){

            }else{
                let arrayData = []
                for (let i = 0; i < divs; i++){
                    arrayData.push($('.wp-leafis').children()[i].id)
                }
                const optionsSelect = {'Imagen':{link: 'Link',add: 'Añadir',yetUp: 'Imagen de Documentos'}}
                const { value: modeToAdd } = await Swal.fire({title: 'Añadir la imagen',text: 'Como quiere añadir la imagen',input: 'select',inputOptions: optionsSelect,inputPlaceholder: 'Selecciona como quieres añadir la imagen'})
                if(modeToAdd ===  'link'){
                    const { value: [linkImg,paragraph]} = await Swal.mixin({
                                                        showCancelButton: true,
                                                        progressSteps: ['1', '2']
                                                        }).queue([{title: 'Link de la imagen',input: 'text',text: 'Direccion del enlace',inputPlaceholder: 'Link',},
                                                        {title: 'Parrafo donde se añadira el enlace',input: 'select',
                                                        inputOptions:{'Parrafos':{1:'Parrafo 1',2:'Parrafo 2',3:'Parrafo 3',4:'Parrafo 4',5:'Parrafo 5'}},}
                                                        ])
                    
                    if(paragraph > divs){
                        let position = arrayData.length - 1
                        let child = $(`#${arrayData[position]}`).children()[0].id
                        let imgYet = false
                        let childParagraph = Object.values($(`#${child}`).children())
                        childParagraph.pop()
                        childParagraph.pop()

                        childParagraph.forEach(tag => {
                            if(tag.tagName === 'IMG'){
                                imgYet = true
                            }else{

                            }
                        })
                        if(imgYet){
                            Swal.fire({title:'!Ey',text:'Este parrafo ya tiene una imagen, recuerda que solo puedes tener una imagen por parrafo',icon: 'info'})
                        }else{
                            $(`#${child}`).append(`<img src="${linkImg}">&nbsp`)
                        }
                    }else{
                        let child = $(`#${arrayData[paragraph-1]}`).children()[0].id
                        let imgYet = false
                        let childParagraph = Object.values($(`#${child}`).children())
                        childParagraph.pop()
                        childParagraph.pop()

                        childParagraph.forEach(tag => {
                            if(tag.tagName === 'IMG'){
                                imgYet = true
                            }else{

                            }
                        })
                        if(imgYet){
                            Swal.fire({title:'!Ey',text:'Este parrafo ya tiene una imagen, recuerda que solo puedes tener una imagen por parrafo',icon: 'info'})
                        }else{
                            $(`#${child}`).append(`<img src="${linkImg}">&nbsp`)
                        }
                    }
                }else if(modeToAdd === 'add'){
                    const { value:[file,paragraph]} = await Swal.mixin({showCancelButton: true,progressSteps: ['1', '2', '3']})
                                                    .queue([{title: 'Añade la imagen',input: 'file',inputAttributes:{'accept': 'image/*','multiple': false}},                                                    
                                                    {title: 'Parrafo donde se añadira la imagen',input: 'select',
                                                    inputOptions:{'Parrafos':{1:'Parrafo 1',2:'Parrafo 2',3:'Parrafo 3',4:'Parrafo 4',5:'Parrafo 5'}},}])
                    const formData = new FormData()
                    formData.append('myFiles',file[0])
                    $('.loaderUpFile').css('display','flex')
                            $('.wp-charger').html(`<div class="wp-titleChg">
                                    <h1 id="innerld">100%</h1>
                                </div>
                                <div class="LoaderBalls">
                                    <div class="LoaderBalls__item"></div>
                                    <div class="LoaderBalls__item"></div>
                                    <div class="LoaderBalls__item"></div>
                                </div>`)
                    const { data: apiResponse } = await axios.post('/api/uploadDoc',formData,
                                            {onUploadProgress: (progressEvent) => {if (progressEvent.lengthComputable) {
                                                let total = progressEvent.total
                                                let cargado = progressEvent.loaded
                                                let porcentaje = Math.round((cargado*100)/total)
                                                $('#innerld').text(`${porcentaje}%`)
                                                }else{$('#innerld').text(`ERROR`)}},
                                                headers:{'content-type':'multipart/form-data','svType':'blog'}})

                    $('.loaderUpFile').css('display','none')
                    $('.wp-charger').html(``)
                    Swal.fire({title: 'Bien hecho',text: 'Los archivos se han subido de forma satisfactoria',icon: 'success'})
                    if(paragraph > divs){
                        let position = arrayData.length - 1
                        let child = $(`#${arrayData[position]}`).children()[0].id
                        let imgYet = false
                        let childParagraph = Object.values($(`#${child}`).children())
                        childParagraph.pop()
                        childParagraph.pop()

                        childParagraph.forEach(tag => {
                            if(tag.tagName === 'IMG'){
                                imgYet = true
                            }else{

                            }
                        })
                        if(imgYet){
                            Swal.fire({title:'!Ey',text:'Este parrafo ya tiene una imagen, recuerda que solo puedes tener una imagen por parrafo',icon: 'info'})
                        }else{
                            $(`#${child}`).append(`<img src="${apiResponse}">&nbsp`)
                        }
                    }else{
                        let child = $(`#${arrayData[paragraph-1]}`).children()[0].id    
                        let imgYet = false
                        let childParagraph = Object.values($(`#${child}`).children())
                        childParagraph.pop()
                        childParagraph.pop()

                        childParagraph.forEach(tag => {
                            if(tag.tagName === 'IMG'){
                                imgYet = true
                            }else{

                            }
                        })
                        if(imgYet){
                            Swal.fire({title:'!Ey',text:'Este parrafo ya tiene una imagen, recuerda que solo puedes tener una imagen por parrafo',icon: 'info'})
                        }else{
                            $(`#${child}`).append(`<img src="/${apiResponse}">&nbsp`)
                        }
                    }
                }else if(modeToAdd === 'yetUp'){
                    const { data:docs } = await axios.post('/api/retrieve/image',{})
                    console.log(docs)
                    if(docs === 'nulos'){
                        Swal.fire({title: 'Imagenes no encontradas',text: 'No se han encontrado imagenes en los documentos guardados',icon: 'warning'})
                    }else{
                        let insert = '<h3>Selecciona una imagen</h3>'
                        docs.forEach(element => {
                            insert += ` <div class="imageInsert" id="${element._id}" ruta="${element.ruta}">
                                            <h4>${element.name}</h4>
                                            <img alt="Imagen ${element.name}" src="/${element.ruta}">
                                            <span class="date">${element.date}</span>
                                        </div>`})
                        $('.selectRetrieveDoc').css('display','flex')
                        $('.selector').css('display','flex')
                        $('.selector').html(insert)
                    }
                }else{

                }
            }
        } catch (e) {
            console.log(e)
           Swal.fire({title: 'Error',text:'Ha ocurrido un error al realizar la accion',icon: 'error'}) 
        }
    })
    //Add video to the article
    $('#videoAdd').click(async function(e){
        try {
            e.preventDefault()
            let divs = $('.wp-leafis').children().length
    
            if(divs <= 0){
    
            }else{
                let arrayData = []
                for (let i = 0; i < divs; i++){
                    arrayData.push($('.wp-leafis').children()[i].id)
                }
                const { value:modeToAdd } = await Swal.fire({title: 'Añadir video',text: 'Elige como añadiras el video',input: 'select',
                                                    inputOptions:{addVideo: 'Añadir',docs: 'Video de Documentos'}})
                console.log(modeToAdd)
                if(modeToAdd === 'youtube'){
                    const { value: [iframe,paragraph] } = await Swal.mixin({showCancelButton: true,progressSteps: ['1', '2', '3']})
                                                        .queue([{title: 'Iframe del video',input: 'text',text: 'Video embebido de youtube',inputPlaceholder: 'Texto copiado de Youtube',},
                                                        {
                                                            title: 'Parrafo donde se añadira el video',input: 'select',
                                                            inputOptions:{'Parrafos':{1:'Parrafo 1',2:'Parrafo 2',3:'Parrafo 3',4:'Parrafo 4',5:'Parrafo 5'}},
                                                            }])
                    if(paragraph > divs){
                        let position = arrayData.length - 1
                        let child = $(`#${arrayData[position]}`).children()[0].id
                        $(`#${child}`).append(`${iframe}&nbsp`)
                    }else{
                        let child = $(`#${arrayData[paragraph-1]}`).children()[0].id
                        $(`#${child}`).append(`${iframe}&nbsp`)
                    }
                }else if(modeToAdd === 'addVideo'){
                    const { value: [file,paragraph] } = await Swal.mixin({showCancelButton: true,progressSteps: ['1', '2', '3']})
                                                        .queue([{title: 'Añade el video',input: 'file',
                                                        inputAttributes:{'accept': 'video/*',multiple: false}},
                                                        {title: 'Parrafo donde se añadira el video',input: 'select',
                                                        inputOptions:{'Parrafos':{1:'Parrafo 1',2:'Parrafo 2',3:'Parrafo 3',4:'Parrafo 4',5:'Parrafo 5'}},
                                                        }])
                    const formData = new FormData()
                    formData.append('myFiles',file[0])
                    $('.loaderUpFile').css('display','flex')
                    $('.wp-charger').html(`<div class="wp-titleChg">
                                    <h1 id="innerld">100%</h1>
                            </div>
                                <div class="LoaderBalls">
                            <div class="LoaderBalls__item"></div>
                            <div class="LoaderBalls__item"></div>
                            <div class="LoaderBalls__item"></div>
                        </div>`)
                   const {data: apiResponse} = await axios.post('/api/uploadDoc',formData,{
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
                                                    headers:{'content-type':'multipart/form-data','svType':'blog'}})
                    const typeOfVideo = await apiResponse.substring(apiResponse.lastIndexOf('.')+1)
                    $('.loaderUpFile').css('display','none')
                    $('.wp-charger').html(``)
                    Swal.fire({
                        title: 'Bien hecho',
                        text: 'Los archivos se han subido de forma satisfactoria',
                        icon: 'success'
                    })
                    if(paragraph > divs){
                        let position = arrayData.length - 1
                        let child = $(`#${arrayData[position]}`).children()[0].id
                        let videoYet = false
                        let childParagraph = Object.values($(`#${child}`).children())
                        childParagraph.pop()
                        childParagraph.pop()

                        childParagraph.forEach(tag => {
                            if(tag.tagName === 'VIDEO'){
                                videoYet = true
                            }else{

                            }
                        })
                        if(videoYet){
                            Swal.fire({title:'!Ey',text:'Este parrafo ya tiene un video, recuerda que solo puedes tener una video por parrafo',icon: 'info'})
                        }else{
                            $(`#${child}`).append(`<video width="320" height="240" controls>
                            <source src="/${apiResponse}" type="video/${typeOfVideo}">
                          </video> &nbsp`)
                        }
    
                    }else{
                        let child = $(`#${arrayData[paragraph-1]}`).children()[0].id
                        let videoYet = false
                        let childParagraph = Object.values($(`#${child}`).children())
                        childParagraph.pop()
                        childParagraph.pop()

                        childParagraph.forEach(tag => {
                            if(tag.tagName === 'VIDEO'){
                                videoYet = true
                            }else{

                            }
                        })
                        if(videoYet){
                            Swal.fire({title:'!Ey',text:'Este parrafo ya tiene un video, recuerda que solo puedes tener una video por parrafo',icon: 'info'})
                        }else{
                            $(`#${child}`).append(`<video width="320" height="240" controls>
                            <source src="/${apiResponse}" type="video/${typeOfVideo}">
                          </video> &nbsp`)
                        }
    
                    }

                }else if(modeToAdd === 'docs'){
                    const {data: docs} = await axios.post('/api/retrieve/video',{})
                    if(docs === 'nulos'){
                        Swal.fire({title: 'Videos no encontrados',text: 'No se han encontrado videos en los documentos guardados',icon: 'warning'})
                    }else if(Array.isArray(docs)){
                        let insert = '<h3>Selecciona un video</h3>'
                        let typeOfVideo = ''
                        docs.forEach(element => {
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
                     rel="noopenner norefer"}else{
                        window.location = '/loguearse'
                    }
                }else{}
            }
            
        } catch (e) {
            
        }
    })
    //Save Articles
    $('.sender').click(async function(e){
        try {
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
                const apiResponse = await axios.post('/api/saveUserArticle',{date:Date(),parrafos: arrayParagraphs,titulo:title})
                $('.addBlog').css('width','0%')
                $('.addBlog').css('opacity','0')
                $('.addBlog').css('width','0%')
                $('.wp-title').text('Sin titulo')
                $('.wp-leafis').empty()
                Swal.fire({title: 'Bien Hecho',text: 'Se han guardado tus articulos',icon: 'success'})
                getArticles()
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de guardar tu articulos',icon: 'error'})
        }
    })
    $('body').on('click', '.selectRetrieveDoc .selector .imageInsert',async function(e){
        try {
            e.preventDefault()
            $('.selectRetrieveDoc').css('display','none')
            $('.selector').css('display','none')
            const ruta = $(this).attr('ruta')
            const optionsSelect = {'Parrafos':{ 1: 'Parrafo 1',2: 'Parrafo 2',3: 'Parrafo 3',4: 'Parrafo 4',5: 'Parrafo 5',}}
            const { value: parrafo } = await Swal.fire({title: 'Parrafo',text:'Selecciona el parrafo donde se insertara la imagen',input:'select',inputOptions:optionsSelect})
            let divs = $('.wp-leafis').children().length
            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            if(parrafo > divs){
                
                let position = arrayData.length - 1
                let child = $(`#${arrayData[position]}`).children()[0].id
                let imgYet = false
                let childParagraph = Object.values($(`#${child}`).children())
                childParagraph.pop()
                childParagraph.pop()

                childParagraph.forEach(tag => {
                    if(tag.tagName === 'IMG'){
                        imgYet = true
                    }else{

                    }
                })
                if(imgYet){
                    Swal.fire({title:'!Ey',text:'Este parrafo ya tiene una imagen, recuerda que solo puedes tener una imagen por parrafo',icon: 'info'})
                }else{
                    $(`#${child}`).append(`<img src="/${element.ruta}">&nbsp`)
                }

            }else{
                let child = $(`#${arrayData[parrafo-1]}`).children()[0].id
                let imgYet = false
                let childParagraph = Object.values($(`#${child}`).children())
                childParagraph.pop()
                childParagraph.pop()

                childParagraph.forEach(tag => {
                    if(tag.tagName === 'IMG'){
                        imgYet = true
                    }else{

                    }
                })
                if(imgYet){
                    Swal.fire({title:'!Ey',text:'Este parrafo ya tiene una imagen, recuerda que solo puedes tener una imagen por parrafo',icon: 'info'})
                }else{
                    $(`#${child}`).append(`<img src="/${ruta}">&nbsp`)
                }
            }

        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de insertar la imagen o selecionar el parrafo ',icon:'error'})
        }
    })
    $('body').on('click', '.selectRetrieveDoc .selectorVideo .videoInsert ',async function(e){
        try {
            e.preventDefault()
            $('.selectRetrieveDoc').css('display','none')
            $('.selectorVideo').css('display','none')
            const optionsSelect = {'Parrafos':{ 1: 'Parrafo 1',2: 'Parrafo 2',3: 'Parrafo 3',4: 'Parrafo 4',5: 'Parrafo 5',}}

            const ruta = $(this).attr('ruta')
            const typeOfFile = ruta.substring(ruta.lastIndexOf('.')+1)
            const {value: parrafo} = await Swal.fire({title: 'Parrafo',text:'Selecciona el parrafo donde se insertara la imagen',input:'select',inputOptions:optionsSelect})
            let divs = $('.wp-leafis').children().length
            let arrayData = []
            for (let i = 0; i < divs; i++){
                arrayData.push($('.wp-leafis').children()[i].id)
            }
            if(parrafo > divs){
                let position = arrayData.length - 1
                let child = $(`#${arrayData[position]}`).children()[0].id
                let videoYet = false
                let childParagraph = Object.values($(`#${child}`).children())
                childParagraph.pop()
                childParagraph.pop()

                childParagraph.forEach(tag => {
                    if(tag.tagName === 'VIDEO'){
                        videoYet = true
                    }else{

                    }
                })
                if(videoYet){
                    Swal.fire({title:'!Ey',text:'Este parrafo ya tiene un video, recuerda que solo puedes tener una video por parrafo',icon: 'info'})
                }else{
                    $(`#${child}`).append(`<video width="320" height="240" controls><source src="/${ruta}" type="video/${typeOfFile}"></video>&nbsp`)
                }
    

            }else{
                let child = $(`#${arrayData[parrafo-1]}`).children()[0].id
                let videoYet = false
                let childParagraph = Object.values($(`#${child}`).children())
                childParagraph.pop()
                childParagraph.pop()

                childParagraph.forEach(tag => {
                    if(tag.tagName === 'VIDEO'){
                        videoYet = true
                    }else{

                    }
                })
                if(videoYet){
                    Swal.fire({title:'!Ey',text:'Este parrafo ya tiene un video, recuerda que solo puedes tener una video por parrafo',icon: 'info'})
                }else{
                    $(`#${child}`).append(`<video width="320" height="240" controls><source src="/${ruta}" type="video/${typeOfFile}"></video>&nbsp`)
                }
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error para insertar el video',icon: 'error'})
        }
    })
    //PERFIL FUNCTIONS AND EVENTS
    
    //Change password
    $('#sendPasswords').click(async function(e){
        try {            
            e.preventDefault()
            const passwordOne = $('#pass1').val()
            const passwordTwo = $('#pass2').val()
            if(passwordOne === passwordTwo){
                const apiResponse = await axios.post('/api/changeUserPassword',{passwordOne,passwordTwo})
                Swal.fire({title: 'Bien Hecho',text: 'Tu contraseña ha sido actualizada, cierra sesion para verificarla',icon: 'success'})
            }else{
                Swal.fire({title: 'Contraseñas incorrectas',icon: 'error',text: 'Tus contraseñas deben coincidir, asegurate de que lo hagan'})
            }
        } catch (e) {
            Swal.fire({title: 'Error',text: 'Ha ocurrido un error al cambiar tu contraseña',icon: 'error'})
        }
    })
    //Change ImgUserName 
    $('.contImgHover').click(async function(e){
        try {
            e.preventDefault()
            const { value: file } = await Swal.fire({text: 'Elige tu nueva imagen de perfil',input: 'file',title: 'Imagen de perfil',inputAttributes:{'accept': 'image/*','multiple': false}})
            const formData = new FormData()
            console.log(file)
            formData.append('myFiles',file[0])
            const apiResponse = await axios.post('/api/changeImgProfile',formData,{headers: {contentType: 'multipart/form-data'}})
            console.log(apiResponse)
            Swal.fire({title: 'Bien Hecho',text: 'Imagen de perfil cambiada',icon: 'success'})
        } catch (e) {
            Swal.fire({title: 'Error al cambiar imagen',text: 'Ha ocurrido un error al intentar cambiar tu imagen de perfil',icon: 'error'})
        }
    })
    //Change Username
    $('.editUserBtn').click(async function(e){
        try {
            e.preventDefault();
            const keyChange = $(this).attr('keyChange')
            const { value: nombreDeUsuario} = await Swal.fire({title: 'Cambiar nombre de usuario',text: 'Escribe tu nuevo nombre de usuario',input: 'text',showCancelButton: true})
            const apiResponse = await axios.post('/api/changeUserName', {username: nombreDeUsuario})
            Swal.fire({title: 'Bien Hecho',text: 'Tu nombre de usuario ha sido cambiado',icon: 'success'})
        } catch (e) {
            Swal.fire({title: 'Error al intentar cambiar tu nombre de usuario',text: 'Ha ocurrido un error al intentar cambiar tu nombre de usuario',icon: 'error'})
        }
    })
    //DOCS ALL EVENTS FUNCTIONS 
    //Modal Add doc
    $('#addDoc').click(function(e){
        e.preventDefault()
        $('.uploaderFiles').css('display','flex')
        $('.uploaderFiles').css('opacity','1')
        $('.uploaderFiles').css('width','100%')
    })
    //Close Doc
    $('.closer').click(function(e){
        e.preventDefault()
        $('.uploaderFiles').css('width','0%')
        $('.uploaderFiles').css('opacity','0')
    })
    //Add doc with btn
    $('#fileUp').change(async function(e){
        try {
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
            const apiResponse = await axios.post('/api/uploadDoc',formData,{
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
                                        headers:{'content-type':'multipart/form-data',} })
            getAllDataDocsFilter()
            $('.loaderUpFile').css('display','none')
            $('.wp-charger').html(``)
            Swal.fire({title: 'Bien hecho',text: 'Los archivos se han subido de forma satisfactoria',icon: 'success'})

        } catch (e) {
            console.log(e)

            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de realizar esta accion ',icon: 'error'})
        }
    })
    //DRAG AND DROP EVENTS AND ANIMATIONS
    $('.drop').on('dragover', function(e){
        e.preventDefault()
        $(this).css({'transform':'scale(1.03)','border':'5px dashed #000000'})
        return false
    })
    $('.drop').on('drop', async function(e){
        try {
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
            const apiResponse = await axios.post('/api/uploadDoc',formData,{
                                onUploadProgress: (progressEvent) => {
                                    if (progressEvent.lengthComputable) {
                                    let total = progressEvent.total
                                    let cargado = progressEvent.loaded
                                    let porcentaje = Math.round((cargado*100)/total)
                                    $('#innerld').text(`${porcentaje}%`)
                                }else{
                                    $('#innerld').text(`ERROR`)
                                }
                                },headers:{'content-type':'multipart/form-data',}})
            getAllDataDocsFilter()
            $('.loaderUpFile').css('display','none')
            $('.wp-charger').html(``)
            Swal.fire({title: 'Bien hecho',text: 'Los archivos se han subido de forma satisfactoria',icon: 'success'})
        } catch (e) {
            console.log(e)
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de realizar esta accion',icon: 'error'})
        }
    })
    $('.drop').on('dragleave', function(e){
        e.preventDefault()
        $(this).css({'transform':'scale(1)','border':'5px dashed #ccc'})
        return false

    })
    $('body').on('click', '.wp-division .wp-content .leaf .wp-allArticles .wp-article .wp-actions .visibleArticleBtn', async function(e){
        try {
            e.preventDefault()
            const changerKey = $(this).attr('changerKey')
            const optionsSelect = {
                'Visibilidad': {
                    visible: 'Visible',
                    hide:'Oculto'
                }
            }
            const { value:visibility } = await Swal.fire({title:'Cambiar la visibilidad de tu articulo',text:'Que visibilidad quieres para tu articulo',input: 'select',inputOptions:optionsSelect})
            const stateToChange = (visibility === 'visible') ? true : false
            const apiResponse = await axios({url:'/api/changeVisibleArticleUser',method:'PUT',data: {visibility:stateToChange,id:changerKey}})
            Swal.fire({title: 'Bien Hecho',text: 'La visibilidad del articulo ha sido cambiada ',icon: 'success'})
            getArticles()
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de cambiar la visibilidad del articulo'})
        }
    })
    $('body').on('click','.wp-division .wp-content .leaf .wp-allArticles .wp-article .wp-actions .deleteArticlebtn',async function(e){
        try {
            e.preventDefault()
            const deleterKey = $(this).attr('deleterKey')
            const { isConfirmed:confirmed } = await Swal.fire({title: 'Cuidado!',text:'Si eliminas este articulo no podras recuperlarlo ',icon: 'warning',showCancelButton: true})
            if(confirmed){
                const apiResponse = await axios({url:'/api/deleteArticleUser',method: 'DELETE',data: {deleterKey}})
                Swal.fire({title: 'Bien Hecho',text: 'El articulo ha sido eliminado con exito ',icon:'success'})
                getArticles()
            }else{

            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de borrar el articulo ',icon: 'error'})
        }
    })

    $('body').on('click','.wp-division .leaf .wp-files .card-file .wp-infoMan .wp-btnUse .clickerView',async function(e){
        try {
            e.preventDefault()
            const keyChanger = $(this).attr('keyChanger')
            const optionsSelect = {
                'Visibilidad':{
                    visible:'Visible',
                    hide: 'Oculto'
                }
            }
            const {isConfirmed: confirmed,value:visible } = await Swal.fire({title: 'Visibilidad del documento',text: 'Elije si este articulo sera visible o no',input: 'select',inputOptions:optionsSelect,showCancelButton: true})
            if(confirmed){
                const stateToChange = (visible === 'visible') ? true : false
                console.log(stateToChange)
                const apiResponse = await axios.put('/api/changeDocVisibility',{keyChanger,visible:stateToChange})
                getAllDataDocsFilter()
                Swal.fire({title: 'Bien Hecho',text: 'se ha cambiado la visibiliad del documento ', icon: 'success'})
            }else{

            }
        } catch (e) {
            console.log(e)
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de realizar esta accion',icon: 'error'})
        }
    })
    $('body').on('click','.wp-division .leaf .wp-files .card-file .wp-actions .delete',async function(e){
        try {
            e.preventDefault()
            const deleterKey = $(this).attr('deleterKey') || 'null'
            const { isConfirmed: confirmed } = await Swal.fire({title:'!Cuidado',text: 'Esta accion no sera reversible',icon: 'warning',confirmButtonText: 'Eliminar'})

            if(confirmed){
                if(deleterKey === 'null'){
                    Swal.fire({title:'Error del documento' ,text: 'Este documento posee un erro por favor comunicate con el administrador ',icon: 'error'})
                }else{
                    const apiResponse = await axios({url:'/api/deleteDoc',method: 'DELETE',data: {deleterKey}})
                    getAllDataDocsFilter()
                }
            }else{

            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de realizar esta accion',icon: 'error'})
        }
    })

    async function getAllDataDocsFilter(){
        try {
            let actualFilter = window.location.toString()
            actualFilter = actualFilter.substring(actualFilter.lastIndexOf('=')+1)

            const {data:apiResponse} = await axios.post('/documentos',{filter: actualFilter})
            console.log(apiResponse)
            if(apiResponse === 'nulos'){
                const layout = `
                <div class="empty-title">
                  <h1>Parece que no tienes ningun Archivo Añadido</h1>
                </div>
                <div class="empty-message">
                  <p>Añade uno dandole click al boton de mas abajo a la derecha</p>
                </div>
                <div class="empty-img"><img src="icons/empty-blog.svg" alt="imagen vacios"/></div>`
                $('.leaf').html(layout)
            }else{
                $('.leaf').html(`<div class="wp-files"></div>`)
                let content = ``
                apiResponse.forEach(({name,_id,visible,ruta,type}) => {
                    if(visible){
                        content += `
                                    <div class="card-file">
                                        <div class="wp-infoMan">
                                            <div class="wp-nameFile">
                                                <h3>${name}</h3>
                                            </div>
                                            <div class="wp-btnUse">
                                                <button class="dotsDisplay clickerView" keyChanger="${_id}"><img src="/icons/dots.svg"  style="heigth:25px"></button>
                                            </div>
                                        </div>
                                        <div class="wp-imgType" aria-label="Documento visible" data-balloon-pos="right">
                                            <img src="/icons/uploads/${type}.svg" style="heigth:25px">
                                        </div>
                                        <div class="wp-actions">
                                            <a class="btnActions download">Descargar</a>
                                            <button class="btnActions delete" deleterKey="${_id}">Eliminar</button>
                                        </div>
                                    </div>
                                    `
                    }else{
                        content += `
                        <div class="card-file">
                            <div class="wp-infoMan">
                                <div class="wp-nameFile">
                                    <h3>${name}</h3>
                                </div>
                                <div class="wp-btnUse">
                                    <button class="dotsDisplay clickerView" keyChanger="${_id}">
                                        <img src="/icons/dots.svg">
                                    </button>
                                </div>
                            </div>
                            <div class="wp-imgType" aria-label="Documento oculto" data-balloon-pos="right">
                                <img src="/icons/uploads/${type}.svg">
                            </div>
                            <div class="wp-actions">
                                <a class="btnActions download">
                                    Descargar 
                                </a>
                                <button class="btnActions delete" deleterKey="${_id}">Eliminar</button>
                            </div>
                        </div>
                        `
                    }
                })
                $('.wp-files').html(content)
            }
        } catch (e) {
            console.log(e)

            Swal.fire({title: 'Error',text: 'Ha ocurrido un error a la hora de traer tus archivos multimedia' ,icon: 'error'})
        }
    }
    async function getArticles(){
        try {
            const {data: articles} = await axios({url:"/articulos",method:"POST"})
            if(articles === 'nulos'){
                const layout = `<div class="empty-title">
                                    <h1>Parece que no tienes ningun articulo </h1>
                                </div>
                                <div class="empty-message">
                                    <p>Para añadir un nuevo articulo al blog de CER dale click al boton de mas </p>
                                </div>
                                <div class="empty-img"><img src="icons/empty-blog.svg" alt="imagen vacios" /></div>`
                $('.leaf').html(layout)
            }else{
                $('.leaf').html(`<div class="wp-allArticles"></div>`)
                let content = ``
                let paragraphsContent = ``
                articles.forEach(({titulo,visible,parrafos,usernameCreator,imgCreator,_id}) => {
                    paragraphsContent = ``
                    if (visible) {
                      parrafos.forEach((parrafo) => {
                        paragraphsContent += `<div class="parrafos">
                                            <div class="parrafoArticle">
                                                            ${parrafo}
                                                        </div>
                                                    </div>`;
                      });
                      content += `<div class="wp-article">
                                            <div class="header">
                                                <h3>${titulo}</h3>
                                                <div class="visible-cont" aria-label="Articulo visible" data-balloon-pos="right">
                                                    <img src="/icons/eye(1).svg" alt="Visible" />
                                                </div>
                                            </div>
                                            ${paragraphsContent}
                                            <div class="wp-actions">
                                                <button class="visibleArticleBtn" changerKey="${_id}">
                                                    <img src="/icons/dots.svg">
                                                </button>
                                                <div class="wp-creathorThumbnail">
                                                    <img src="/${imgCreator}">
                                                    <span>${usernameCreator}</span>
                                                </div>
                                                <button class="deleteArticlebtn" deleterKey="${_id}">
                                                    <img src="/icons/delete.svg">
                                                    <span>Eliminar</span>
                                                </button>
                                            </div>
                                        </div>`;
                    } else {
                      parrafos.forEach((parrafo) => {
                        paragraphsContent += `<div class="parrafos">
                                                        <div class="parrafoArticle">
                                                            ${parrafo}
                                                        </div>
                                                    </div>`;
                      });
                      content += `<div class="wp-article">
                                            <div class="header">
                                                <h3>${titulo}</h3>
                                                <div class="visible-cont" aria-label="Articulo oculto" data-balloon-pos="right">
                                                    <img src="/icons/hide.svg" alt="Hide" />
                                                </div>
                                            </div>
                                            ${paragraphsContent}
                                            <div class="wp-actions">
                                                <button class="visibleArticleBtn" changerKey="${_id}">
                                                    <img src="/icons/dots.svg">
                                                </button>
                                                <div class="wp-creathorThumbnail">
                                                    <img src="/${imgCreator}">
                                                    <span>${usernameCreator}</span>
                                                </div>
                                                <button class="deleteArticlebtn" deleterKey="${_id}">
                                                    <img src="/icons/delete.svg">
                                                    <span>Eliminar</span>
                                                </button>
                                            </div>
                                        </div>`;
                    }

                })
                $('.wp-allArticles').html(content)
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de traer la lista de articulos actualizados',icon:'error'})
        }
    }
})