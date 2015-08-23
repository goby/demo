var pomelo = window.pomelo;
var username;

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
}

function updateStatus(target, val, limit) {
    var ctlLimit = $('.' + target + ' .progress-bar:last');
    var ctlValue = $('.' + target + ' .progress-bar:first');
    ctlLimit.css('width', limiti+'%');
    ctlValue.css('width', val+'%');
}

function updateTime(current, total) {
    var value = current/total * 100 + '%';
    $('#time-panel .progress-bar').css('width', value);
    $('#time-panel .tick').text(int(current/60)+':'+int(current%60));
}

function showWelcome(msg, timeout, cb) {
    $('#loading-message').text(msg);
    $('#loading-message').fadeIn();
    setTimeout(function(){ 
        $('#loading-message').fadeOut(cb);
    }, timeout);
}

function queryEntry(uid, callback) {
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
        host: window.location.hostname,
        port: 3010,
        log: true
    }, function() {
        pomelo.request(route, {
            uid: uid
        }, function(data) {
            pomelo.disconnect();
            if(data.code === 500) {
                showError(LOGIN_ERROR);
                return;
            }
            callback(data.host, data.port);
        });
    });
}

$(function(){
    showLogin();
    //showMainArea();

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

    $('#main-area a').click(function(){
        var self = $(this);
        
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
