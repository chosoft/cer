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
            const filter = e.currentTarget.previousElementSibling.value

            let verifyFilter = filter ? true : false
            if(verifyFilter){
                const { data:apiResponse } = axios({method: 'POST',url:'/api/myArticles',data:{filter,filterType}})
                if(apiResponse === 'nulos'){
                    
                }else{

                }
            }else{
                Swal.fire({title: 'Ey',text:'El filtro no puede estar vacio rellenalo',icon: 'warning'})
            }
        } catch (e) {
            Swal.fire({title: 'Error',text:'Ha ocurrido un error a la hora de intentar filtrar',icon: 'error'})
        }
    })
})