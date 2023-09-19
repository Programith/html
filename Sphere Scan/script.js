/*

@Programith

*/

const SIZE = 350
const LAYER = 20

$(document).ready(function () {
    var container = $(".vr")[0];

    for (var i = 1; i <= LAYER; i++) {

        var outer = document.createElement('div');
        outer.classList.add("vr_layer");
        outer.style.transform = "translateZ(" + ((i * SIZE / LAYER) - (SIZE / 2)) + "px)";
        console.log(i, "translateZ(" + ((i * SIZE / LAYER) - (SIZE / 2)) + "px)");

        var inner = document.createElement('div');
        inner.classList.add("vr_layer_item");
        inner.style.animationDelay = i * -210 + "ms";

        outer.appendChild(inner);
        container.appendChild(outer);
    }
});