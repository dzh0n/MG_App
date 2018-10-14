$(document).ready(function(){
    $('input.phone-mask').mask('+7 (000) 000-00-00', {clearIfNotMatch: true});

    var storage = window.localStorage;
    userId = storage.getItem('userId');
    if(userId) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/notifications/data/",
            data: "id="+userId,
            dataType: 'json',
            success: function(data){
               if(data.is_active==1) {
                   $('#is_active').val(data.is_active).prop('checked', 'checked');
               }
               if(data.type_g==1) {
                   $('#type_g').val(data.type_g).prop('checked', 'checked');
               }
                if(data.type_s==1) {
                    $('#type_s').val(data.type_s).prop('checked', 'checked');
                }
                if(data.type_sm==1) {
                    $('#type_sm').val(data.type_sm).prop('checked', 'checked');
                }
                if(data.regions !=''){
                    $('#region_id').html(data.regions);
                    if(data.region_id!='')
                        $("#region_id [value='"+data.region_id+"']").attr("selected", "selected");
                }
            }
        });
    }
    else
        window.location = 'login.html';
});

function saveSettings() {
    $.ajax({
        type: "POST",
        beforeSend: function(){/*SpinnerDialog.show();*/},
        url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/notifications/savesettings",
        data: "id="+userId+"&is_active="+$('#is_active').val()+"&region_id="+$('#region_id :selected').val()+'&type_g='+$('#type_g').val()+"&type_s="+$('#type_s').val()+"&type_sm="+$('#type_sm').val(),
        success: function(msg){
            if(msg=='success') {
                // SpinnerDialog.hide();
                navigator.notification.alert(
                    'Все ваши данные были успешно сохранены.',  // message
                    function(){},         // callback
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