$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});
});

function login() {
    error = false;

    if($('#phone').val()=='') {
        $('#phone').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#phone').parent('.form-row-item').removeClass('error');
    }

    if($('#password').val()=='') {
        $('#password').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#password').parent('.form-row-item').removeClass('error');
    }

    if(error == false) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/registration/login",
            data: "username="+$('#phone').val()+"&password="+$('#password').val(),
            success: function(msg){
                if($.isNumeric(msg)) {
                    var storage = window.localStorage;
                    storage.setItem('userId', msg);
                    window.location = 'index.html';
                }
                else {
                    navigator.notification.alert(
                        msg,  // message
                        function(){},         // callback
                        'При авторизации возникли ошибки',            // title
                        'Ok'                  // buttonName
                    );
                }
            }
        });
    }
}