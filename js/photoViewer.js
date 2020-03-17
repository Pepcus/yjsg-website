// **DO THIS**:
//   Replace BUCKET_NAME with the bucket name.
//
var albumBucketName = 'yjsg-website-cdn';

//
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-south-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-south-1:9e448c72-937f-4036-afb9-2fe6d871adfd',
});

// Create a new service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

var albumsList = [];
var albumsSize = '';
var href = '';
var bucketUrl = '';






// A utility function to create HTML.
function getHtml(template) {
  return template.join('\n');
}

// List the photo albums that exist in the bucket.
 function listAlbums() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/study-material/'}, function(err, data) {
    albumsSize = data.CommonPrefixes.length;
    var albums = data.CommonPrefixes;
    if (err) {
      return alert('There was an error listing your albums: ' + err.message);
    } else {
      for (var i = 0; i < albums.length; i++) {
        var prefix = albums[i].Prefix;
        var albumName = decodeURIComponent((prefix.split('/'))[2]);
        s3.listObjects({Prefix: 'assets/study-material/' + albumName}, function(err, data) {
          href = this.request.httpRequest.endpoint.href;
          bucketUrl = href + albumBucketName + '/';
          albumsList.push(data);

          for (var j = 0; j < albumsList.length; j++) {
            albumsList[j].number = parseInt(albumsList[j].Prefix.split('/')[2].split('')[0]);
            albumsList[j].levelName = albumsList[j].Prefix.split('/')[2].split('_')[1];
            albumsList[j].levelClass = albumsList[j].Prefix.split('/')[2].split('_')[1].replace(" ", "-").toLowerCase();
          }
          viewAlbum(albumsList);
        });
      }
    }
  });
}

// Show the photos that exist in an album.
function viewAlbum(albumsList){

  if(albumsList.length === albumsSize) {
    var bookListSorted = albumsList.slice(0);
    bookListSorted.sort(function(a,b) {
      return a.number - b.number;
    });
      for (var q = 0; q < bookListSorted.length; q++) {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        var books = bookListSorted[q].Contents;
        var bookList = '';
        console.log('bucketUrl', bucketUrl);
        for (var r = 1; r < books.length; r++) {
          var bookName = books[r].Key.split('/')[3].split("_")[1];
          bookList += "<li><div><a target='_blank' href='"+bucketUrl+books[r].Key+"'>"+ bookName +"<svg viewBox=\"0 0 12.600000381469727 12.40000057220459\">\n" +
            "<path d=\"M12.1 0h-9c-.3 0-.5.2-.5.5s.2.5.5.5h7.8L.2 11.6c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0\n" +
            ".4-.1L11.6 1.7v7.8c0 .3.2.5.5.5s.5-.2.5-.5v-9c0-.3-.2-.5-.5-.5z\"></path>\n" +
            "</svg></a></div></li>";
          // console.log("bookname---",bookName);
        }
        var bookHTML = $(
          "<div class='study-card-col'>"+
          "<div class='study-card-item'>"+
          "<div class='study-card-wrapper'>"+
          "<div class='study-card-header "+ bookListSorted[q].levelClass +"' style='background:#" +randomColor+"'>"+
          "<h4>" + bookListSorted[q].levelName +"</h4>"+
          "</div>"+
          "<div class='study-card-body'>"+
          "<p></p>"+
          "<ul>"+
          bookList+
          "</ul>"+
          "</div>"+
          "</div>"+
          "</div>"+
          '</div>'
        );
        $("#study-card-detail").append(bookHTML);
      }
  }
}

// List the photo albums that exist in the bucket.
var albumName1 = '';
var albumNamePrint = '';
var albumName1Pass = '';
function listAlbums3() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';
    var albumsSize1 = data.CommonPrefixes.length;
    var albums1 = data.CommonPrefixes;
    if (err) {
      return alert('There was an error listing your albums: ' + err.message);
    } else {
      for (var i = 1; i < albums1.length; i++) {
        var prefix = albums1[i].Prefix;
        albumName1Pass = decodeURIComponent(((prefix.split('/'))[3]));
        albumName1 = decodeURIComponent(((prefix.split('/'))[3]).split('_')[1]);
        albumNamePrint = decodeURIComponent((((prefix.split('/'))[3]).split('_')[1]).split('-').join(' '));
        console.log('prefix', prefix);

        var htmltest1 = '';
              htmltest1 += "<div class='shivirwrapper'>"+
        "<div class='shivirparent' onclick=''>"+
        "<div class='shivirchild shivirbg-balyuva'>"+
        "<a href='#' onclick='viewAlbum1(\"" + albumName1Pass + "\")'>"+albumNamePrint+"</a>"+
        "</div>"+
        "</div>"+
        "</div>";
      $('#viewer').append(htmltest1);
      }
    }
  });
}

