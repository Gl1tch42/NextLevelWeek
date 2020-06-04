function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}


populateUFs()


function getCities(event) {
    const citiesSelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiesSelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citiesSelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citiesSelect.disabled = false
        })

}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itensColeta = document.querySelectorAll(".itens-g li")

for(const item of itensColeta){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItens = document.querySelector("input[name=item]")

let selectedItens = []

function handleSelectedItem (event){
    const itemLi = event.target
    //adicionar ou retirar classe do html pelo JavaScript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    //verifica se existem itens selecionados
    //pega os itens selecionados

    const alreadyselected = selectedItens.findIndex(function(item){
        const itemFound = item == itemId //sera verdade ou falso
        return itemFound
    })
    //se ja estiver selecionado, tirar da seleçao
    if(alreadyselected != -1){
        //tirar da seleçao
        const filteredItens = selectedItens.filter(function(item){
            const itemDifferent = item != itemId
            return itemDifferent
        })
        selectedItens = filteredItens
    }else{
        //se nao, adicionar
        selectedItens.push(itemId)
    }
    collectedItens.value = selectedItens
    
}