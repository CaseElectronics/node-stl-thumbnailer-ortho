var StlThumbnailer = require('.');
var fs             = require('fs');

var thumbnailer = new StlThumbnailer({
    filePath:          __dirname + "/zamny_key.stl",
    requestThumbnails: [
        {
            width:               1000,
            height:              1000,
            cameraAngle:         [1, 1, 1],
            orthographic:        true,
            showMinorEdges:      false,
            shadeNormalsOpacity: 0,
            backgroundColor:     0xffffff,        // optional: background color (RGB) for the rendered image
            baseOpacity:         1,             // optional: translucency of the base material that lets you see through it
            baseColor:           0x000000,        // optional: base color
            baseLineweight:      .5,             // optional: lineweights will scale to image size, but this serves as a base for that scaling. Larger numbers = heavier lineweights
            lineColor:           0x000000,
        }
    ]
})
    .then(function (thumbnails) {
        // thumbnails is an array (in matching order to your requests) of Canvas objects
        // you can write them to disk, return them to web users, etc
        // see node-canvas documentation at https://github.com/Automattic/node-canvas
        thumbnails[0].toBuffer(function (err, buf) {
            fs.writeFileSync(`${__dirname}/output-${Date.now()}.png`, buf);
        })
    })