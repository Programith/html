const MAX = 50;

var canvas, ctx;
var count = 0;
var points = [];

window.onload = function () {
    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 400;
    ctx.fillRect(0, 0, 400, 400);

    var r = 0;
    for (var a = 0; a < MAX; a++) {
        points.push([Math.cos(r), Math.sin(r), 0]);
        r += (Math.PI * 2) / MAX;
    }

    for (var a = 0; a < MAX; a++) {
        points.push([0, points[a][0], points[a][1]]);
    }

    for (var a = 0; a < MAX; a++) {
        points.push([points[a][1], 0, points[a][0]]);
    }

    rus();
};

function rus() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    var tim = count / 5;

    for (var e = 0; e < 3; e++) {
        tim *= 1.7;
        var s = 1 - e / 3;
        a = tim / 59;
        var yp = Math.cos(a);
        var yp2 = Math.sin(a);
        a = tim / 23;
        var xp = Math.cos(a);
        var xp2 = Math.sin(a);
        var p2 = [];

        for (var a = 0; a < points.length; a++) {
            var x = points[a][0];
            var y = points[a][1];
            var z = points[a][2];

            var y1 = y * yp + z * yp2;
            var z1 = y * yp2 - z * yp;
            var x1 = x * xp + z1 * xp2;

            z = x * xp2 - z1 * xp;
            z1 = Math.pow(2, z * s);
            x = x1 * z1;
            y = y1 * z1;
            p2.push([x, y, z]);
        }

        s *= 120;
        for (var d = 0; d < 3; d++) {
            for (var a = 0; a < MAX; a++) {
                const b = p2[d * MAX + a];
                const c = p2[((a + 1) % MAX) + d * MAX];
                ctx.beginPath();
                ctx.strokeStyle = "hsla(" + (((a / MAX) * 360) | 0) + ",70%,60%,0.15)";
                ctx.lineWidth = Math.pow(6, b[2]);
                ctx.lineTo(b[0] * s + 200, b[1] * s + 200);
                ctx.lineTo(c[0] * s + 200, c[1] * s + 200);
                ctx.stroke();
            }
        }
    }
    count++;
    requestAnimationFrame(rus);
}