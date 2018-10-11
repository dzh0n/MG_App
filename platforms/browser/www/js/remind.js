$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});
});

function remind() {
    error = false;

    if($('#phone').val()=='') {
        $('#phone').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#phone').parent('.form-row-item').removeClass('error');
    }

    if(error == false) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/registration/remind",
            data: "phone="+$('#phone').val(),
            success: function(msg){
                if(msg=='success') {
                    navigator.notification.alert(
                        'Ваш пароль успешно изменен и отправлен вам. Войдите на сайт используя новый пароль из смс.',  // message
                        function(){window.location = 'login.html'},         // callback
                        'Восстановление пароля',            // title
                        'Войти'                  // buttonName
                    );
                }
                else {
                    navigator.notification.alert(
                        msg,  // message
                        function(){},         // callback
                        '',            // title
                        'Ok'                  // buttonName
                    );
                }
            }
        });
    }
}