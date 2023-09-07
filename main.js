let video = document.querySelector(".video");
let videoRever = document.querySelector(".video-revr");
let scrollRecord = document.querySelector(".middle");

let decideVideo = 0;
let decideVideoScroll = 0;
let onFirstScroll = 0;
let letReversePlay = false;

function videoPlay() {
    video.style.display = "flex";
    videoRever.style.display = "none";
    videoRever.pause();
    video.play()
    if(letReversePlay == true) {
        video.pause();
    }
    decideVideo = 1;
    decideVideoScroll = 1;
}

function videoReverse() {
    video.style.display = "none";
    videoRever.style.display = "flex";
    decideVideo = 2;
    decideVideoScroll = 2;
    video.pause();
    videoRever.play()
}

window.addEventListener('keydown', function (details) {

    if (details.key == 'ArrowDown') {

        if (video.currentTime < video.duration) {
            videoPlay();
        }
    }
    if (details.key == 'ArrowUp') {

        if (video.currentTime > 0) {
            videoReverse();
        }

    }
})

window.addEventListener('keyup', function (details) {

    video.pause();
    videoRever.pause();

    if (decideVideo == 1) {
        videoRever.currentTime = video.duration - video.currentTime;
    }
    if (decideVideo == 2) {
        video.currentTime = videoRever.duration - videoRever.currentTime;
    }
})

window.onwheel = function (details) {

    if (details.deltaY > 0) {
        if (video.currentTime < video.duration) {
            videoPlay();
            console.log('forward: ' + video.currentTime);
            letReversePlay = false;
        }
    }
    else if (details.deltaY < 0) {
        if (video.currentTime > 0 && video.currentTime <= video.duration && letReversePlay == true) {
            videoReverse();
            letReversePlay = false;
            console.log('reverse: ' + videoRever.currentTime);
        }
    }

    scrollRecord.style.color = "#fff";
}

window.addEventListener("scrollend", function () {
    console.log('scroll completed');
    onFirstScroll += 1;
    letReversePlay = true;
    if(video.currentTime == 0) {
        onFirstScroll = 1;
    }
    if (onFirstScroll == 1) {
        console.log("first scroll done!");
    }
    video.pause();
    videoRever.pause();

    if (decideVideoScroll == 1) {
        videoRever.currentTime = video.duration - video.currentTime;
    }
    if (decideVideoScroll == 2) {
        video.currentTime = videoRever.duration - videoRever.currentTime;
    }

    scrollRecord.style.color = "#ababad";

})

scrollRecord.addEventListener("mouseover" , function() {
    scrollRecord.style.color = "#fff";
})
scrollRecord.addEventListener("mouseout" , function() {
    scrollRecord.style.color = "#ababad";
})