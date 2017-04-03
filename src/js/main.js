'use strict';
$(function() {
    function resize() {
        // 获取屏幕宽度
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;
        $('#main_ad > .carousel-inner > .item').each(function(i, item) {
            var $item = $(item);
            var imgSrc =
                isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="" />');
            } else {
                $item.empty();
            }
        });
    }
    $(window).on('resize', resize).trigger('resize');

    $('[data-toggle="tooltip"]').tooltip();

    var $ulContainer = $('.nav-tabs');
    var width = 30;
    $ulContainer.children().each(function(index, element) {
        width += element.clientWidth;
    });
    if (width > $(window).width()) {

        $ulContainer
            .css('width', width)
            .parent().css('overflow-x', 'scroll');
    }

    var $newTitle = $('.news-title');
    $('#news .nav-pills a').on('click', function() {
        var $this = $(this);
        var title = $this.data('title');
        $newTitle.text(title);
    });

    var $carousels = $('.carousel');
    var startX, endX;
    var offset = 50;
    $carousels.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $carousels.on('touchmove', function(e) {
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend', function(e) {
        var distance = Math.abs(startX - endX);
        if (distance > offset) {
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    });
});
