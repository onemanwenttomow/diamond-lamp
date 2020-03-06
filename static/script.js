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

// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then(data => {
    console.log(data); // JSON data parsed by `response.json()` call
});


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
