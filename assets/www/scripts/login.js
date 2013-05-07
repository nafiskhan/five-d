var oauthUrl = 'https://graph.renren.com/oauth/authorize?',
    _params = {
        client_id : '262a748f33bf47ac867d26cf3a2003e8',
//        redirect_uri : 'http://graph.renren.com/oauth/login_success.html',
        redirect_uri : 'http://lab.hk1229.cn/fivedserver/login_success.php',    
        response_type : 'token',
        display: 'mobile',
        scope: [
            'read_user_blog', 
            'read_user_checkin', 
            'read_user_feed', 
            'read_user_guestbook', 
            'read_user_invitation', 
            'read_user_like_history', 
            'read_user_message', 
            'read_user_notification', 
            'read_user_photo', 
            'read_user_status', 
            'read_user_album', 
            'read_user_comment', 
            'read_user_share', 
            'read_user_request', 
            'publish_blog', 
            'publish_checkin', 
            'publish_feed', 
            'publish_share', 
            'write_guestbook', 
            'send_invitation', 
            'send_request', 
            'send_message', 
            'send_notification', 
            'photo_upload', 
            'status_update', 
            'create_album', 
            'publish_comment', 
            'operate_like'
        ].join(' ')
    },
    realOauthUrl = oauthUrl+$.param(_params);
    
//console.log(realOauthUrl);
    
var $loginFrame = $('#loginFrame').attr('src', realOauthUrl).css('height', $(window).height());

//目前phonegap不支持postMessage
//window.addEventListener('message', function(accessToken){
//    alert('Recived: '+accessToken);   
//    localStorage.setItem('accessToken', accessToken);
//}, false);

var t = setInterval(function(){
    var iframeName = $loginFrame.get(0).contentWindow.name;
    
    if(iframeName == 'login_denied' || iframeName == 'null') {
        clearInterval(t);
        location.href = 'login.html';
        return ;
    }
    
    if(iframeName != undefined && iframeName != null && iframeName != 'loginFrame') {
        clearInterval(t);
        var accessToken = decodeURIComponent(iframeName);
//        alert('Got: '+iframeName);
        localStorage.setItem('accessToken', accessToken);

        location.href = 'index.html';
    }
}, 999);
