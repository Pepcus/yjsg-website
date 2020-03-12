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
    // var renderJOpage = function (data) {
    //     studyMaterial(data.studyMaterial);
    // };
    //
    // var fetchStudyMaterial = function () {
    //     $.ajax({
    //         url: 'study-material.json',
    //         dataType: 'json',
    //         success: function( data ) {
    //             renderJOpage(data);
    //         },
    //         error: function( data ) {
    //             alert("ERROR: Not received JSON file  " + data );
    //             $("#error-wrapper").css("display","none");
    //             renderErrorPage();
    //         }
    //     });
    // };
// start
//     fetchStudyMaterial();
    // var studyMaterial = function (studyMaterial) {
    //     for (var i = 0; i < studyMaterial.length; i++) {
    //         var bookList = "";
    //         var books = studyMaterial[i].books;
    //         for (var j = 0; j < books.length; j++) {
    //             bookList += "<div><a target='_blank' href='"+books[j].bookLink+"'><svg viewBox=\"0 0 12.600000381469727 12.40000057220459\">\n" +
    //               "<path d=\"M12.1 0h-9c-.3 0-.5.2-.5.5s.2.5.5.5h7.8L.2 11.6c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0\n" +
    //               ".4-.1L11.6 1.7v7.8c0 .3.2.5.5.5s.5-.2.5-.5v-9c0-.3-.2-.5-.5-.5z\"></path>\n" +
    //               "</svg></a>"+ books[j].bookName +"</div>";
    //         }
    //         var bookHTML = $(
    //           '<div class="panel panel-default">' +
    //           '<div class="panel-heading" role="tab" id="heading' + studyMaterial[i].id + '">' +
    //           '<h4 class="panel-title">' +
    //           '<a role="button" class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + studyMaterial[i].id + '" aria-expanded="true" aria-controls="collapse' + studyMaterial[i].id + '">' + studyMaterial[i].name +
    //           '</a>' +
    //           '</h4>' +
    //           '</div>' +
    //           '<div id="collapse' + studyMaterial[i].id + '" class="panel-collapse collapse" role="tabpane" aria-labelledby="heading' + studyMaterial[i].id + '">' +
    //           '<div class="panel-body">' +
    //           bookList +
    //           '</div>' +
    //           '</div>' +
    //           '</div>'
    //         );
    //         $("#accordion").append(bookHTML);
    //     }
    // };

    // var studyMaterial = function (studyMaterial) {
    //         for (var i = 0; i < studyMaterial.length; i++) {
    //             var bookList = "";
    //             var books = studyMaterial[i].books;
    //             for (var j = 0; j < books.length; j++) {
    //                 bookList += "<li><div><a target='_blank' href='"+books[j].bookLink+"'>"+ books[j].bookName +"<svg viewBox=\"0 0 12.600000381469727 12.40000057220459\">\n" +
    //                   "<path d=\"M12.1 0h-9c-.3 0-.5.2-.5.5s.2.5.5.5h7.8L.2 11.6c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0\n" +
    //                   ".4-.1L11.6 1.7v7.8c0 .3.2.5.5.5s.5-.2.5-.5v-9c0-.3-.2-.5-.5-.5z\"></path>\n" +
    //                   "</svg></a></div></li>";
    //             }
    //             var bookHTML = $(
    //             "<div class='study-card-col'>"+
    //                 "<div class='study-card-item'>"+
    //                     "<div class='study-card-wrapper'>"+
    //                         "<div class='study-card-header " + studyMaterial[i].class +"'>"+
    //                             "<h4>" + studyMaterial[i].name +"</h4>"+
    //                         "</div>"+
    //                         "<div class='study-card-body'>"+
    //                         "<p></p>"+
    //                         "<ul>"+
    //                             bookList+
    //                         "</ul>"+
    //                         "</div>"+
    //                     "</div>"+
    //                 "</div>"+
    //             '</div>'
    //             );
    //             $("#study-card-detail").append(bookHTML);
    //         }
    //     };
});

