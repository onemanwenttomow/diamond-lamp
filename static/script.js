var blocks = Array.from(document.getElementsByClassName("block"));
var marker = document.querySelector(".marker");
var bar = document.querySelector(".bar");
var slider = document.querySelector(".slider");
var sliderDistanceFromTop = slider.getBoundingClientRect().top;
var selected;
var userSelectedOpacity = 0.7;

blocks.forEach(block => {
    block.addEventListener("click", selectBlock);
});

marker.addEventListener("mousedown", function(e) {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
});

document.addEventListener("mouseup", function() {
    document.removeEventListener("mousemove", handleMouseMove, false);
});

function handleMouseMove(e) {
    e.preventDefault();
    var distance = e.clientY - 10 - sliderDistanceFromTop;
    selected = document.querySelector(".selected");
    userSelectedOpacity = (400 - (distance + 10)) / 400 + 0.2;
    if (distance >= -10 && distance <= 390) {
        marker.style.top = distance + "px";
        bar.style.top = distance + "px";
        bar.style.height = 410 - e.clientY + sliderDistanceFromTop + "px";
        selected.style.opacity = userSelectedOpacity;
        
        axios.post("/switch-brightness", {
                opacity: userSelectedOpacity - 0.2
            }).then(data => {
                console.log("data: ", data);
            }).catch(err => console.log("err: ", err));
    }
}

function selectBlock(e) {
    blocks.forEach(block => {
        block.classList.remove("selected");
        block.style.opacity = 0.2;
    });
    e.target.style.opacity = userSelectedOpacity;
    e.target.classList.add("selected");

    e.target.id === "off"
        ? slider.classList.add("slider-off")
        : slider.classList.remove("slider-off");

    axios.post("/switch-colour", {
            opacity: userSelectedOpacity - 0.2,
            color: e.target.id
        }).then(data => {
            console.log("data: ", data);
        }).catch(err => console.log("err: ", err));
}
