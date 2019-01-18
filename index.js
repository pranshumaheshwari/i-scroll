var cv = require("opencv4nodejs")

const video = new cv.VideoCapture(0);
i=0;

while(true)
{
    i++;
    let frame = video.read();
    //cv.imshow('abcd', frame);
    //cv.waitKey(0);
    cv.imwrite(i + '.jpg', frame);
}
