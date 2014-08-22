define(function(require) {

    require('../lib/es5shim');

    var zrEvent = require('zrender/tool/event');

    if (typeof(console) !== 'undefined' && console.log) {
        console.log(require('text!./asciiLogo.txt'));
        console.log('\n\n\n%chttp://echarts.baidu.com', 'font-size:14px;');
    }

    var hierarchy = require('./hierarchy');
    var log = require('./log');

    var data;

    // 展现日志
    log('zhishitupuse', '');

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

        if (''.localeCompare) {
            users.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });   
        }
        //生成img list
        var li_list = [];
        for(var i in users){
            var u = users[i];
            li_list.push('<li>\
                <a href="javascript:;">\
                    <img src="'+ u.logo_image +'" alt="'+ u.name +'" />\
                </a>\
                <span class="title">' + u.name + '</span>\
            </li>');
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

        log('zhishitupuclick', usrName);

        var u = loadUserData(usrName);
        if (u) {
            $("#dialog_name").html(u.name);
            $("#dialog_title").html(u.long_title || '');
            if (u.description.length > 200) {
                var description = u.description.substring(0, 200) + '…';
            } else {
                var description = u.description;
            }
            $("#dialog_description").html(description);

            $("#modalDialog_kg_iceb").css("background-color", color);
            
            // Reset
            $("#dialog_img_url0 img").attr("src", '');
            $("#dialog_img_url0").attr("href", '#');
            $("#dialog_img_url0").attr("target", '_self');
            $("#dialog_img_url1").hide();
            $("#dialog_video_tumb").hide();
            if (u.video_image) {
                $("#dialog_img_url0 img").attr("src", u.video_image);
                $('#dialog_video_tumb').show();
                
                if (u.video_url) {
                    $("#dialog_img_url0").attr("href",u.video_url);
                    $("#dialog_img_url0").attr("target", '_blank');
                    $("#dialog_img_url1").attr("href",u.video_url);
                    $("#dialog_img_url1").show();
                }
            }

            if (u.baike_url) {
                $("#dialog_more").attr("href",u.baike_url).show();
            } else {
                $("#dialog_more").hide();
            }
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

            var referName = document.referrer;
            var result = referName.match(/s?wd=(.+?)&/);
            if (!result) {
                result = referName.match(/s?wd=(.+?)$/);
            }
            var mainNode = '冰桶挑战';
            if (result) {
                result[1] = decodeURIComponent(result[1]);
                for (var i = 0; i < data.nodes.length; i++) {
                    if (!data.nodes[i]) {
                        continue;
                    }
                    if (data.nodes[i].name === result[1]) {
                        mainNode = result[1];
                    }
                }
            }

            hierarchy.start(_data, mainNode);

            hierarchy.popup = popup;

            for (var name in hierarchy.legends) {
                var legend = hierarchy.legends[name];

                $("#legends").append('\
                    <div class="item">\
                        <label class="color" style="background-color:' + legend.color + '"></label>\
                        <label class="name">' + name + '</label>\
                    </div>\
                ')
            }

            // Search
            var timeout;
            var prevVal;
            $(".search input").bind('keydown', function(e) {
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble = true;
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
                
                log('zhishitupumoveto', name);

                hierarchy.moveTo(name);
            });

            $('.footer .toggle-btn').bind('click', function() {
                $footer = $('.footer');
                $footer.toggleClass('active');
                if ($footer.hasClass('active')) {
                    $(this).html('隐 藏');
                } else {
                    $(this).html('显 示');
                }
            });

            var size = 102;
            var halfSize = size / 2;

            function getDirection(x, y) {
                y = halfSize - y;
                x = x - halfSize;
                var angle = Math.atan(y / x) * 180 / Math.PI;

                if (Math.abs(x) < 0.01) {
                    if (y > 0) {
                        return 'arrow-up';
                    } else {
                        return 'arrow-down';
                    }
                } else if (x > 0) {
                    if (angle < 45 && angle > -45) {
                        return 'arrow-right';
                    } else if (angle > 45) {
                        return 'arrow-up';
                    } else {
                        return 'arrow-down';
                    }
                } else {
                    x = -x;
                    if (angle < 45 && angle > -45) {
                        return 'arrow-left';
                    } else if (angle > 45) {
                        return 'arrow-down';
                    } else {
                        return 'arrow-up';
                    }
                }
            }
            var $arrows = $('#control .move>div');
            $('#control .move-cover')[0].onmousemove = function(e) {
                var x = zrEvent.getX(e);
                var y = zrEvent.getY(e);
                $arrows.removeClass('active');
                $('#' + getDirection(x, y)).addClass('active');
            };
            $('#control .move-cover').mouseout(function() {
                $arrows.removeClass('active');
            });

            $('#control .move-cover')[0].onclick = function(e) {
                var x = zrEvent.getX(e);
                var y = zrEvent.getY(e);

                switch(getDirection(x, y)) {
                    case 'arrow-left':
                        hierarchy.moveLeft();
                        break;
                    case 'arrow-right':
                        hierarchy.moveRight();
                        break;
                    case 'arrow-up':
                        hierarchy.moveTop();
                        break;
                    case 'arrow-down':
                        hierarchy.moveDown();
                        break;
                }
            };

            $("#zoom-in").click(function() {
                hierarchy.zoomIn();
            });
            $("#zoom-out").click(function() {
                hierarchy.zoomOut();
            });

            $(document.body).keydown(function(e) {
                switch(e.keyCode) {
                    case 87: //w
                    case 38: //up arrow
                        hierarchy.moveTop();
                        break;
                    case 83: //s
                    case 40: //down arrow
                        hierarchy.moveDown();
                        break;
                    case 65: //a
                    case 37: //left arrow
                        hierarchy.moveLeft();
                        break;
                    case 68: //d
                    case 39: //right arrow
                        hierarchy.moveRight();
                        break; 
                }
            });
        }
    }
});