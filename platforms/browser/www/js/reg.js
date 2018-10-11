

$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});

    $('#sms_code').val(randomInteger(1000,9999));

    $('.ajax_sms').on('click',function(){
        sendSms();
        return false
    });

});

function registration() {
    error = false;

    if($('#name').val()=='') {
        $('#name').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#name').parent('.form-row-item').removeClass('error');
    }

    if($('#phone').val()=='') {
        $('#phone').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#phone').parent('.form-row-item').removeClass('error');
    }

    if($('#email').val()=='' || validateEmail($('#email').val()) == false) {
        $('#email').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#email').parent('.form-row-item').removeClass('error');
    }

    if($('#password').val()=='') {
        $('#password').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#password').parent('.form-row-item').removeClass('error');
    }

    if($('#sms_code_in').val()=='' || $('#sms_code_in').val()!=$('#sms_code').val()) {
        $('#sms_code_in').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#sms_code_in').parent('.form-row-item').removeClass('error');
    }


    if(error == false) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/registration/add",
            data: "name="+$('#name').val()+"&phone="+$('#phone').val()+'&email='+$('#email').val()+"&password="+$('#email').val(),
            success: function(msg){
                if(msg=='success') {

                }
                else {
                    navigator.notification.alert(
                        msg,  // message
                        function(){},         // callback
                        'При регистрации возникли ошибки',            // title
                        'Ok'                  // buttonName
                    );
                }
            }
        });
    }
}

function sendSms() {
    if($('#phone').val() != '') {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/registration/sms",
            data: "phone="+$('#phone').val()+'&code='+$('#sms_code').val(),
            success: function(msg){
                navigator.notification.alert(
                    'Код подтверждения отправлен на ваш номер телефона',  // message
                    function(){},         // callback
                    '',//'Код подтверждения',            // title
                    'Ok'                  // buttonName
                );
            }
        });
    }
    else {
        navigator.notification.alert(
            'Укажите сначала свой номер телефона',  // message
            function(){},         // callback
            'Код подтверждения из SMS',            // title
            'Ok'                  // buttonName
        );
    }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}