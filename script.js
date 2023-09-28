let modalka = document.querySelector('.modal')
let openBtn = document.querySelector('.add')
let closeBtn = document.querySelector('.close')
let sendBtn = document.querySelector('.send')

closeBtn.addEventListener("click", () => {
  modalka.style.display = 'none'
})

openBtn.addEventListener("click", () => {
  modalka.style.display = 'block'
})