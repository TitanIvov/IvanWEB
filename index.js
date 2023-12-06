
const select = document.getElementById("list");
const input = document.getElementById("count");
const output = document.getElementById("answer");
const errorlog = document.getElementById("errorlog");
calc = () => {
    if (isNaN(input.value) || input.value < 0)
    {
        errorlog.style.display = "block";
        errorlog.innerText = "некоректные данные";
        return -1;
    }
    errorlog.style.display = "none";
    output.innerText = select.value * input.value;
}

const button = document.getElementById("button");
window.addEventListener('DOMContentLoaded', function (event) 
{
    button.addEventListener("click", calc);
});

