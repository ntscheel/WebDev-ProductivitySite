var curImage;
var playID;

function populateImgTable(){
    var imgTable = document.getElementById("imageTable");
    var tableHTML = "<tr>";
    for(var i = 1; i <= 20; i++){
        tableHTML += '<td><img class="tableimg hover-shadow" src="img/img' + i + '.jpg" alt="image' + i + '" onclick="openModal('+i+')"></td> ';
        if(i%5 == 0 && i < 20){
            tableHTML += "</tr><tr>";
        }
    }
    tableHTML += "</tr>";
    imgTable.innerHTML = tableHTML;
}
populateImgTable();

var modal = document.getElementById('lightboxModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function openModal(imgNum) {
    modal.style.display = "block";
    var img_show = document.getElementById("img_show");
    var slideshow = document.getElementById("slideshow");
    curImage = imgNum;

    var slideshowHTML = '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage-2) + '.jpg" alt="image' + fixImageIndex(curImage-2) + '">';
    slideshowHTML += '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage-1) + '.jpg" alt="image' + fixImageIndex(curImage-1) + '">';
    slideshowHTML += '<img class="slideshowimg hover-shadow sel" src="img/img' + fixImageIndex(curImage) + '.jpg" alt="image' + fixImageIndex(curImage) + '">';
    slideshowHTML += '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage+1) + '.jpg" alt="image' + fixImageIndex(curImage+1) + '">';
    slideshowHTML += '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage+2) + '.jpg" alt="image' + fixImageIndex(curImage+2) + '">';
    slideshow.innerHTML = slideshowHTML;
    img_show.innerHTML = '<img id="modalimg" class="modalimg" src="img/img' + imgNum + '.jpg" alt="image' + imgNum + '">';
}

//Super inelegant helper function to get the right image
function fixImageIndex(num){
    var ret = num;
    if(ret != 20) {
        ret = 20+num;
        ret = ret%20;
    }
    if(ret == 0){
        ret = 20;
    }
    return ret;
}

function showImg(inc){
    var img_show = document.getElementById("img_show");
    var slideshow = document.getElementById("slideshow");
    document.getElementById("modalimg").classList.add("load");
    setTimeout(function(){
        curImage = fixImageIndex(curImage+inc);
        var slideshowHTML = '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage-2) + '.jpg" alt="image' + fixImageIndex(curImage-2) + '">';
        slideshowHTML += '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage-1) + '.jpg" alt="image' + fixImageIndex(curImage-1) + '">';
        slideshowHTML += '<img class="slideshowimg hover-shadow sel" src="img/img' + curImage + '.jpg" alt="image' + curImage + '">';
        slideshowHTML += '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage+1) + '.jpg" alt="image' + fixImageIndex(curImage+1) + '">';
        slideshowHTML += '<img class="slideshowimg hover-shadow" src="img/img' + fixImageIndex(curImage+2) + '.jpg" alt="image' + fixImageIndex(curImage+2) + '">';
        slideshow.innerHTML = slideshowHTML;
        img_show.innerHTML = '<img id="modalimg" class="modalimg load" src="img/img' + curImage + '.jpg" alt="image' + curImage + '">';
        setTimeout(function(){document.getElementById("modalimg").classList.remove("load");}, 100);
    },200);

}

function startSlideshow(){
    console.log("starting slideshow...");
    showImg(1);
    playID = setInterval(function(){
        showImg(1);
    }, 5000);
}
function stopSlideshow(){
    clearInterval(playID);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function _addEventListener(evt, element, fn) {
    if (window.addEventListener) {
        element.addEventListener(evt, fn, false);
    }
    else {
        element.attachEvent('on'+evt, fn);
    }
}
function handleKeyboardEvent(evt) {
    if (!evt) {evt = window.event;} // for old IE compatible
    var keycode = evt.keyCode || evt.which; // also for cross-browser compatible

    var info = document.getElementById("info");
    switch (keycode) {
        case 37:
            showImg(-1);
            break;
        case 39:
            showImg(1);
            break;
        case 27:
            //modal.style.display = "none";
            break;
    }
}
_addEventListener('keydown', document, handleKeyboardEvent);