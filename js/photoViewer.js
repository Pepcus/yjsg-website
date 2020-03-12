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

function listAlbums1() {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/'}, function(err, data) {
    // console.log('data-gallary', data);
    for (var q = 1; q < data.CommonPrefixes.length; q++) {
      var albumName1 = (data.CommonPrefixes[q].Prefix).split('/')[3];

      var htmltest = '';
      htmltest += "<div class='shivirwrapper'>"+
        "<div class='shivirparent' onclick=''>"+
        "<div class='shivirchild shivirbg-balyuva'>"+
        "<a href='#' onclick='test("+albumName1+")'>"+albumName1+"</a>"+
        "</div>"+
        "</div>"+
        "</div>";
      $('#test').append(htmltest);
    }
  });
}
listAlbums1();

function test(albumName1) {
  s3.listObjects({Delimiter: '/', Prefix: 'assets/gallary/shivir/' + albumName1 + '/'}, function() {
    var htmltest1 = '';
    htmltest1 += "<div>"+
                  "<a>testing</a>"+
                "</div>";
    // $('#test').text('Hi I am replace');
    $('#test1').append(htmltest1);
  });
}
