$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});

    var storage = window.localStorage;
    userId = storage.getItem('userId');
    if(userId) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/user/info/",
            data: "id="+userId,
            dataType: 'json',
            success: function(data){
                $('#name').val(data.name);
                $('#phone').val(data.phone);
                $('#email').val(data.email);
                //$('#phone').val(data.phone);
            }
        });
    }
    else
        window.location = 'login.html';
});

function saveSettings() {
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

    if($('#newPassword').val()!='' && $('#newPassword').val()!=$('#repeatPassword').val()) {
        $('#newPassword').parent('.form-row-item').addClass('error');
        $('#repeatPassword').parent('.form-row-item').addClass('error');
        error = true;
    }
    else {
        $('#newPassword').parent('.form-row-item').removeClass('error');
        $('#repeatPassword').parent('.form-row-item').removeClass('error');
    }




    if(error == false) {
        $.ajax({
            type: "POST",
            beforeSend: function(){SpinnerDialog.show();},
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/user/savesetting",
            data: "id="+userId+"&name="+$('#name').val()+"&phone="+$('#phone').val()+'&email='+$('#email').val()+"&newPassword="+$('#newPassword').val()+"&repeatPassword="+$('#repeatPassword').val(),
            success: function(msg){
                if(msg=='success') {
                    navigator.notification.alert(
                        'Все ваши данные были успешно сохранены.',  // message
                        function(){$('#newPassword').val('');$('#repeatPassword').val('');},         // callback
                        'Настройки сохранены',            // title
                        'Ok'                  // buttonName
                    );
                }
                else {
                    navigator.notification.alert(
                        msg,  // message
                        function(){},         // callback
                        'При сохранении возникли ошибки',            // title
                        'Ok'                  // buttonName
                    );
                }
            }
        });
    }
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}