$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});

    var storage = window.localStorage;
    userId = storage.getItem('userId');
    if(userId) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/balance/info/",
            data: "id="+userId,
            dataType: 'json',
            success: function(data){
                $('.balance-main-current span').text(parseFloat(data.balance));
                if(data.history!='')
                    $('#history tbody').html(data.history);
            }
        });
    }
    else
        window.location = 'login.html';

    $('#balance-add').on('click', function(){

        error = false;
        if($('#summa').val()=='') {
            $('#summa').parent('div').addClass('error');
            error = true;
        }
        else {
            $('#summa').parent('div').removeClass('error');
        }

        if(error == false) {
            $.ajax({
                type: "POST",
                url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/balance/add/",
                data: "id="+userId+"&summa="+$('#summa').val(),
                dataType: 'json',
                success: function(data){
                   if(data.result=='error') {
                       navigator.notification.alert(
                           data.errors,  // message
                           function(){},         // callback
                           'При сохранении возникли ошибки',            // title
                           'Ok'                  // buttonName
                       );
                   }
                   if(data.result=='success'){
                       window.open(data.url, '_system');
                   }
                }
            });
        }

        return false;
    });

});