/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        //navigator.vibrate([1000, 1000, 3000, 1000, 2000]);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      /*  var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);   */
    }
};




document.addEventListener("deviceready", function(){
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#ffdd0a");

        setInterval(function() {
            getPush();
        }, 1000*60);

        cordova.plugins.notification.local.on("click", function (notification) {
            if(parseInt(notification.data.typePush) < 3) {
                window.location = 'order.html#'+notification.id;
            }
        });

    }

});

$(document).ready(function () {

   /* PullToRefresh.init({
        mainElement: 'body',
        onRefresh: function(){
            // What do you want to do when the user does the pull-to-refresh gesture
        },
        distThreshold : 50, // Minimum distance required to trigger the refresh.
        iconArrow: '<span class="fa fa-arrow-down"></span>', // The icon for both instructionsPullToRefresh and instructionsReleaseToRefresh
        instructionsPullToRefresh: "",
        instructionsReleaseToRefresh: ""
    });*/
   $('.active-cat').on('click', function () {
       $('.sub-cats').slideToggle();
   });
    $('#owner-links-btn').on('click', function(){
        location.replace($('#owner-links').val());
        return false;
    });
    var storage = window.localStorage;
    userId = storage.getItem('userId');
    //alert(userId);
    if(userId) {
        $('#main-right-btn').attr('href','add.html').html('<i class="fas fa-plus"></i>');
        $('.no-login-menu').hide();
    }
    else {
        $('.if-login-menu').hide();
    }


    var position = $(window).scrollTop();

// should start at 0

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > position) {
            if($('body').hasClass('sub')) {
               // $('.nav-bar-wrap').animate({height:'0px'},200);
              //  $('.nav-bar.sub').animate({height:'55px'},200);
                $('.nav-bar-wrap').slideUp();
            }
        } else {
            if($('body').hasClass('sub')) {
                $('.nav-bar-wrap').slideDown();
               // $('.nav-bar-wrap').animate({height:'55px'},200);
               // $('.nav-bar.sub').animate({height:'110px'},200);
            }
        }
        position = scroll;
    });


});


function openNav() {
    //
    //document.getElementById("mySidenav").style.width = "250px";
    $('#mySidenav').css('left','0');
    // document.getElementById("main").style.marginLeft = "250px";
    //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    $('body').css('backgroundColor','rgba(0,0,0,0.4)');


}

function closeNav() {
    $('#mySidenav').css('left','-100%');
    //document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
    //document.body.style.backgroundColor = "white";
    $('body').css('backgroundColor','rgba(255,255,255,1)');
}

function logout() {
    var storage = window.localStorage;
    storage.removeItem('userId');
    window.location = 'index.html';
}

function getPush() {
    var storage = window.localStorage;
    userId = storage.getItem('userId');
    if(userId != '') {
        $.ajax({
            type: "POST",
            url: "https://xn----dtbckhdelflyecx2bh6dk.xn--p1ai/mapi/push/",
            data: "uid="+userId,
            dataType: 'json',
            success: function(result){
                if(result.order_id>0) {
                    /*if(result.type_push == 0)
                        title = 'Появился новый заказ';
                    if(result.type_push == 1)
                        title = 'Поступило новое предложение к вашему заказу';*/
                    title = result.title
                    cordova.plugins.notification.local.schedule({
                        id: result.order_id,
                        title: title,
                        text: result.message,
                        data: { typePush:result.type_push },
                        vibrate: true,
                        lockscreen: true,
                        led: "FFFFFF",
                    });
                }
            }
        });
    }
}
