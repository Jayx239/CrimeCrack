
class pixel {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    public constructor() {
        this.red = 0;
        this.blue = 0;
        this.green = 0;
        this.alpha = 0;
    }

    public set(red: number, green: number, blue: number, alpha: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        return this;
    }

    public toNumberArray() {
        var output = [];
        output[0] = this.red;
        output[1] = this.green;
        output[2] = this.blue;
        output[3] = this.alpha;

        return output;
    }
}

class imageData {
    content: [pixel|null];
    width: number;
    height: number;

    public constructor() {
        this.content = [new pixel()];
        this.width = 0;
        this.height = 0;
    }

    public setSize(width: number, height: number) {
        this.content = [new pixel()];
        this.width = width;
        this.height = height;
        for(var i = 0; i < width*height; i++) {
            this.content[i] = new pixel();
        }
    }

    public setPixel(pixel: pixel|null, x: number, y: number) {
        this.content[x+(y*this.width)] = pixel;
    }

    public data() {
        var data = [];
        for(var i=0; i<this.width*this.height; i++) {
            var value: pixel = new pixel();
            if(this.content[i] !== null && typeof (this.content[i]) !== 'undefined') {
                 value = <pixel> this.content[i];
            }

            var rgbValues = value.toNumberArray();
            data[i*4] = rgbValues[0];
            data[(i*4) + 1] = rgbValues[1];
            data[(i*4) + 2] = rgbValues[2];
            data[(i*4) + 3] = rgbValues[3];
        }
        return data;
    }

    public dataNullable() {
        var data: Array<number|null> = [];
        for(var i=0; i<this.content.length; i++) {
            var value: Array<number|null> = [null,null,null,null];
            if(this.content[i] !== null) {
                value = (<pixel> this.content[i]!).toNumberArray();
            }

            data.concat(value);
        }

        return data;
    }

}

class Box {
    xlCoordinate: number;
    xrCoordinate: number;
    ytCoordinate: number;
    ybCoordinate: number;

    tBorderWidth: number;
    bBorderWidth: number;
    lBorderWidth: number;
    rBorderWidth: number;

    tBorderColor: pixel;
    bBorderColor: pixel;
    lBorderColor: pixel;
    rBorderColor: pixel;

    width: number;
    height: number;

    public constructor() {
        /* Set coordinates */
        this.xlCoordinate = 0;
        this.xrCoordinate = 0;
        this.ytCoordinate = 0;
        this.ybCoordinate = 0;

        /* Set borderwidth */
        this.tBorderWidth = 0;
        this.bBorderWidth = 0;
        this.lBorderWidth = 0;
        this.rBorderWidth = 0;

        /* Set border colors */
        this.tBorderColor = new pixel();
        this.bBorderColor = new pixel();
        this.lBorderColor = new pixel();
        this.rBorderColor = new pixel();

        this.width = 0;
        this.height = 0;
    }

    public setBorderWith(xtWidth: number, xbWidth: number, ytWidth: number, ybWidth: number) {
        this.tBorderWidth = xtWidth;
        this.bBorderWidth = xbWidth;
        this.lBorderWidth = ytWidth;
        this.rBorderWidth = ybWidth;
    }

    public setValues(x1: number, x2: number, y1: number, y2: number) {
        if(x1 < x2) {
            this.xlCoordinate = x1;
            this.xrCoordinate = x2;
            this.width = x2-x1;
        } else {
            this.xlCoordinate = x2;
            this.xrCoordinate = x1;
            this.width = x1-x2;
        }

        if(y1 > y2) {
            this.ytCoordinate = y2;
            this.ybCoordinate = y1;
            this.height = y1-y2;
        } else {
            this.ytCoordinate = y1;
            this.ybCoordinate = y2;
            this.height = y2-y1;
        }
    }



    /*for(var xPosition = this.xlCoordinate; xPosition < this.xrCoordinate; xPosition++) {
        for(var yPosition = this.ytCoordinate; yPosition < this.ybCoordinate; yPosition++) {*/
    /* TODO: Figure out what to do with corners, options (currently using 1):
    (1)  ttttttttt  (2) lllltttttt  (3) ttttttttttttt
         ttttttttt      lllltttttt      llttttttttttt
         ttttttttt      lllltttttt      llltttttttttt
         llll           llll            llll
         llll           llll            llll
         llll           llll            llll

     */

    public generateCanvasBox() {

        var imgData: imageData = new imageData();
        imgData.setSize(this.width,this.height);

        for(var xPosition = 0; xPosition < this.width; xPosition++) {
            for(var yPosition = 0; yPosition < this.height; yPosition++) {
                if(xPosition < this.lBorderWidth) {
                    imgData.setPixel(this.lBorderColor, xPosition, yPosition);
                }
                else if(xPosition >= (this.width-this.rBorderWidth)) {
                    imgData.setPixel(this.rBorderColor, xPosition, yPosition);
                }
                else if(yPosition < this.tBorderWidth) {
                    imgData.setPixel(this.tBorderColor, xPosition, yPosition);
                }
                else if(yPosition >= (this.height-this.bBorderWidth)) {
                    imgData.setPixel(this.bBorderColor, xPosition, yPosition);
                }
                else {
                    imgData.setPixel(null, xPosition, yPosition);
                }
            }
        }

        return imgData;
    }
}