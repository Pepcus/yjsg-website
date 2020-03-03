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
        if ($(this).scrollTop() > 400) {
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







// ----------------------------- StudyMaterial end-------------------------------------


// ---------------------------------------shivir card starts------------------------
// var renderOpeningHeader = function(openingTitle) {
//     $.each(openingTitle, function(key, value) {
//         var htmlRender = "<div class = \"heading-section heading-section-with-banner\">" +
//             "<h2>" +
//             value.openingSectionTitle +
//             "</h2>" +
//             "<img src='assets/images/logos/under-heading.png'>"+
//
//             "</div>";
//         $(htmlRender).appendTo("#opening-title-wrapper");
//     });
// };
// var renderModalContent = function(modalContent) {
//
//     $.each(modalContent, function(key, value) {
//         var htmlRenderJobList = "", htmlRenderKeyList = "", htmlRenderSkillList = "";
//         $.each(value.jobDescription, function(key,desc){
//             htmlRenderJobList += "<li>"+desc+"</li>";
//         });
//         $.each(value.keyActivities, function(key,desc){
//             htmlRenderKeyList += "<li>"+desc+"</li>";
//         });
//         $.each(value.keySkills, function(key,desc){
//             htmlRenderSkillList += "<li>"+desc+"</li>";
//         });
//         var htmlRender = "<div id=\""+value.modalContentId+"\" class=\"modal\">" +
//             " <div class=\"modal-content\">" +
//             "  <div class=\"modal-heading\">" +
//             " <span class=\"close modal-close\" onclick=\"closeModal(\'"+value.closeModalText+"\')\">&times</span>" +
//             " <span class=\"font-size-20\">"+value.modalContentHeading+"</span>" +
//             " </div>" +
//             " <div class=\"modal-wrapper\">" +
//             "  <div\">" +
//             " <div class = \"wrapper-text-para\">" +
//             " <h3 class = \"font-size-16 grey-color font-bold\"> "+value.modalLocationHeading+"<span>"+value.modalLocationText+"</span></h3>" +
//             " </div>" +
//             " <div>" +
//             " </div>" +
//             " <div>" +
//             " <h3 class = \"font-size-16 grey-color mar-15-0-10 font-bold\">"+value.jobDescriptionTitle+"</h3>" +
//             " <div class = \"list-block\">" +
//             " <ul class = \"padding-left-50\">" +htmlRenderJobList+
//             " </ul>" +
//             " </div>" +
//             " </div>" +
//             " <div>" +
//             " <h3 class = \"font-size-16 grey-color mar-15-0-10 font-bold\">"+ (value.keyActivitiesTitle ? value.keyActivitiesTitle : '') +"</h3>" +
//             " <div class = \"list-block\">" +
//             "  <ul class = \"padding-left-50\">" +htmlRenderKeyList+
//             "</ul>" +
//             "  </div>" +
//             "  </div>" +
//             "<div>" +
//             " <div class = \"list-block\">" +
//             "<div class=\"container2\">\n" +
//             "<a href = \"https://forms.office.com/Pages/ResponsePage.aspx?id=vr1cVz6rDUuxUtMhGW0KCs_IWa25rr1FlXvOHENkxiVUNjJZMVhDRTg4WEdTWEZIUlQ0MExDR0tPTy4u\" class = \"btn btn-apply white-color text-uppercase font-weight-600\" target = \"_blank\">Apply now</a>"+"</div>"+
//             "</div>"+
//             "</div>" +
//             "</div>" +
//             "</div>" +
//             " </div>" +
//             " </div>";
//
//         $(htmlRender).appendTo("#modal-content-wrapper");
//         // Get the modal
//         // When the user clicks the button, open the modal
//         function openModal(clicked_id) {
//             var modalnew = document.getElementById(clicked_id);
//             modalnew.style.display = "block";
//         }
//         function closeModal(clicked_id) {
//             var modalClose = document.getElementById(clicked_id);
//             modalClose.style.display = "none";
//         }
//         // When the user clicks anywhere outside of the modal, close it
//         window.onclick = function(event) {
//             if (event.target.className === "modal") {
//                 event.target.style.display = "none";
//             }
//         };
//     });
// };
// function toChunkArray(array, chunkSize){
//     var arrayLength = array.length;
//     var chunkArray = [];
//     for (var index = 0; index < arrayLength; index += chunkSize) {
//         chunkArray.push(array.slice(index, index+chunkSize));
//     }
//     return chunkArray;
// }
// var renderOpeningSection = function(openingBlock) {
//     if (window.matchMedia("(max-width: 768px)").matches) {
//         var jobOpeningRows = toChunkArray(openingBlock, 1);
//     } else if (window.matchMedia("(max-width: 992px)").matches) {
//         var jobOpeningRows = toChunkArray(openingBlock, 2);
//     }else {
//         var jobOpeningRows = toChunkArray(openingBlock, 3);
//     }
//     jobOpeningRows.forEach(
//         function (openingRow, index) {
//             var rowLength = openingRow.length;
//             var columnSize = 12 / rowLength;
//             openingRow.forEach(
//                 function(opening) {
//                     var htmlRender =
//                         "<div class='col-sm-"+columnSize+" col-xs-12 col-md-"+columnSize+" col-lg-"+columnSize+" padding-0' style='background-image:url(" + opening.cardImages + ")'>" +
//                         "<div class='job-opening-image card-hover' >" +
//                         "<a onclick=\"openModal(\'" + opening.onclickOpenModal + "\')\" target=\"_self\" >" +
//                         "<div class=\"card\">" +
//                         "<div class = \"card-heading\">" +
//                         "<h2 class = \"font-size-40 card-head-hover font-bold\">" + opening.jobTitle + "</h2>" +
//                         "<p class = \"font-size-28 mar-top-15 card-head-hover\">" + opening.jobExperience + "</p>" +
//                         "<h3 class = \"font-size-20 mar-top-15\">" + opening.jobLocation + "</h3>" +
//                         "<div class = \"card-btn\">" +
//                         "<span class=\"font-size-20\">" + opening.jobBtn + "</span>" +
//                         "<span class=\"register-btn font-size-20\">" + opening.jobBtn1 + "</span>" +
//                         "</div>" +
//                         "</div>" +
//                         "</div>" +
//                         "</a>" +
//                         "</div>" +
//                         "</div>";
//                     $(htmlRender).appendTo("#eventsList");
//                 }
//             );
//         }
//     );
// };
//
// // Get the modal
// // When the user clicks the button, open the modal
// function openModal(clicked_id) {
//     var modalnew = document.getElementById(clicked_id);
//     modalnew.style.display = "block";
//     document.body.style.overflow = "hidden";
// }
// function closeModal(clicked_id) {
//     var modalClose = document.getElementById(clicked_id);
//     modalClose.style.display = "none";
//     document.body.style.overflow = "auto";
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target.className === "modal") {
//         event.target.style.display = "none";
//         document.body.style.overflow = "auto";
//     }
// };
//
// var renderJOpage = function (data) {
//     renderOpeningHeader(data.currentOpeningsTitle);
//     renderModalContent(data.currentOpeningsModalWrapper);
//     renderOpeningSection(data.currentOpeningSection);
// };
// var fetchConfigAndRender = function () {
//     $.ajax({
//         url: 'careers.json',
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
// fetchConfigAndRender();
