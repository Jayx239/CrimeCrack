$(document).ready(function () {
    var canvasManager = new BaseCanvasManager("ClientCanvas", 1024, 1024);
    //canvasManager.drawImageData();
    $.get("../resources/out.bitmap", function (data) {
        canvasManager.setCanvas(data, 1024, 1024, 0, 0);
        //canvasManager.drawImageData();
    });
});
