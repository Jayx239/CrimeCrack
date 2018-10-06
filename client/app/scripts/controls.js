"use strict";
$(document).ready(function () {
    document.addEventListener('keydown', function (event) {
        /* w - up*/
        if (event.keyCode == 87) {
            alert('Up was pressed');
        }
        /* s - down */
        else if (event.keyCode == 83) {
            alert('Down was pressed');
        }
        /* a - left */
        else if (event.keyCode == 65) {
            alert('Left was pressed');
        }
        /* d - right */
        else if (event.keyCode == 68) {
            alert('Right was pressed');
        }
    });
    var mouseDragHandler = new MouseDragHandler();
    var canvasManager = new BaseCanvasManager("Overlay", 1024, 1024);
    mouseDragHandler.onMouseMove = function (event) {
        if (!mouseDragHandler.isDragging)
            return;
        if (typeof (mouseDragHandler.startCoordinates[0]) === 'undefined'
            || typeof (mouseDragHandler.startCoordinates[1]) === 'undefined'
            || typeof (mouseDragHandler.endCoordinates[0]) === 'undefined'
            || typeof (mouseDragHandler.endCoordinates[1]) === 'undefined')
            return;
        var box = new Box();
        var borderColor = new pixel();
        borderColor.set(153, 102, 255, 255);
        box.setValues(mouseDragHandler.startCoordinates[0], mouseDragHandler.endCoordinates[0], mouseDragHandler.startCoordinates[1], mouseDragHandler.endCoordinates[1]);
        //box.setValues(100, 150, 100, 150);
        box.bBorderColor = borderColor;
        box.tBorderColor = new pixel().set(255, 0, 0, 255);
        box.lBorderColor = new pixel().set(0, 255, 0, 255);
        box.rBorderColor = new pixel().set(0, 0, 255, 255);
        box.lBorderWidth = 5;
        box.rBorderWidth = 5;
        box.tBorderWidth = 5;
        box.bBorderWidth = 5;
        canvasManager.drawBox(box);
    };
    mouseDragHandler.listen();
});
var MouseDragHandler = /** @class */ (function () {
    function MouseDragHandler() {
        this.startCoordinates = [0, 0];
        this.endCoordinates = [0, 0];
        this.isDragging = false;
        this.wasDragging = false;
        this.onMouseDown = null;
        this.onMouseMove = null;
        this.onMouseUp = null;
    }
    MouseDragHandler.prototype.listen = function () {
        var handler = this;
        return $(document).mousedown(function (event) {
            handler.startCoordinates[0] = event.pageX;
            handler.startCoordinates[1] = event.pageY;
            handler.isDragging = true;
            if (typeof (handler.onMouseDown) === 'function') {
                handler.onMouseDown(event);
            }
        }).mousemove(function (event) {
            handler.endCoordinates[0] = event.pageX;
            handler.endCoordinates[1] = event.pageY;
            if (typeof (handler.onMouseMove) === 'function') {
                handler.onMouseMove(event);
            }
        }).mouseup(function (event) {
            handler.endCoordinates[0] = event.pageX;
            handler.endCoordinates[1] = event.pageY;
            handler.wasDragging = handler.isDragging;
            handler.isDragging = false;
            if (handler.wasDragging) {
            }
            if (typeof (handler.onMouseUp) === 'function') {
                handler.onMouseUp(event);
            }
        });
    };
    return MouseDragHandler;
}());
//# sourceMappingURL=controls.js.map