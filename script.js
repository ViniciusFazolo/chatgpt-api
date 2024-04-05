const form = document.querySelector("#form");
const txtArea = document.querySelector("#form textarea")
const errorMessage = document.querySelector("#form small")

form.addEventListener("submit", (e) => {
  e.preventDefault();

  
  if(txtArea.value.trim() === null || txtArea.value.trim() === ""){
    nullValueError(true)
    return
  }else{
    nullValueError(false)
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch("http://localhost:8080/getResponse", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
    .then(data => insertDataInHtml(data));
});

function insertDataInHtml(data) {
  const mainContainer = document.querySelector("#main");

  mainContainer.innerHTML = `
    ${data.result.output.content}
  `;
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
