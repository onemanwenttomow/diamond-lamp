var blocks = Array.from(document.getElementsByClassName("block"));
var marker = document.querySelector('.marker');
var bar = document.querySelector('.bar');
var sliderDistanceFromTop = document.querySelector('.slider').getBoundingClientRect().top

blocks.forEach(block => {
    block.addEventListener("click", selectBlock);
});

marker.addEventListener('mousedown', function() {
    document.addEventListener('mousemove', handleMouseMove);
});

document.addEventListener('mouseup', function() {
    document.removeEventListener("mousemove", handleMouseMove, false);
});

function handleMouseMove(e) {
    var distance = e.clientY - 10 - sliderDistanceFromTop;
    if (distance > -10 && distance < 390) {
        marker.style.top = distance + 'px';
        bar.style.top = distance + 'px';
        bar.style.height = 410 - e.clientY + sliderDistanceFromTop + 'px';
    }
    
}

function selectBlock(e) {
    blocks.forEach(block => {
        block.classList.remove("selected");
    });
    e.target.classList.add("selected");
}
