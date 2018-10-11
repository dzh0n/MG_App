

$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});

    $('#sms_code').val(randomInteger(1000,9999));

    $('.ajax_sms').on('click',function(){
        sendSms();
        return false
    });

});

function registration() {

}

function sendSms() {
    if($('#phone').val() != '') {
        $.ajax({
            type: "POST",
            url: "https://мужичок-грузовичок.рф/mapi/registration/sms",
            data: "phone="+$('#phone').val()+'&code='+$('#sms_code').val(),
            success: function(msg){
                alert( "Прибыли данные: " + msg );
            }
        });
    }
    else {
        alert('Укажите сначала свой номер телефона');
    }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}