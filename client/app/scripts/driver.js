"use strict";
$(document).ready(function () {
    var canvasManager = new BaseCanvasManager("ClientCanvas", 1024, 1024);
    //canvasManager.drawImageData();
    $.get("../resources/Ascension_to_Aiur.bmp" /*"../resources/out.bitmap"*/, function (data) {
        canvasManager.setCanvas(data, 1024, 1024, 0, 0);
        //canvasManager.drawImageData();
    });
});
//# sourceMappingURL=driver.js.map