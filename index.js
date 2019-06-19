
// Use navbar to change text

const tabs = document.querySelector(".tabs");
const texts = document.querySelectorAll (".text");
const navs = document.querySelectorAll(".nav")

function changeText (event){
    let targetText = document.querySelector(event.target.dataset.target);

    navs.forEach(function(nav){
        if (nav === event.target){
            nav.classList.add("active");
        } else {
            nav.classList.remove("active");
        }
    });

    texts.forEach(function(text){
        if (text === targetText){
            text.classList.add("active");
        } else {
            text.classList.remove("active");
        }
    });
}
console.log (navs);

tabs.addEventListener("click", changeText);