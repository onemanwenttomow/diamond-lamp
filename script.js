var blocks = Array.from(document.getElementsByClassName("block"));

blocks.forEach(block => {
    block.addEventListener("click", selectBlock);
});

function selectBlock(e) {
    blocks.forEach(block => {
        block.classList.remove("selected");
    });
    e.target.classList.add("selected");
}
