var BaseCanvasManager = /** @class */ (function () {
    function BaseCanvasManager(canvasId, width, height) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
    }
    BaseCanvasManager.prototype.setCanvas = function (bitMap, width, height, offsetX, offsetY) {
        if (typeof (bitMap) === 'string') {
            this.setCanvasString(bitMap, width, height, offsetX, offsetY);
        }
        else if (bitMap.isArray() && bitMap.length > 0) {
            if (typeof (bitMap[0]) === 'number')
                this.setCanvasNumber(bitMap, width, height, offsetX, offsetY);
        }
    };
    BaseCanvasManager.prototype.setCanvasString = function (bitMap, width, height, offsetX, offsetY) {
        var size = width * height;
        var imgData = new Uint8ClampedArray(size);
        for (var i = 0; i < size; i += 4) {
            imgData[i] = bitMap.charCodeAt(i); /* r */
            imgData[i + 1] = bitMap.charCodeAt(i + 1); /* g */
            imgData[i + 2] = bitMap.charCodeAt(i + 2); /* b */
            imgData[i + 3] = bitMap.charCodeAt(i + 3); /* a */
        }
        this.ctx.putImageData(new ImageData(imgData, width, height), offsetX, offsetY);
    };
    BaseCanvasManager.prototype.setCanvasNumber = function (bitMap, width, height, offsetX, offsetY) {
        var size = width * height;
        var imgData = new Uint8ClampedArray(size * 4);
        for (var i = 0; i < size; i += 4) {
            imgData[i] = bitMap[i]; /* r */
            imgData[i + 1] = bitMap[i + 1]; /* g */
            imgData[i + 2] = bitMap[i + 2]; /* b */
            imgData[i + 3] = bitMap[i + 3]; /* a */
        }
        this.ctx.putImageData(new ImageData(imgData, width, height), offsetX, offsetY);
    };
    BaseCanvasManager.prototype.setCanvasNumberArray = function (bitMap, width, height, offsetX, offsetY) {
        var size = width * height * 4;
        var imgData = new Uint8ClampedArray(size);
        for (var i = 0; i < size; i += 4) {
            imgData[i] = bitMap[i]; /* r */
            imgData[i + 1] = bitMap[i + 1]; /* g */
            imgData[i + 2] = bitMap[i + 2]; /* b */
            imgData[i + 3] = bitMap[i + 3]; /* a */
        }
        console.log(imgData);
        console.log("offsetx: " + offsetX + " offsety: " + offsetY);
        this.ctx.putImageData(new ImageData(imgData, width, height), offsetX, offsetY);
    };
    BaseCanvasManager.prototype.drawBox = function (box) {
        this.setCanvasNumberArray(box.generateCanvasBox().data(), box.width, box.height, box.xlCoordinate, box.ytCoordinate);
    };
    BaseCanvasManager.prototype.drawImageData = function (imageData, inLeft, inTop) {
        var left = inLeft;
        var top = inTop;
        if (typeof (left) === 'undefined' || left === null)
            left = 0;
        if (typeof (top) === 'undefined' || top === null)
            top = 0;
        console.log("width: " + imageData.width + " height: " + imageData.height);
        this.setCanvasNumberArray(imageData.data(), imageData.width, imageData.height, left, top);
    };
    BaseCanvasManager.prototype.drawImageDataEx = function () {
        var box = new Box();
        var borderColor = new pixel();
        borderColor.set(153, 102, 255, 255);
        box.setValues(40, 80, 15, 83);
        box.bBorderColor = borderColor;
        box.tBorderColor = new pixel().set(255, 0, 0, 255);
        box.lBorderColor = new pixel().set(0, 255, 0, 255);
        box.rBorderColor = new pixel().set(0, 0, 255, 255);
        box.lBorderWidth = 4;
        box.rBorderWidth = 2;
        box.tBorderWidth = 5;
        box.bBorderWidth = 10;
        var canvasBox = box.generateCanvasBox();
        this.setCanvasNumberArray(canvasBox.data(), box.width, box.height, box.xlCoordinate, box.ytCoordinate);
    };
    return BaseCanvasManager;
}());
