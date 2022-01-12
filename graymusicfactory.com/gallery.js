/*global
    document, window,
*/

"use strict";

var gallery = {
    idx: 0,
    links: ["img1b.jpg","img2b.jpg","img3b.jpg"],
    spinnerTimeoutTime: 200, // milliseconds
    spinnerTimeoutLimit: 30 /*seconds*/ * 5 /*checks per second*/,  // max checks
    spinnerTimeoutCount: 0, // number of checks since image started loading
};

function galleryPrev() {
    gallery.idx -= 1;
    if (gallery.idx < 0) {
        gallery.idx = gallery.links.length - 1;
    }
    gallerySetImg();
}

function galleryNext() {
    gallery.idx += 1;
    if (gallery.idx >= gallery.links.length) {
        gallery.idx = 0;
    }
    gallerySetImg();
}

function galleryImageCheck() {
    var x = document.getElementById("galleryImage");
    if (x != null) {
        if (x.complete) {
            gallerySpinnerOff();  // the image has loaded. Turn off the spinner.
            return;
        }
        gallery.spinnerTimeoutCount += 1;
        if ( gallery.spinnerTimeoutCount <= gallery.spinnerTimeoutLimit) {
            window.setTimeout(galleryImageCheck,gallery.spinnerTimeoutTime);
            return;
        }
        //---------------------------------------------------------------------
        // We've exceeded the max number of checks.  Something is wrong.
        // The image didn't complete loading. Indicate something went wrong
        //---------------------------------------------------------------------
        x.innerHTML = '<i class="fa fa-exclamation fa-2X" aria-hidden="true"></i>';
    }
}

function gallerySetImg() {
    var x = document.getElementById("galleryImage");
    if (x != null) {
        gallery.spinnerTimeoutCount = 0;  // ensure this is reset every time we load an image
        x.src = "gallery/" + gallery.links[gallery.idx];
        gallerySpinnerOn();
        window.setTimeout(galleryImageCheck,gallery.spinnerTimeoutTime); // check to see if image is loaded.
    }
}

function gallerySpinnerOn() {
    var x = document.getElementById("gallerySpinner");
    if (x != null) {
        x.innerHTML = '<i class="fa fa-spinner fa-pulse fa-2x fa-fw" aria-hidden="true"></i>';
    }
}

function gallerySpinnerOff() {
    var x = document.getElementById("gallerySpinner");
    if (x != null) {
        x.innerHTML = '';
    }
}
