$(document).ready(function(){

    var storage = window.localStorage;
    userId = storage.getItem('userId');

        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/order/all/",
            data: "uid="+userId+'&order_type='+orders_type,
            //dataType: 'json',
            success: function(data){
                $('#order-list').html(data);
            }
        });



})