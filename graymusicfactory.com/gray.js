/*global
    document,
*/

"use strict";

var app = {
    menus: ["Home","The Band","The Music","The Shop?","Corporate Sponsors"],
    links: ["/home","/band","/music","/merch","/sponsors"]
};

function buildMenuString() {
    var s = '<div class="topnav">';
    for (var i = 0; i < app.menus.length; i++) {
        var m = app.menus[i];
        var n = app.links[i] + ".html";
        s += '<a id="topMenuAnchor' + m + '" href="' + n +'">' + m + '</a>';
    }
    return s + '</div>';
}

function showMenu() {
    document.write( buildMenuString() );
}

function highlightMenuItem(s) {
    var j = app.menus.indexOf(s);  // may not be found
    var x;
    for (var i = 0; i < app.menus.length; i++) {
        x = document.getElementById('topMenuAnchor'+app.menus[i]);
        if (x == null) {
            continue; // this should never happen
        }
        x.classList.remove("active");
    }
    if (j >= 0) {
        x = document.getElementById('topMenuAnchor'+app.menus[j]);
        x.classList.add("active");
    }
}
