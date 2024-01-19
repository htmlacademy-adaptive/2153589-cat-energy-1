const draggableButton = document.getElementById("drag-item");
const dragTarget = document.getElementById("drag-target");
const catBefore = document.querySelector(".examples__slider-item--before");
const catBeforeImage = document.querySelector(".examples__slider-item--before img");

const initPosition = draggableButton.offsetLeft;
const parentCoords = dragTarget.getBoundingClientRect();



const dragX = (event) => {
    const el = event.currentTarget;
    const move = (e) => {

        if ((el.offsetLeft + e.movementX) >= 0 && (el.offsetLeft + e.movementX) <= parentCoords.width) {
            el.style.left = `${el.offsetLeft + e.movementX}px`;
            catBefore.style.width = parseInt(el.style.left) + "px";

             if ((el.offsetLeft + e.movementX) > initPosition) {
                 catBeforeImage.style.objectFit="contain";
                catBeforeImage.style.marginLeft = (parentCoords.width - parseInt(el.style.left)) / parentCoords.width * 100 + "%";
              } else if ((el.offsetLeft + e.movementX) <= initPosition) {
                 catBeforeImage.style.objectFit="fill";
                catBefore.style.width = (parentCoords.width - (parentCoords.width - parseInt(el.style.left))) + "px";
              }
        }
    };
    const up = () => {
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", up);
    };

    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
};

draggableButton.addEventListener("pointerdown", dragX);
