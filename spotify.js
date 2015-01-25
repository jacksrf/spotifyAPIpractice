
var currentArtists = [];
var currentAlbums = [];
var searchCheck = false;
// var albumSearchCheck = false;
// var songListCheck = false;


var artistSearch = function(urlInfo) {

    var url = "https://api.spotify.com/v1/search?q=artist:" + urlInfo + "&type=artist";
    var xhr = new XMLHttpRequest();

    console.log(url);

    xhr.open("GET", url);
    xhr.addEventListener('load', function(e) {
        // console.log(xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        var itemsArray = data.artists.items;

        var musicInfo = document.getElementById("musicInfo");
        var bandSearchDiv = document.createElement("div");
        // bandSearchDiv.setAttribute("name","artistSearch");
        bandSearchDiv.setAttribute("id", "currentDiv");
        bandSearchDiv.setAttribute("class", "artists");
        // bandSearchDiv.style.width = "100%";
        // bandSearchDiv.style.display = "inline-block";
        musicInfo.appendChild(bandSearchDiv);


      for (i=0; i<itemsArray.length; i++) {
        var name = data.artists.items[i].name;
        var image = data.artists.items[i].images[1].url;
        var id = data.artists.items[i].id;
        var idObj = {bandName: name, bandId: id}
        currentArtists.push(idObj);

        var bandName = document.createElement("h1");
        bandName.innerText = name;
        bandSearchDiv.appendChild(bandName);

        var bandImage = document.createElement("img");
        bandImage.setAttribute("href", "#");
        bandImage.setAttribute("id","current");
        bandImage.setAttribute("src", image);
        bandSearchDiv.appendChild(bandImage);

        var artistButton = document.createElement("a");
        artistButton.setAttribute("name", name);
        artistButton.setAttribute("href", "#");
        artistButton.innerText = "Go to Artist";
        bandSearchDiv.appendChild(artistButton);

        console.log(currentArtists)
      }
    })
  xhr.send();
}

var getAlbums = function(bandName,id) {
  console.log(currentArtists)
  var url2 = "https://api.spotify.com/v1/artists/" + id + "/albums";
  var xhr = new XMLHttpRequest();

  // console.log(url2);

  xhr.open("GET", url2);
  xhr.addEventListener('load', function(e) {
    // console.log(xhr.responseText);
    var data2 = JSON.parse(xhr.responseText);
    var itemsArray = data2.items;

    var removeDiv = document.getElementById("currentDiv");
    musicInfo.removeChild(removeDiv);

    var albumsDiv = document.createElement("div");
    albumsDiv.setAttribute("id", "currentDiv")
    albumsDiv.setAttribute("class", "albums")
    albumsDiv.style.width = "100%";
    albumsDiv.style.display = "inline-block";
    musicInfo.appendChild(albumsDiv);

    var sideBar = document.getElementById("sideBar");
    var currentSideBar = document.createElement("div");
    currentSideBar.setAttribute("id", "currentSideBar");
    sideBar.appendChild(currentSideBar);
    // var url3 = "https://api.spotify.com/v1/albums/" + albumId + "/tracks"
    // var xhr = new XMLHttpRequest();
    //
    // console.log(url3);
    //
    // xhr.open("GET", url3);
    // xhr.addEventListener('load', function(e) {
      // var data3 = JSON.parse(xhr.responseText);
      // console.log(data3);
    for (i=0; i<itemsArray.length; i++) {
      var name = bandName;
      var title2 = data2.items[i].name;
      var image2 = data2.items[i].images[1].url;
      var albumId = data2.items[i].id;
      var spotifyURL = data2.items[i].external_urls.spotify;
      console.log(spotifyURL);

      var eachAlbum = document.createElement("div");
      eachAlbum.setAttribute("id", title2);
      eachAlbum.setAttribute("name", "album");
      eachAlbum.setAttribute("class", "albumContainer");
      // eachAlbum.style.width = "30%";
      eachAlbum.style.display = "inline-block";
      albumsDiv.appendChild(eachAlbum);

      var albumTitle = document.createElement("h3");
      albumTitle.innerText = title2;
      eachAlbum.appendChild(albumTitle);

      var albumButton = document.createElement("a");
      albumButton.setAttribute("name", title2);
      albumButton.setAttribute("href", "#");
      // albumButton.innerText = "Visit in Spotify";
      eachAlbum.appendChild(albumButton);

      var albumImage = document.createElement("img");
      albumImage.setAttribute("name", title2);
      albumImage.setAttribute("src", image2);
      albumButton.appendChild(albumImage);

      //sidebar create

      var eachSideBarAlbum = document.createElement("div");
      eachSideBarAlbum.setAttribute("class", "sideAlbumButton");
      currentSideBar.appendChild(eachSideBarAlbum);

      var sideAlbumButton = document.createElement("a");
      sideAlbumButton.setAttribute("name", title2);
      sideAlbumButton.innerText = title2;
      sideAlbumButton.setAttribute("href", "#");
      eachSideBarAlbum.appendChild(sideAlbumButton);

      var albumObj = {bandName: name, albumName: title2, albumId: albumId, albumImage: image2, albumURL: spotifyURL };
      currentAlbums.push(albumObj);


    }
  })
  xhr.send();
}

