// Писать код здесь
const list = document.querySelector('#products')
const addForm = document.querySelector('#add-form') 
const titleInp = document.querySelector('#title')
const priceInp = document.querySelector('#price')
const descInp = document.querySelector('#desc')
const imageInp = document.querySelector('#image')
const modal = document.querySelector('.modal')

const API= 'https://demoweekback-dlia-studientov-1.iskeg76.repl.co/product/'

async function getProducts(){
  const res = await fetch(API)
  const data = await res.json()
  return data
}

async function render(){
  const data = await getProducts()
  console.log(data)
  list.innerHTML=''

  data.products.forEach(card =>{
    list.innerHTML += `
    <div id="${card.id}" class="card">
      <img src='${card.image}' >
      <div class="card-body">
        <h5>${card.price} $</h5>
        <p>${card.title}</p>
        <span>${card.description}</span>
        <button class='btn-delete'>Удалить объявление</button>
      </div>
    </div>
    `
  })
}
render()

async function addProduct(newProduct){
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  })
  render()
}


addForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if(
    !titleInp.value.trim() || 
    !priceInp.value.trim() || 
    !descInp.value.trim() || 
    !imageInp.value.trim() 
  ){
    alert("Заполните все поля, пожалуйста :(")
    return
  }

  const product={
    title: titleInp.value,
    price: priceInp.value,
    description: descInp.value,
    image: imageInp.value
  }
  addProduct(product)
  
  titleInp.value = ''
  priceInp.value = ''
  descInp.value = ''
  imageInp.value = ''
  
  modal.style.display='none'
})

async function deleteProduct(id){
  await fetch(`${API}${id}/`, {
    method:'DELETE'
  });
  render()
}

document.addEventListener("click", (e) => {
  if(e.target.classList.contains('btn-delete')){
    console.log('est')
    const id = e.target.closest('.card').id
    deleteProduct(id)
  }
})





































