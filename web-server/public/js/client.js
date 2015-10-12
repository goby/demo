var pomelo = window.pomelo;
var username;
var currentScene;
var player = {};
var game = {};

window.onbeforeunload = function (e) {
    return "游戏正在进行中，请不要重新加载或者离开本也页面，会导致进度丢失";
};

var getParam = function(key) {
    key = key.replace('/[\[]/', '\\[').replace('/[\]]/', '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


pomelo.init({
    host: window.location.hostname,
    port: 3010,
    log: true
}, function(data){
    pomelo.request("connector.resourceHandler.loadResource", { 
        gameId: getParam('game')
    }, function(rsp) {
        console.log(rsp);
        initialize(rsp.data);
    });
});

function initialize(data) {
    game = data.game;
    if (game === undefined) { document.write('未找到当前测试'); return; } 
    if (game.stop != undefined) { document.write('当前测试已结束'); return; } 
    gameId = game.id;
    $('.navbar-brand').text(game.name);
    $('#game-name').text(game.name);
    $('#game-description').text(game.description);
    $('#map').width(game.width)
             .height(game.height)
             .css('position', 'relative')
             .css('background', 'url(/resources/'+ game.background + ')')
             .css('background-size', 'cover')
             .css('margin-left', '50%')
             .css('left', 0-game.width/2)
    pomelo.request("connector.entryHandler.entry", { 
        gameId: game.id
    }, function(rsp) {
        console.log(rsp);
        $('#user-id').text(rsp.code);
        if (rsp.code != 200) {
            //alert(rsp.msg);
        }
        drawMap($('#map'), data.area );
    });
}

function drawMap(map, areas){
    areas.forEach(function(area) {
        var text = $('<text />')
            .attr('x', area.x + area.width / 2)
            .attr('y', area.y + area.height / 2)
            .attr('style', 'font-size: 18px;text-anchor: middle;dominant-baseline:middle')
            .text(area.name);
        var rect = $('<rect />');
        rect.attr('width', area.width)
            .attr('height', area.height)
            .attr('x', area.x)
            .attr('y', area.y)
            .attr('title', area.name)
            .attr('data-id', area.id)
            .attr('style', 'cursor:pointer;fill:transparent;stroke-width:2; stroke:rgb(0,0,0)');
        map.append(text).append(rect);
    });
    map.html(map.html()); // -- 刷新
    $('#map rect').on('click', function(){
        // 
        moveToArea($(this).data('id'), $(this).attr('title'));
    });
}

function moveToArea(areaId, areaName) {
    $('main div[role=scene]').hide();
    showLoading('您正马不停蹄地赶往' + areaName, 1000, function() {
        pomelo.request('connector.areaHandler.goto', {
            pid: player.id, gid: game.id, aid: areaId
        }, function(rsp){
            showArea(rsp.data);
        });
    });
}

function showArea(area) {
    var areaMap = $('#spec-area .area-map');
    areaMap.width(game.width)
           .height(game.height)
           .css('background-size', 'cover')
           .css('background-image', 'url(/resources/' + area.background + ')');
    var eventList = $('.event-list').html('');
    if (area.events == undefined || area.events.length == 0) 
        eventList.html('环顾四周，并没有发现什么');
    else {
        area.events.forEach(function(event) {
            if (event == null) return;
            var ele = $('<div role="event" class="col-xs-4" />');
            var btn = $('<a style="width:100%" class="btn btn-primary btn-lg"/>');
            ele.append(btn.text(event.name))
               .append($('<p/>').text(event.description));
            eventList.append(ele); 
        });
    }
    $('main div[role=scene]').hide();
    $('#spec-area').fadeIn(); 
}

function backHome() {
    $('main div[role=scene]').hide();
    showLoading('正在回公园的路上...', 1000, function() {
        pomelo.request('connector.areaHandler.goto', {
            pid: player.id, gid: game.id, aid: -1
        }, function(rsp){
            showMainArea();
        });
    });
}

function showLogin(){
    $('#loading-message').hide();
    $('#welcome').show();
    $('#main-area').hide();
    $('#time-panel').hide();
}

function showMainArea(){
    $('main div[role=scene]').hide();
    $('#main-area').show();
}

function moveMap(dir) {
    $('#map-other').show();
    $('#map-center').hide();
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

function showLoading(msg, timeout, cb) {
    $('#loading-message').text(msg);
    $('#loading-message').fadeIn();
    setTimeout(function(){ 
        $('#loading-message').fadeOut(cb);
    }, timeout);
}

$(function(){
    //showLogin();
    showMainArea();

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
            showLoading('欢迎' + username + '，你醒来发现地震了', 1000, function(){
                showMainArea();
            });
        })
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
