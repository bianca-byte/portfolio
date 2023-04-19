var request = new XMLHttpRequest();
var url = "https://api.are.na/v2/channels/feral-typeface?per=100";
request.open("GET", url, true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    document.getElementById("site").style.display = "none";
    var data = JSON.parse(request.responseText);

    data.contents.forEach(function (c) {
      var div = document.createElement("div");

      div.className = "entry";
      if (c.class === "Text") {
        var text = c.content_html;
        div.innerHTML =
          text + "<p>" + formatDate(new Date(c.created_at)) + "</p>";
      } else if (c.class === "Image") {
        div.innerHTML =
          '<a href="' +
          c.image.original.url +
          '" target="_blank"><img src="' +
          c.image.display.url +
          '"></a><div class="caption-container caption"><p>' +
          c.title +
          "</p></div>";
      }
      document
        .getElementById("entries")
        .insertBefore(div, document.getElementById("entries").childNodes[0]);

      var anchors = document
        .getElementById("entries")
        .getElementsByTagName("a");
      for (var i = 0; i < anchors.length; i++) {
        anchors[i].setAttribute("target", "_blank");
      }
    });
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function () {
  // There was a connection error of some sort
};

request.send();
