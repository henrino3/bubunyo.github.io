

// - Noel Delgado | @pixelia_me


var nodes  = document.querySelectorAll('li.prj'),
    _nodes = [].slice.call(nodes, 0);

var getDirection = function (ev, obj) {
    var w = obj.offsetWidth,
        h = obj.offsetHeight,
        x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
        y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
        // d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
        d = closestEdge(x,y,w,h);
        // console.log("x= " + x);
        // console.log("Y= " + y);
  
    return d;
};





function closestEdge(x,y,w,h) {
        var topEdgeDist = distMetric(x,y,w/2,0);
        var bottomEdgeDist = distMetric(x,y,w/2,h);
        var leftEdgeDist = distMetric(x,y,0,h/2);
        var rightEdgeDist = distMetric(x,y,w,h/2);
        var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
        switch (min) {
            case leftEdgeDist:
                return 3;
            case rightEdgeDist:
                return 1;
            case topEdgeDist:
                return 0;
            case bottomEdgeDist:
                return 2;
        }
}

function distMetric(x,y,x2,y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
}






var addClass = function ( ev, obj, state ) {
    var direction = getDirection( ev, obj ),
        class_suffix = "";

    console.log("direction"+direction);
    
    obj.className = "";
    
    switch ( direction ) {
        case 0 : class_suffix = '-top';    break;
        case 1 : class_suffix = '-right';  break;
        case 2 : class_suffix = '-bottom'; break;
        case 3 : class_suffix = '-left';   break;
    }
    
    obj.classList.add( state + class_suffix );
};

// bind events
_nodes.forEach(function (el) {
    el.addEventListener('mouseover', function (ev) {
        addClass( ev, this, 'in' );
    }, false);

    el.addEventListener('mouseout', function (ev) {
        addClass( ev, this, 'out' );
    }, false);
});