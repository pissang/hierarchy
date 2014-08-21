define(function(require) {

    if (typeof(console) !== 'undefined' && console.log) {
        console.log(require('text!./asciiLogo.txt'));
        console.log('\n\n\n%chttp://echarts.baidu.com', 'font-size:14px;');
    }

    var hierarchy = require('./hierarchy');
    var log = require('./log');

    var data;

    //人物搜索
    function searchUser(query){
        //检索数据
        var users = [];
        if(query.replace(/(^\s*)|(\s*$)/g, "") == ""){
            users = data.nodes;
        }else{
            for(var i in data.nodes){
                var u = data.nodes[i];
                if(u.name.toLowerCase().indexOf(query.toLowerCase())>=0){
                    users.push(u);
                }
            }
        } 

        //生成img list
        var li_list = [];
        for(var i in users){
            var u = users[i];
            li_list.push('<li><a href="javascript:;"><img src="'+ u.logo_image +'" alt="'+ u.name +'" /></a></li>');
        }
        li_list.push('<li><a href="#"></a></li>');

        var html = '<ul id="carousel" class="elastislide-list">';
        html = html + li_list.join();
        html = html + "</ul>";

        $("#img-scroll-list").html(html); 

        $('#carousel').elastislide( {
            minItems : 2,
            speed: 0.5,
            easing: 'ease-out'
        });

    }

    //人物精确匹配
    function loadUserData(usrName){
        var user = false;
        for(var i in data.nodes){
            var u = data.nodes[i];
            if(u.name == usrName){
                user = u;
                break;
            }
        } 

        return user; 
    }

    //弹窗
    function popup(usrName, color){
        var u = loadUserData(usrName);   
        if (u) {
            $("#dialog_name").html(u.name);
            $("#dialog_title").html(u.long_title);
            $("#dialog_img_url0").attr("href",u.video_url);
            $("#dialog_img_url1").attr("href",u.video_url);
            $("#dialog_more").attr("href",u.baike_url);
            //$("#dialog_img").attr("",u.photo);
            $("#dialog_description").html(u.description.substring(0,200));

            $("#modalDialog_kg_iceb").css("background-color", color);
            
            $("#dialog_img_url0 img").attr("src",u.video_image);
            //调用弹窗
            $('#modalDialog_kg_iceb').modal({
                keyboard: true
            });
        } 
    }

    return {
        start: function(_data) {
            
            data = _data;

            searchUser('');

            hierarchy.start(_data, "李彦宏");

            hierarchy.popup = popup;

            // Search
            var timeout;
            var prevVal;
            $(".search input").bind('keydown', function() {
                clearTimeout(timeout);
                var $this = $(this);
                setTimeout(function() {
                    if ($this.val() !== prevVal) {
                        searchUser($this.val())
                        prevVal = $this.val();
                    }
                }, 100);
            });
            $("#img-scroll-list").delegate("li","click", function(){
                var name = $(this).find('img').attr('alt');
                hierarchy.moveTo(name);
            });

            $('.footer .toggle-btn').bind('click', function() {
                $footer = $('.footer');
                $footer.toggleClass('active');
                if ($footer.hasClass('active')) {
                    $(this).html('Close');
                } else {
                    $(this).html('Open');
                }
            })
        }
    }
});