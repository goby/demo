var pomelo = window.pomelo;
var username;

pomelo.init({
    host: window.location.hostname,
    port: 3010,
    log: true
}, function(data){
    pomelo.request("connector.resourceHandler.loadResource", function(data) {
        console.log(data);
    });
});

function showLogin(){
    $('#loading-message').hide();
    $('#welcome').show();
    $('#main-area').hide();
    $('#time-panel').hide();
}

function showMainArea(){
    $('#loading-message').hide();
    $('#welcome').hide();
    $('#main-area').show();
    $('#time-panel').show();
    $('#map-other').hide();
}

function moveMap(dir) {
    $('#map-other').show();
    $('#map-center').hide();
}
function backHome(dir) {
    $('#map-other').hide();
    $('#map-center').show();
}

function updateStatus(target, val, limit) {
    var ctlLimit = $('.' + target + ' .progress-bar:last');
    var ctlValue = $('.' + target + ' .progress-bar:first');
    ctlLimit.css('width', limiti+'%');
    ctlValue.css('width', val+'%');
}

function toTime(v) {
    var m = parseInt(v/60);
    if (m<10) m = '0'+m;
    var s = v%60;
    if (s<10) s = '0'+s;
    return m+':'+s;
}

function updateTime(current, total) {
    var value = current/total * 100 + '%';
    $('#time-panel .progress-bar').css('width', value);
    $('#time-panel .tick').text(toTime(current));
}

function showWelcome(msg, timeout, cb) {
    $('#loading-message').text(msg);
    $('#loading-message').fadeIn();
    setTimeout(function(){ 
        $('#loading-message').fadeOut(cb);
    }, timeout);
}

$(function(){
    showLogin();

    var lasttime = 900;
    setInterval(function(){updateTime(lasttime, 900); lasttime -= 1;}, 1000); 

    $('#user-login').click(function(){
        var control = $('#user-name')
        username = control.val()
        if (username == ''){
            control.parent().addClass('has-error')
            control.focus();
            return;
        }
        $('[role=user]').html(username)
        $('#welcome').fadeOut(function(){
            showWelcome('欢迎' + username + '，你醒来发现地震了', 1000, function(){
                showMainArea();
            });
        })
    });

    $('#downtown a').click(function(){
        var self = $(this);
        moveMap();        
    });

    $('#backHome').click(function(){
        backHome();
    });

    // -- pomelo event listening --
    pomelo.on('onAdd', function(data){
        //
    });

    pomelo.on('onStart', function(data) {
        updateStatus('health', data.health.val, data.health.limit)
        updateStatus('food', data.food.val, data.food.limit)
        updateStatus('water', data.water.val, data.water.limit)
        updateTime(data.time.now, data.time.total)
    });
});
