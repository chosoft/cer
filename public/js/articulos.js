$(document).ready(function(){
    $('.filterBtn').click(async(e) => {
        try {
            $('.selectorFilter').css('display','flex')
            $('.selectorFilter').css('display','flex')
            $('.contSquare').css('display','flex')
        } catch (err) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de mostrar los filtros',icon: 'error'})
        }
        
    })
    $('.closer').click(async(e) => {
        $('.selectorFilter').css('display','none')
        $('.contInputFilter').css('display','none')

        let children = Object.values($('.contInputFilter').children())
        children.pop()
        children.pop()
        children.forEach(div => {
            if(div.classList.contains('hide')){

            }else{
                div.classList.add('hide')
            }
        })
    })
    $('.squareFilter').click(async (e) => {
        try {
            const filterRender = e.currentTarget.attributes[1].value
            $('.contSquare').css('display','none')
            $('.contInputFilter').css('display','flex')

            $(`#${filterRender}`).removeClass('hide')
        } catch (err) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de intentar filtrar tus articulos',icon: 'error'})
        }
    })
    $('.sendToApi').click(async (e) => {
        try {
            e.preventDefault()
            const filterType = e.currentTarget.attributes[1].value
            let filter = e.currentTarget.previousElementSibling.value
            filter = filter.toLowerCase()
            let verifyFilter = filter ? true : false
            if(verifyFilter){
                const { data:apiResponse } = await axios({method: 'POST',url:'/api/myArticles',data:{filter,filterType}})
                if(apiResponse === 'nulos'){
                    Swal.fire({title: 'Ey',text:'No se ha encontrado ningun articulo con el filtro aplicado',icon: 'warning'})
                }else if(apiResponse === 'notUsers' || apiResponse === 'notUser'){
                    Swal.fire({title: 'Ey',text:'Este maestro no existe tal vez estes escribiendo mal',icon: 'warning'})
                }else if(Array.isArray(apiResponse) && apiResponse.length > 0){
                    let content = ''
                    apiResponse.forEach(({usernameCreator,imgCreator,_id,banType,titulo})=>{
                        content += `
                            <div class="card-article" redirectTo="/maestro/${usernameCreator}/${_id}">
                                <div class="wp-bannerCard color-${banType}"></div>
                                <div class="wp-infoCard">
                                    <div class="wp-img">
                                        <img src="/${imgCreator}">
                                    </div>
                                    <div class="wp-title">
                                        <h3>${titulo}</h3>
                                    </div>
                                </div>
                            </div>
                        `
                    })

                    $('.allCardArticles').html(content)
                }else{
                Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de intentar filtrar',icon: 'error'})
                }
            }else{
                Swal.fire({title: 'Ey',text:'El filtro no puede estar vacio rellenalo',icon: 'warning'})
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de intentar filtrar',icon: 'error'})
        }
    })
    $('body').on('click','.allCardArticles .card-article',async(e) => {
        try {
            const link = e.currentTarget.attributes[1].value
            const verified = link ? link : false
            if(verified){
                location.href = link
            }else{
                Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de ir al articulo',icon: 'error'})
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de ir al articulo',icon: 'error'})
        }
    })
})