var tabMenu = '';
var albumsList1 = [];
var albumsYearLength = '';
var tabDataItem = '';
var datlist = [];
var bigimage = '';
var thumbs = "";
function viewAlbum1(albumName1Pass){
  console.log('albumName1Pass', albumName1Pass);
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/'+ albumName1Pass + '/'}, function(err, data) {
    console.log('albumName1Pass', data);
    var albumsSize2 = data.CommonPrefixes.length;
    var albumsYear = data.CommonPrefixes;
    albumsYearLength = data.CommonPrefixes.length;
    var albumsYearPass = '';
    for (var i = 0; i < albumsYear.length; i++) {
      var prefix = albumsYear[i].Prefix;
        albumsYearPass = decodeURIComponent(((prefix.split('/'))[4]));
        albumsList1.push(albumsYearPass);
    }
    if(albumsSize2 === albumsList1.length) {
      console.log('testing', albumsList1.length);
      var tabSize =  albumsList1.length;
      $('#tab-menu > aside').html('');
      for (var j = 0; j < albumsList1.length; j++) {
          tabDataItem = albumsList1[j];
          tabMenu = "<div class='tab-menu-container column-"+tabSize+"'>"+
            "<div class='tab-menu-icon services-icon'>"+
            "<div class='tab-menu-icon-wrapper'>"+
            "<div class='tab-menu-icon-image'></div>"+
            "<div class='tab-menu-icon-icon services-icon-icon'>"+
            "<div>"+
            "<a href='#' onclick='viewYearData(\"" + tabDataItem + "\")'>"+tabDataItem+"</a>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</div>"

          $('#tab-menu > aside').append(tabMenu);
      }
    }
  });
}

var listItem = '';
function viewYearData(tabDataItem){
  datlist = [];
  bigimage = "";
  thumbs = "";
  listItem = "";
  $('#viewAlbum').removeClass('active');
  console.log('albumName1Pass', tabDataItem);
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/'+ albumName1Pass + '/' + tabDataItem + '/'}, function(err, data) {
    $('#viewer').html('');
    var albumsYearData = data.CommonPrefixes;
    console.log('albumsYearData', albumsYearData);
    var bookList = '';
    for (var k = 0; k < albumsYearData.length; k++) {
      listItem = albumsYearData[k].Prefix.split('/')[5];
      console.log('albumsYearData', listItem);
      bookList += "<li class='technologies-page'>"+
        "<a class='cards-item-technologies' href='#' onclick='viewYearDataItem(\"" + listItem + "\")'>"+
        "<div class='cards-technologies-wrapper'>"+
        "<div class='cards-technologies-icon'>"+
        "<img src='assets/shivir-details-icons/cameraicon-coloured.png' class='techiconColor'>"+
        "<img src='assets/shivir-details-icons/imageicon-white.png' class='techiconWhite'>"+
        "</div>"+
        "<div class='cards-technologies-name'>"+
        "<h4>"+listItem+"</h4>"+
        "</div>"+
        "</div>"+
        "</li>"
    }
    var bookHTML = $(
      "<div class='section-container'>"+
      "<div class='page-section-bg-image'>"+
      "<ul>"+
      bookList+
      "</ul>"+
      "</div>"+
      "</div>"
    );
    $('#viewer').append(bookHTML);
  });
}

function viewYearDataItem(listItem){

  $('#viewAlbum').addClass('active');
  console.log('albumName1Pass', tabDataItem, albumName1Pass);
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/'+ albumName1Pass + '/' + tabDataItem + '/' + listItem + '/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';
  datlist = data.Contents;
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });

  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }

}



function balphoto2019() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2019/photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}

function balphoto2018() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2018/photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('bucketUrl', bucketUrl);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}

function balphoto2017() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2017/photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('bucketUrl', bucketUrl);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}

function balphoto2016() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2016/photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}


function balgrpphoto2019() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2019/group-photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('data', data);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}

function balgrpphoto2018() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2018/group-photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('data', data);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}

function balgrpphoto2017() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2017/group-photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('data', data);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}

function balgrpphoto2016() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2016/group-photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('data', data);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}


function baltoppersphoto2019() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2016/group-photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/'
    console.log('data', data);
  });
}

function balvideosphoto2019() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2016/group-photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('data', data);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}

function balanssheetphoto2019() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/1_Baal-&-Yuva-Sanskar-Shivir/2016/group-photos/'}, function(err, data) {
    href = this.request.httpRequest.endpoint.href;
    bucketUrl = href + albumBucketName + '/';

    console.log('data', data);
    datlist = data.Contents;
    console.log('datlist', datlist);
    if (datlist) {
      insertGalleryImages(datlist);
      insertThumbImages(datlist);
      addCarousel();
    }else {
      console.error("ERROR: Not received JSON file  " + data );
      addCarousel();
    }
  });
  function insertGalleryImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#big");
  }
  function insertThumbImages(datlist) {
    var htmlRender = '';
    for (var k = 1; k < datlist.length; k++) {
      htmlRender += "<div class=\"item\">" +
        "<img src=\""+bucketUrl+datlist[k].Key+"\"></img>" +
        "</div>";
    }
    $(htmlRender).appendTo("#thumbs");
  }
  function addCarousel() {
    bigimage = $("#big");
    thumbs = $("#thumbs");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
      .owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ]
      })
      .on("changed.owl.carousel", syncPosition);

    thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
          .find(".owl-item")
          .eq(0)
          .addClass("current");
      })
      .owlCarousel({
        items: 4,
        dots: true,
        nav: true,
        navText: [
          '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
          '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
        ],
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 4,
        responsiveRefreshRate: 100
      })
      .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
      //if loop is set to false, then you have to uncomment the next line
      //var current = el.item.index;

      //to disable loop, comment this block
      var count = el.item.count - 1;
      var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }
      //to this
      thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = thumbs.find(".owl-item.active").length - 1;
      var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
      var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();

      if (current > end) {
        thumbs.data("owl.carousel").to(current, 100, true);
      }
      if (current < start) {
        thumbs.data("owl.carousel").to(current - onscreen, 100, true);
      }
    }

    function syncPosition2(el) {
      if (syncedSecondary) {
        var number = el.item.index;
        bigimage.data("owl.carousel").to(number, 100, true);
      }
    }

    thumbs.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).index();
      bigimage.data("owl.carousel").to(number, 300, true);
    });
  }
}
