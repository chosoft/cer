$(document).ready(function(){
    let actualSlide = 0
    $('.toggleBtnSlide').click(() => {
        console.log($(this).attr('tl'))
        const action = ($(this).attr('tl') === 'plus') ? 1 : -1;
        const slides = Object.values($('.wp-imgs').children())
        slides.pop()
        slides.pop()
        console.log(action, actualSlide)
        if(actualSlide + action < 0){
            $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
            $($('.wp-imgs').children()[slides.length-1]).removeClass('hide').addClass('view')
        }else if(actualSlide + action > slides.length-1){
            $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
            $($('.wp-imgs').children()[0]).removeClass('hide').addClass('view')
        }else{
            $($('.wp-imgs').children()[actualSlide]).removeClass('view').addClass('hide')
            $($('.wp-imgs').children()[actualSlide+action]).removeClass('hide').addClass('view')
            actualSlide += action
        }
    })
})