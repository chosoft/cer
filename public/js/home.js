$(document).ready(function(){
    let actualSlide = 0
    changeSlide(actualSlide,+1)
    $('.toggleBtnSlide').click((e) => {
        const action = (e.target.attributes[1].value === 'plus') ? 1 : -1;
        const slides = Object.values($('.wp-imgs').children())
        slides.pop()
        slides.pop()
        if(actualSlide + action < 0){
            $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
            $($('.wp-imgs').children()[slides.length-1]).removeClass('hide').addClass('view')
            actualSlide = slides.length-1
        }else if(actualSlide + action > slides.length-1){
            $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
            $($('.wp-imgs').children()[0]).removeClass('hide').addClass('view')
            actualSlide = 0
        }else{
            $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
            $($('.wp-imgs').children()[actualSlide+action]).removeClass('hide').addClass('view')
            actualSlide += action
        }
    })
    function changeSlide(actualSlide, action){
        setInterval(() => {
            const slides = Object.values($('.wp-imgs').children())
            slides.pop()
            slides.pop()
            if(actualSlide + action < 0){
                $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
                $($('.wp-imgs').children()[slides.length-1]).removeClass('hide').addClass('view')
                actualSlide = slides.length-1
            }else if(actualSlide + action > slides.length-1){
                $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
                $($('.wp-imgs').children()[0]).removeClass('hide').addClass('view')
                actualSlide = 0
            }else{
                $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
                $($('.wp-imgs').children()[actualSlide+action]).removeClass('hide').addClass('view')
                actualSlide += action
            }
        },5000)
    }
})
