var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
    });
}
// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

var intId;
const postMan = () => {
    intId = setInterval(() => {
        context.drawImage(video, 0, 0, 640, 480);
        let encode = canvas.toDataURL();
        encode = encode.replace(/^data:image\/(png|jpg);base64,/, "");
        $.post(`http://localhost:3000`, { photo: encode }).done(async (res) => {
            // let gesture = func(res);
            // if(gesture != 0){
            //     await setTimeout(() => {
            //         intId = window.clearInterval(intId);
            //         postMan();
            //     }, 500);
            // }
            console.log(res);
        });
    }, 100);
};
postMan();