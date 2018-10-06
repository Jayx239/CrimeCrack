
class BaseCanvasManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    public constructor(canvasId: string, width: number, height: number) {
        this.canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.canvas.height = height;
        this.canvas.width = width;
        this.ctx = <CanvasRenderingContext2D> this.canvas.getContext("2d", {alpha: true});
        this.width = width;
        this.height = height;
    }

    public setCanvas(bitMap: any, width: number, height: number, offsetX: number, offsetY: number) {
        if (typeof(bitMap) === 'string') {
            this.setCanvasString(bitMap, width, height, offsetX, offsetY);
        }
        else if (bitMap.isArray() && bitMap.length > 0) {
            if(typeof(bitMap[0]) === 'number')
                this.setCanvasNumber(bitMap, width, height, offsetX, offsetY);
        }
    }

    public setCanvasString(bitMap: string, width: number, height: number, offsetX: number, offsetY: number) {
        if(!this.validDimensions(width,height))
            return;
        var size = width*height;
        var imgData: Uint8ClampedArray = new Uint8ClampedArray(size*4);
        for(var i=0; i<size; i++) {
            imgData[i] = bitMap.charCodeAt(i);
        }
        this.ctx.putImageData(new ImageData(imgData,width,height), offsetX, offsetY);
    }

    public setCanvasNumber(bitMap: [number], width: number, height: number, offsetX: number, offsetY: number) {
        if(!this.validDimensions(width,height))
            return;
        var size = width*height;
        var imgData: Uint8ClampedArray = new Uint8ClampedArray(size*4);
        for(var i=0; i<size; i++) {
            imgData[i] = bitMap[i];
        }
        this.ctx.putImageData(new ImageData(imgData,width,height), offsetX, offsetY);
    }
    public setCanvasNumberArray(bitMap: Array<number>, width: number, height: number, offsetX: number, offsetY: number) {
        if(!this.validDimensions(width,height))
            return;
        var size = width*height;
        var imgData: Uint8ClampedArray = new Uint8ClampedArray(size*4);
        for(var i=0; i<size*4; i++) {
            imgData[i] = bitMap[i];
        }

        this.ctx.putImageData(new ImageData(imgData,width,height), offsetX, offsetY);
    }

    private validDimensions(width: number, height: number): boolean {
        return width > 0 && height > 0;
    }

    public drawBox(box: Box) {
        this.setCanvasNumberArray(box.generateCanvasBox().data(), box.width, box.height, box.xlCoordinate, box.ytCoordinate);
    }

    public drawImageData(imageData: imageData, inLeft: number|null, inTop: number|null) {
        var left = inLeft;
        var top = inTop;

        if(typeof(left) === 'undefined' || left === null)
            left = 0;
        if(typeof(top) === 'undefined' || top === null)
            top = 0;
        this.setCanvasNumberArray(imageData.data(), imageData.width, imageData.height, left, top);
    }

    public drawImageDataEx() {
        var box: Box = new Box();
        var borderColor: pixel = new pixel();
        borderColor.set(153,102,255,255);
        box.setValues(40,80,15,83);
        box.bBorderColor = borderColor;
        box.tBorderColor = new pixel().set(255,0,0,255);
        box.lBorderColor = new pixel().set(0,255,0,255);
        box.rBorderColor = new pixel().set(0,0,255,255);
        box.lBorderWidth = 4;
        box.rBorderWidth = 2;
        box.tBorderWidth = 5;
        box.bBorderWidth = 10;
        var canvasBox: imageData = box.generateCanvasBox();
        this.setCanvasNumberArray(canvasBox.data(), box.width, box.height, box.xlCoordinate, box.ytCoordinate);

    }
}


