$(document).ready(function(e) {
    $(window).load(function() {
        $('.loading').hide()
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 90) {
            $('.header-menu').addClass("change-height");
            $('.tab-menu').addClass("change-height");
        } else {
            $('.header-menu').removeClass("change-height");
            $('.tab-menu').removeClass("change-height");
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
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

function openRegPopUp() {
    $('#regSideButton').addClass('active');
    $('#gegPopUP').addClass('active');
}

function closeRegPopUp() {
    $('#regSideButton').removeClass('active');
    $('#gegPopUP').removeClass('active');
}



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

// ----------------------------- StudyMaterial start-------------------------------------

$(function () {
});

$('#click').click(function()
{
    $("#panel").toggle();
});
$('.close').click(function (e) {
    $("#panel").toggle();
});
$('.round').click(function(e) {
    $('.arrow1').toggleClass('bounceAlpha');
});



function regopenNav() {

    document.getElementById("regmyNav").style.width = "100%";
}

function regcloseNav() {
    document.getElementById("regmyNav").style.width = "0%";
}

$('.rreg-button-container11').on('click',function () {
    $(this).addClass("change-height");
})

$(function () {
    var html = "<div class='outer'>" +
      "<div id='big' class='owl-carousel owl-theme'>"+
      "</div>"+
      "<div id='thumbs' class='owl-carousel owl-theme'>"+
      "</div>"+
      "</div>"
    $('#photoGallery').append(html);
});
