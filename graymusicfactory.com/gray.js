/* jshint esversion: 6 */

var app = {
    menus: ["Home","The Band","The Music","The Gallery","The Shop?","Sponsors"],
    links: ["home","band","music","gallery","merch","sponsors"]
};

function buildMenuString() {
    var s = '<div><span class="topnav">';
    for (var i = 0; i < app.menus.length; i++) {
        var m = app.menus[i];
        var n = app.links[i] + ".html";
        s += '<a id="topMenuAnchor' + m + '" href="' + n +'">' + m + '</a>';
    }
    s += '</span>&nbsp;&nbsp;&nbsp;<img src="images/GRAY-25.png" alt="">';
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
