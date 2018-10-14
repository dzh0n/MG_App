//id = window.location.hash.substr(1);
$(document).ready(function(){

    var storage = window.localStorage;
    userId = storage.getItem('userId');

    id = window.location.hash.substr(1);

    if(id > 0) {
        $('.nav-bar-wrap span').text( $('.nav-bar-wrap span').text() + id);

        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/order/view/",
            data: "id="+id+"&uid="+userId,
            //dataType: 'json',
            success: function(data){
                $('#order-more').html(data);
                $('.starex-css').barrating({
                    theme: 'css-stars',
                    showSelectedRating: false,
                    readonly: true
                });
                $('.toggle-offer').on('click', function(){
                    $(this).toggle();
                    $('.offer-form').toggle();
                    return false;
                });
            }
        });

    }


});

function sendOffer() {
    error = false;

    if($('#price').val()=='') {
        $('#price').parent('div').addClass('error');
        error = true;
    }
    else {
        $('#price').parent('div').removeClass('error');
    }
    if($('#comment').val()=='') {
        $('#comment').parent('div').addClass('error');
        error = true;
    }
    else {
        $('#comment').parent('div').removeClass('error');
    }

    if(error == false) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/order/offer/",
            data: "id="+id+"&uid="+userId+"&price="+$('#price').val()+"&comment="+$('#comment').val(),
            dataType: 'json',
            success: function(data){
                if(data.result=='error') {
                    navigator.notification.alert(
                        data.errors,  // message
                        function(){},         // callback
                        'При добавлении возникли ошибки',            // title
                        'Ok'                  // buttonName
                    );
                }
                if(data.result=='success'){
                    navigator.notification.alert(
                        'После проверки оно будет опубликовано, а заказчик уведомлен о вашем предложении',  // message
                        function(){ window.location.reload()},         // callback
                        'Ваше предложение к заказу принято',            // title
                        'Ok'                  // buttonName
                    );
                }
            }
        });
    }

    return false;
}

function showPhone(id) {
    $.ajax({
        type: "POST",
        url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/order/showphone/",
        data: "id="+id+"&uid="+userId,
        //dataType: 'json',
        success: function(data){
            $.fancybox.open(data);

        }
    });
}

function loadPhone(id) {
    $.ajax({
        type: "POST",
        url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/order/loadphone/",
        data: "id="+id+"&uid="+userId,
        //dataType: 'json',
        success: function(data){
            if(data) {
                $('.popup-phone-no-pay').html(data);
            }
        }
    });
}