var getTracks = function(artistName, albumName, albumId, albumImage, albumURL) {
  console.log(currentAlbums);
  var url3 = "https://api.spotify.com/v1/albums/" + albumId + "/tracks";
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url3);
  xhr.addEventListener('load', function(e) {
    var data3 = JSON.parse(xhr.responseText);
    var itemsArray = data3.items;

    var removeDiv = document.getElementById("currentDiv");
    musicInfo.removeChild(removeDiv);

    var removeSideBar = document.getElementById("currentSideBar");
    sideBar.removeChild(removeSideBar);

    var tracksDiv = document.createElement("div");
    tracksDiv.setAttribute("id", "currentDiv")
    tracksDiv.setAttribute("class", "albums")
    tracksDiv.style.display = "block";
    musicInfo.appendChild(tracksDiv);

    console.log("got to tracks")
    // <iframe src="https://embed.spotify.com/?uri=spotify:track:4th1RQAelzqgY7wL53UGQt" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
    var tracksArray = data3.items;
    console.log(tracksArray.length);

    for (i=0; i < tracksArray.length; i++) {

      var trackURI = data3.items[i].uri;
      var trackName = data3.items[i].name;
      var source = "https://embed.spotify.com/?uri=" + trackURI;
      console.log(source);

      var container = document.createElement("iframe");
      container.setAttribute("src", source);
      // container.style.width = "300px";
      // container.style.height = "80px";
      // container.style.frameborder ="0";
      tracksDiv.appendChild(container);
    }



  })
  xhr.send();
}

var button = document.getElementById("button");
var bandInput = document.getElementById("bandInput");

button.addEventListener('click', function() {
    if (searchCheck === true) {
      var currentDiv = document.getElementById("currentDiv");
      var musicInfo = document.getElementById("musicInfo")
      musicInfo.removeChild(currentDiv);
      var bandInputValue = bandInput.value;
      var band = bandInputValue.replace(" ","+");
      console.log("check true");
      artistSearch(band);
    } else if (searchCheck === false) {
      var bandInputValue = bandInput.value;
      var band = bandInputValue.replace(" ","+");
      console.log("check false");
      searchCheck = true;
      artistSearch(band);

    }
  });

var musicDiv = document.getElementById("musicInfo");

musicDiv.addEventListener('click', function(ev) {
  var checkDiv = document.getElementById("currentDiv");
  var check = checkDiv.getAttribute("class");
  // console.log(check)
  if (check === "artists") {
    if (event.target.tagName.toLowerCase() === 'a') {
      // console.log(ev)
      var name = event.target.name;
      console.log(name)
      currentArtists.forEach(function(obj) {
        console.log(obj);
        if (obj.bandName === name) {
          var currentArtistName = obj.bandName;
          var currentArtistId = obj.bandId;
          console.log(currentArtistId);
          currentArtists = [];
          getAlbums(currentArtistName,currentArtistId);
          }
        })
      }
    } else if (check === "albums") {
        var name2 = event.target.name;
        console.log(name2)
        currentAlbums.forEach(function(obj) {
          console.log(obj);
          if (obj.albumName === name2) {
            var currentArtistName = obj.bandName;
            var currentAlbumName = obj.albumName;
            var currentAlbumId = obj.albumId;
            var currentAlbumImage = obj.albumImage;
            var currentAlbumURL = obj.albumURL;
            currentAlbums = [];
            getTracks(currentArtistName, currentAlbumName, currentAlbumId, currentAlbumImage, currentAlbumURL);

          }
        })

    }
  });
