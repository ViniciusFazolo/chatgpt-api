//variables

const form = document.querySelector("#form");
const txtArea = document.querySelector("#form textarea")
const errorMessage = document.querySelector("#form small")
const spinner = document.querySelector(".spinner")
const clear = document.querySelector("#limpar")

//events

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  
  if(txtArea.value.trim() === null || txtArea.value.trim() === ""){
    nullValueError(true)
    return
  }else{
    nullValueError(false)
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  spinner.style.display = "flex"

  await fetch("http://localhost:8080/chat/getResponse", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(data => {
      insertDataInHtml(data)
      spinner.style.display = ""
    });
  });

clear.addEventListener("click", () => {
  document.querySelector("#main").innerHTML = ""
})

//functions

function insertDataInHtml(data) {
  const mainContainer = document.querySelector("#main");

  mainContainer.innerHTML += `
    <p class="text-result">
      ${data?.result.output.content}
    </p>
    <hr>
  `;

  txtArea.value = ''
}

function nullValueError(error){
    if(error){
        txtArea.style.border = '1px solid red'
        errorMessage.textContent = 'Campo obrigatório'
        errorMessage.style.color = 'red'
    }
    else{
        txtArea.style.border = '1px solid #414141'
        errorMessage.textContent = ''
        errorMessage.style.color = ''    
    }
}
