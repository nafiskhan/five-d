//全屏div设置高度    
$('.dynamic-height').height(document.documentElement.clientHeight);

document.addEventListener("deviceready", function(){
    var accessToken = localStorage.getItem('accessToken'),
        uid = localStorage.getItem('uid'),
        secretKey = '4d02d56162e649a2bd9679779e62871a',
        personalInfo;
    
    setTimeout(function(){
        $('#about').fadeOut();
    }, 3456);
    
    //如果没网就退出
    if( navigator.connection.type === navigator.connection.NONE ) {
        alert('No accessiable network.\n没有可用的网络');
        navigator.app.exitApp();
    }
    
    //补全参数
    function fillParams(a) {
        a['format'] = 'json';
        a['v'] = '1.0';
        a['call_id'] = (new Date()).getTime();
        a['access_token'] = accessToken;
        return a;    
    }
    
    //计算sig
    function calcSig(a, secretKey) {
        var tmp = [];
        a = fillParams(a);
        
        for(var i in a) tmp.push( i+'='+a[i] );
        
        a['sig'] = hex_md5(tmp.sort().join('')+secretKey);
        
        return a;
    }
    
    //API POST请求
    function _post(apiParams, callback, dataType) {
        
        apiParams = calcSig(apiParams, secretKey);
        
        $.post('http://api.renren.com/restserver.do', apiParams, function(e) {
            if(e.error_code) {
                alert(e.error_msg);    
            } else {
                callback(e);
            }
        }, dataType);
        
    }
    
    //获取个人信息
    function getPersonalInfo(uid) {
        _post({
            method: 'users.getProfileInfo',
            fields: ['base_info', 'status', 'visitors_count'].join(','),
            uid: uid
        }, function(e) {
            _post({
                method: 'users.getVisitors',
                page: 1,
                count: 10
            }, function(f) {
                e.visitors = f.visitors;
                personalInfo = e;
            }, 'json');
        }, 'json');
    }
    
    //日志
    $('.log').live('click', function(){
        $('.log-content', this).slideToggle();    
    });
    
    
    //设置选项
    $('#setting-btn').click(function(){
        $('#options').slideToggle();
    });
    $('#about').click(function(){
        $('#about').fadeOut();
    });
    $('#about-5d-btn').click(function(){
        $('#about').show();
        $('#options').hide();
    });
    $('#show-token-btn').click(function(){
        alert(accessToken +'\n'+ uid);
        $('#options').hide();
    });
    $('#exit-btn').click(function(){
        navigator.app.exitApp();
    });
    
    //发送状态
    $('#post-twitter-btn').click(function(){
        $('#post-status').show();
    });
    $('#post-back').click(function(){
        $('#post-status').hide();
    });
    $('#send-btn').click(function(){
        var c = document.getElementById('post-content'), s = $.trim(c.value);
    //    console.log(s);
        if(s.length > 0) {
            _post({
                method: 'status.set',
                status: s
            }, function(e) {
                alert('发送成功！');
                c.value = '';
                $('#post-status').hide();
            }, 'json');    
        }
    });
    
    
    //发照片
    $('#post-photo-back').click(function(){
        $('#post-photo').hide();
    });
    $('#post-photo-btn').click(function(){
        $('#post-photo').show();
    });
    $('#post-photo-tools > a').click(function(){
        var c = {
            quality: 80, 
            destinationType: Camera.DestinationType.FILE_URI
        };
        c.sourceType = this.id.split('-')[0] == 'capture'?
                                Camera.PictureSourceType.CAMERA :
                                Camera.PictureSourceType.PHOTOLIBRARY ;
        navigator.camera.getPicture(function(uri){
            console.log(uri);
            $('#post-photo-img').attr('src', uri);
        }, function(msg){
            alert(msg);
        }, c);                        
                                
    });
    $('#send-photo-btn').click(function(){
        var txt = $('#post-photo-text').val(),
            imageURI = $('#post-photo-img').attr('src');
        
        if ( !txt.length || imageURI.indexOf('default-photo')>=0 ) return ;
            
        var options = new FileUploadOptions(),
            ft = new FileTransfer();
            
            options.fileKey = 'upload';
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1)+'.jpg';
            options.mimeType = 'image/jpg';
            options.params = calcSig({
                method: 'photos.upload',
                caption: txt
            }, secretKey);
    
            ft.upload(imageURI, 'http://api.renren.com/restserver.do', function(r){
                try{
                    console.log(r.response);
                    var e = $.parseJSON(r.response);
                    if(e.error_code) {
                        alert('发送失败!('+e.error_msg+')');
                    } else {
                        alert('发送成功!');
                    }
                } catch(e) {
                    alert('发送失败!('+e.description+')');
                } finally {
                    $('#post-photo').hide();
                    $('#post-photo-text').val('');
                    $('#post-photo-img').attr('src', 'img/default-photo.png');
                }
            }, function(r){
                alert("An error has occurred: Code = " = error.code);
            }, options);
    
    });
    
    
    //main按钮
    $('.header-btn').click(function(){
        var moduleName = this.id.split('-')[0];
        $('.header-btn').removeClass('active');
        $(this).addClass('active');
        $('.main-content').hide();
        $('#'+moduleName).show();
        
        switch(moduleName) {
            case 'person':
                getPersonalInfo(uid);
                var t = setInterval(function(){
                    if(personalInfo != undefined) {
                        clearInterval(t);
                        $('#person-btn').html(personalInfo.name);
                        $('#person').html(Mustache.render(jsTpl.person, personalInfo));
                    }
                }, 555);
                break;
            case 'friends':
                _post({
                    method: 'friends.getFriends'
                }, function(e) {
                    $('#friends').html(Mustache.render(jsTpl.friends, { friends : e }));
                }, 'json');
                break;
            case 'albums':
                _post({
                    method: 'photos.getAlbums',
                    uid: uid
                }, function(e) {
                    var n = e.length, m = Math.floor(n/2);
                    $('#albums').empty()
                                .append(Mustache.render(jsTpl.albums, { albums :  e.slice(0, m)}))
                                .append(Mustache.render(jsTpl.albums, { albums :  e.slice(m+1, n-1)}));
                }, 'json');
                break;
            case 'timeline': 
                _post({
                    method: 'feed.get',
                    type: [10, 20, 21, 30, 32].join(','),
                    uid: uid,
                    page: 1,
                    count: 20
                }, function(e) {
//                    $('#timeline').html(e);
                    $('#timeline').empty();
                    for(var i = 0; i < e.length; i++) {
                        $('#timeline').append(Mustache.render(jsTpl.feed[e[i].feed_type], e[i]));
                    }
                }, 'json');
                break;
            case 'logs': 
                _post({
                    method: 'blog.gets',
                    uid: uid,
                    page: 1,
                    count: 20
                }, function(e) {
                    $('#logs').empty().html(Mustache.render(jsTpl.logs, e));
                }, 'json');
                break;       
        }
        
    });
    
    
    //backButton
    document.addEventListener("backbutton", function(){
        $('.layer').hide();
    }, false);
    //menuButton
    document.addEventListener("menubutton", function(){
        $('#setting-btn').click();
    }, false);
    
    //extra-Layer
    $('#extra-layer-back').click(function(){
        $('#extra-layer').hide();    
    });
    
    //单篇日志
    $('.log-entire-btn').live('click' ,function(){
        _post({
            method: 'blog.get',
            id: this.lang,
            uid: uid,
            comment: 30
        }, function(e) {
            $('#extra-layer-title').html(e.title);
            $('#extra-layer-content').html(Mustache.render(jsTpl.log, e));
            $('#log-content').html(e.content);
            $('#extra-layer').show();
        }, 'json');
        return false;
    });
    
    
    //初始化检测
    if(!accessToken) {
        location.href = 'login.html';    
    } else if(!uid) {
        _post({
            method: 'users.getLoggedInUser'
        }, function(e) {
            localStorage.setItem('uid', e.uid);
            location.href = 'index.html';
        }, 'json');
    }else {
        $('#timeline-btn').click();
    }
    
}, false);