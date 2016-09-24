var base = {
    setup: function () {
        base.setupSwipers();
        base.setupPopuperMask();
        base.setupSwitcher();
        base.setupSlider();
    },

    //
    // ─── SWIPERS ────────────────────────────────────────────────────────────────────
    //

        
    setupSwipers: function () {
        var slices = $(".swiper-slide");
        var swiperResult = new Swiper('.swiper-container', {
            // direction: 'vertical',
            loop: true,
            autoplay: (slices.length > 1) ? 3000 : 0,
            speed: 300,

            // 如果需要分页器
            pagination: ".swiper-pagination",
            paginationClickable: true

            // 如果需要前进后退按钮
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',

            // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
        });
        // $(".swiper-container .swiper-slide a").show();
    },

    //
    // ─── NAVANDPAGES ────────────────────────────────────────────────────────────────
    //

    setupNavAndPages: function (navSelector, pageSelector) {
        var tabs = $(navSelector);
        var pages = $(pageSelector);

        // if(tabs.length != pages.length) return;
        if (tabs.length == 0) return;

        for (var i = 0; i < tabs.length; i++) {
            var t = tabs[i];
            var p = pages[i];

            t.__navPages__ = new Object();
            t.__navPages__.tabs = tabs;
            t.__navPages__.pages = pages;
            t.__navPages__.index = i;
            t.__navPages__.page = p;
        }
        tabs.click(base.navTabOnClick);
        base.switchNavPage(0, tabs, pages);
    },
    navTabOnClick: function (e) {
        var t = e.currentTarget;
        var o = t.__navPages__;
        base.switchNavPage(o.index, o.tabs, o.pages);
        return false;
    },
    switchNavPage: function (index, tabs, pages) {
        for (var i = 0; i < tabs.length; i++) {
            var t = tabs[i];
            var p = pages[i];

            if (i == index) {
                $(p).attr("class", "active");
                $(t).attr("class", "active");
            }
            else {
                $(p).attr("class", "");
                $(t).attr("class", "");
            }
        }
    },


    //
    // ─── POPUPER ────────────────────────────────────────────────────────────────────
    //

        
    openPopuper:function(selector){
        var o = $(selector);
        if(o.length == 0) return;

        $("#popuperContainer").append(o[0]);
        $("#popuper").show();
        $("#popuperMask").fadeIn();

        //prop, speed, easing, callback 
        $(o).css("height", 0);
        $(o).animate({height:200}, 1000, "bounceEaseOut");

    },
    closePopuper: function(e){
        if(e.currentTarget != e.target) return false;

        var o = $("#popuperContainer>DIV");
        if(o.length == 0) return false;
        
        $("#popuperClosed").append(o[0]);
        $("#popuper").hide();
        $("#popuperMask").fadeOut();
        return false;
    },
    setupPopuperMask: function(){
        $("#popuperContainer").on("touchstart", base.closePopuper);
        $("#popuperContainer").mousedown(base.closePopuper);
    },


    //
    // ─── SWITCHER ───────────────────────────────────────────────────────────────────
    //

        
    setupSwitcher: function(){
        var selector = ".switcher";
        var switchers = $(selector);

        for(var i = 0; i < switchers.length; i ++)
        {
            var s = switchers[i];

            var so = new Object();
            var c = $(s).attr("checked");
            if(c)
            {
                so.checked = true;
                $("B", s).css("opacity", 1);
                $("A", s).css("left", 19);
            }
            else
            {
                so.checked = false;
                $("B", s).css("opacity", 0);
                $("A", s).css("left", 1);
            }
            s.__switcher__ = so;
        }
        switchers.click(base.switcherOnClick);
    },
    
    switcherOnClick: function(e)
    {
        var s = e.currentTarget;
        var so = s.__switcher__;

        so.checked = !so.checked;

        var so_a = $("A", s);
        var so_b = $("B", s);

        if(so_a.length < 1 && so_b.length < 1) return false;

        so_a = so_a[0];
        so_b = so_b[0];

        if(so.checked)
        {
            $(so_a).stop();
            $(so_a).animate({left: 19},500, "quintEaseOut");

            $(so_b).stop();
            $(so_b).animate({opacity: 1},500, "quintEaseOut");
        }
        else
        {
            $(so_a).stop();
            $(so_a).animate({left: 1},500, "quintEaseOut");
            $(so_b).stop();
            $(so_b).animate({opacity: 0},500, "quintEaseOut");
        }

        return false;
    },

    //
    // ─── TSLIDER ─────────────────────────────────────────────────────────────────────
    //  
    setupSlider: function()
    {
        var selector = ".tslider";
        var instances = $(selector);
        if(instances.length == 0) return;

        for(var i = 0; i < instances.length; i ++)
        {
            var ins = instances[i];
            base.setupSliderInstance(ins);
        }
    },
    setupSliderInstance: function(target)
    {
        var innerHtml = "<div class='track'></div><div class='rate'></div><div class='thumb'></div>";
        $(target).html(innerHtml);
        var valuesSetting = new String($(target).attr("values"));
        var values = valuesSetting.split(",");
        var step = 100.0 / (values.length - 1);

        target._slider_ = new Object();
        target._slider_.step = step;
        target._slider_.values = values;

        for(var i = 0; i < values.length; i++)
        {
            var stepItem = "<div class='item' style='left:" + (step * i) + "%'><b></b><i>" + values[i] + "</i></div>"; 
            $(target).append(stepItem);
        }

        base.sliderChangeValue(target, 0.5, true);
    },
    sliderOnDown: function(e)
    {
        return false;
    },
    sliderOnUp: function(e)
    {
        return false;
    },
    slierOnMove: function(e)
    {
        return false;
    },
    sliderChangeValue: function(target, value, noAnim)
    {
        var offset = 16;
        var w = $(target).width();
        var tag = target._slider_;

        if(value > 1) value = 1;
        if(value < 0) value = 0;

        $("div.thumb", target).css("left", (value * w - offset).toString()+"px");
        $("div.rate", target).css("width", (value * w).toString()+"px");

        var index = base.sliderSelectItem(target, value);
        var items = $("div.item", target);

        for(var i = 0; i < items.length; i++)
        {
            var item = items[i];
            if(i == index)
            {
                $(item).attr("class", "item current");
            }
            else
            {
                $(item).attr("class", "item");
            }
        }
    },
    sliderSelectItem: function(target, value) 
    {
        var tag = target._slider_;
        var index = ((tag.values.length - 1) * 1.0) * value;
        var ret = Math.floor(index);
        var offset = index - ret;
        if(offset > 0.5) ret++;

        return ret;
    }

};

$(document).ready(function () {
    base.setup();
    // base.setupNavAndPages("#testNavTabs>LI", "#testNavPages>LI");

    var o = $("button");

    o.click(function(e){
        base.openPopuper("#testPopuper");
        return false;
    });
});


