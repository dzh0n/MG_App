$(document).ready(function () {
    var storage = window.localStorage;
    userId = storage.getItem('userId');

    $('#type').on('change', function() {
        if($(this).val()==1){
            $('#label-from').text('Адрес проведения работ');
            $('#to-block').hide();
        }
        else {
            $('#label-from').text('Откуда');
            $('#to-block').show();
        }
    });
    $('#address_from').autocomplete({
        serviceUrl: 'https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/service/tocity',
        minChars: 2,
        autoSelectFirst: true,
        onSelect: function (suggestion) {
            //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
            $('#address_from_id').val(suggestion.data);
        }
    });
    $('#address_to').autocomplete({
        serviceUrl: 'https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/service/tocity',
        minChars: 2,
        autoSelectFirst: true,
        onSelect: function (suggestion) {
            $('#address_to_id').val(suggestion.data);
        }
    });
});

function addOrder() {
    error = false;

    if($('#address_from').val()=='') {
        $('#address_from').parent('div').addClass('error');
        error = true;
    }
    else {
        $('#address_from').parent('div').removeClass('error');
    }
    if($('#address_from_id').val()=='') {
        $('#address_from').parent('div').addClass('error');
       // if($('#address_from').val()!='') alert('Пожалуйста выбирайте адреса из списка');
        error = true;
    }
    else {
        $('#address_from').parent('div').removeClass('error');
    }

    if($('#type :selected').val() != 1) {

        if($('#address_to').val()=='') {
            $('#address_to').parent('div').addClass('error');
            error = true;
        }
        else {
            $('#address_to').parent('div').removeClass('error');
        }

        if($('#address_to_id').val()=='') {
            $('#address_to').parent('div').addClass('error');
            error = true;
        }
        else {
            $('#address_to').parent('div').removeClass('error');
        }

    }

    if($('#content').val()=='') {
        $('#content').parent('div').addClass('error');
        error = true;
    }
    else {
        $('#content').parent('div').removeClass('error');
    }

    if($('#date_start').val()=='') {
        $('#date_start').parent('div').addClass('error');
        error = true;
    }
    else {
        $('#date_start').parent('div').removeClass('error');
    }

    if(error == false) {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/order/add/",
            data: "uid="+userId+"&type="+$('#type :selected').val()+"&address_from="+$('#address_from').val()+"&address_from_id="+$('#address_from_id').val()+"&address_to="+$('#address_to').val()+"&address_to_id="+$('#address_to_id').val()+"&content="+$('#content').val()+"&date_start="+$('#date_start').val()+"&date_finish="+$('#date_finish').val(),
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
                        'Ваш заказ успешно принят, после проверки он будет опубликован.',  // message
                        function(){ window.location.reload()},         // callback
                        'Ваш заказ принят',            // title
                        'Ok'                  // buttonName
                    );
                }
            }
        });
    }

    return false;
}
