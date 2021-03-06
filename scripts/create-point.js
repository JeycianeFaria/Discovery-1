//pegando os Estados da API
function populateUFs () {
    const ufSelect =  document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })

}

populateUFs();

//pegando as Cidades da API de acordo com o Estado selecionado
function getCities(event) {
    const citySelect =  document.querySelector("select[name=city]");
    const stateInput =  document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false

    })

}



    document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities);


//Items de Coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);
}


 const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target 

    //add or remove an class with JavaScript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => item == itemId )//isso será true ou false 

    
    //se já estiver selecionado tirar da seleção

    if(alreadySelected >= 0){
        //tirar da seleção
        const filterItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId  //false ou true 
            return itemIsDifferent
        })

        selectedItems = filterItems
    }else{
        //se não estiver selecionado, adicionar à seleção
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}
