$(document).ready(function(){

    var storage = window.localStorage;
    userId = storage.getItem('userId');

    if(userId) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/order/my/",
            data: "uid="+userId,
            //dataType: 'json',
            success: function(data){
                $('#order-list').html(data);
            }
        });
    }
    else
        window.location = 'login.html';

})