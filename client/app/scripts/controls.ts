
$(document).ready(function() {
    document.addEventListener('keydown', function(event) {
        /* w - up*/
        if(event.keyCode == 87) {
            alert('Up was pressed');
        }
        /* s - down */
        else if(event.keyCode == 83) {
            alert('Down was pressed');
        }
        /* a - left */
        else if(event.keyCode == 65) {
            alert('Left was pressed');
        }
        /* d - right */
        else if(event.keyCode == 68) {
            alert('Right was pressed');
        }
    });

    var isDragging = false;
    $(document).mousedown(function() {
        isDragging = false;
    }).mousemove(function() {
            isDragging = true;
    }).mouseup(function() {
        var wasDragging = isDragging;
        isDragging = false;
        if (wasDragging) {
            console.log("dragging");
        }
    });

});