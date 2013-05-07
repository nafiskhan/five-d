var jsTpl = {
    'person' : '<table width="100%" border="0"><tr><td rowspan="2"><img src="{{headurl}}" alt="{{name}}"/></td><td><span style="font-size:1.2em;">{{name}}</span><span>({{network_name}})</span></td></tr><tr><td>{{#status}}<span>{{content}}</span><span>{{time}}</span>{{/status}}</td></tr><tr><td colspan="2"><h2>最近来访</h2>{{#visitors}}<table width="100%" border="0"><tr><td rowspan="2"><img src="{{headurl}}" alt="{{name}}"/></td><td><a href="###" lang="{{uid}}">{{name}}</a></td></tr><tr><td>{{time}}</td></tr></table>{{/visitors}}</td></tr></table>',
    'feed' : {
        '10' : '<table class="feed f{{feed_type}}"><tr><td rowspan="3"><img src="{{headurl}}"/><br />{{name}}</td><td>{{prefix}}</td></tr><tr><td class="ori-mark">{{#attachment}}<b>{{owner_name}}</b>:{{content}}{{/attachment}}</td></tr><tr><td>{{update_time}}{{#source}}来自{{text}}{{/source}}</td></tr><tr><td>评({{comments.count}})</td><td>{{#comments.comment}}<table width="100%" border="0"><tr><td><img src="{{headurl}}"/></td><td>{{name}}：{{text}} ({{time}})</td></tr></table>{{/comments.comment}}</td></tr></table>',
        '20' : '<table class="feed f{{feed_type}}"><tr><td rowspan="3"><img src="{{headurl}}"/><br />{{name}}</td><td>{{prefix}}</td></tr><tr><td class="ori-mark"><h3>{{title}}</h3>{{description}}</td></tr><tr><td>{{update_time}}</td></tr></table>',
        '21' : '<table class="feed f{{feed_type}}"><tr><td rowspan="3"><img src="{{headurl}}"/><br />{{name}}</td><td>{{message}}</td></tr><tr><td class="ori-mark"><h3>{{title}}</h3>{{description}}</td></tr><tr><td>{{update_time}}{{#attachment}}  来自:{{owner_name}}{{/attachment}}</td></tr></table>',
        '30' : '<table class="feed f{{feed_type}}"><tr><td rowspan="4"><img src="{{headurl}}"/><br />{{name}}</td><td>{{prefix}}</td></tr>{{#attachment}}<tr><td>{{content}}</td></tr><tr><td><img src="{{src}}"/></td></tr>{{/attachment}}<tr><td>{{update_time}}{{#source}}来自{{text}}{{/source}}</td></tr><tr><td>评({{comments.count}})</td><td>{{#comments.comment}}<table width="100%" border="0"><tr><td><img src="{{headurl}}"/></td><td>{{name}}：{{text}} ({{time}})</td></tr></table>{{/comments.comment}}</td></tr></table>',
        '32' : '<table class="feed f{{feed_type}}"><tr><td rowspan="4"><img src="{{headurl}}"/><br />{{name}}</td><td>{{message}}</td></tr>{{#attachment}}<tr><td>{{content}}</td></tr><tr><td><img src="{{src}}"/></td></tr>{{/attachment}}<tr><td>{{update_time}}{{#attachment}}来自:{{owner_name}}{{/attachment}}</td></tr><tr><td>评({{comments.count}})</td><td>{{#comments.comment}}<table width="100%" border="0"><tr><td><img src="{{headurl}}"/></td><td>{{name}}：{{text}} ({{time}})</td></tr></table>{{/comments.comment}}</td></tr></table>'
    },
    'friends' : '<table width="100%" border="0">{{#friends}}<tr class="friend g{{sex}}"><td><img src="{{tinyurl}}"/></td><td>{{name}} ({{id}})</td></tr>{{/friends}}</table>',
    'albums' : '<div class="albums-column">{{#albums}}<a class="album" href="###" lang="{{aid}}"><img class="album-img" src="{{url}}"/><div class="album-txt">{{name}}</div></a>{{/albums}}</div>',
    'logs' : '{{#blogs}}<div class="log"><a href="###" class="log-entire-btn" lang="{{id}}">entire</a><h3>{{title}}</h3><p class="log-info">{{cate}} | {{time}} | {{comment_count}}/{{view_count}}</p><div class="log-content">{{content}}</div></div>{{/blogs}}',
    'log' : '<div id="log-content"></div>{{#comments}}<table width="100%" border="0"><tr><td><img src="{{headurl}}"/></td><td>{{name}}：{{content}} ({{time}})</td></tr></table>{{/comments}}'

}, 
feedType = {
    '10' : '更新状态的新鲜事',
    '11' : 'page更新状态的新鲜事',
    '20' : '发表日志的新鲜事',
    '21' : '分享日志的新鲜事',
    '22' : 'page发表日志的新鲜事',
    '23' : 'page分享日志的新鲜事',
    '30' : '上传照片的新鲜事',
    '31' : 'page上传照片的新鲜事',
    '32' : '分享照片的新鲜事',
    '33' : '分享相册的新鲜事',
    '34' : '修改头像的新鲜事',
    '35' : 'page修改头像的新鲜事',
    '36' : 'page分享照片的新鲜事',
    '40' : '成为好友的新鲜事',
    '41' : '成为page粉丝的新鲜事',
    '50' : '分享视频的新鲜事',
    '51' : '分享链接的新鲜事',
    '52' : '分享音乐的新鲜事',
    '53' : 'page分享视频的新鲜事',
    '54' : 'page分享链接的新鲜事',
    '55' : 'page分享音乐的新鲜事'
};