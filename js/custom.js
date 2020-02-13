$(document).ready(function(e) {
    $(window).load(function() {
        $('.loading').hide()
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 90) {
            $('.header-menu').addClass("change-height")
        } else {
            $('.header-menu').removeClass("change-height")
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1500) {
            $('.scrollup').stop(!0, !0).fadeIn()
        } else {
            $('.scrollup').stop(!0, !0).fadeOut()
        }
    });
    $('.scrollup').click(function() {
        $("html,body,section").animate({
            scrollTop: 0
        }, 1000);
        return !1
    });
    var scrollLink = $('.scroll');
    scrollLink.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000)
    });
});
     
var page = document.getElementById('page');

function slideDown(e) {
    if (e.target.className != 'next') {
        return
    }
    page.onclick = '';
    self = e.target.parentNode;
    var offset = self.getBoundingClientRect();
    var scroll = self.offsetTop;
    page.style.top = (-offset.height - offset.top) + 'px';
    setTimeout(function() {
        page.style.transition = 'none';
        page.style.top = '';
        window.scrollTo(0, offset.height + scroll);
        page.style.transition = transition;
        page.onclick = slideDown
    }, 800)
}
