let myLeads = []


// DOMs
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


// DISPLAYING THE LEADS
function render(leads){
    let listItems = ""

    for(let i = 0; i<leads.length; i++){
    
    listItems += `
    <li>
        <a href="${leads[i]}" target="_blank">${leads[i]}</a>
    </li>
    `
    }
 
    ulEl.innerHTML = listItems
}



// EventListeners

// SAVE INPUT
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // If we want to use array, we first need to convert it to JSON string.

    render(myLeads)

})

// DELETE ALL
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


// SAVE TAB
tabBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)

        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        // If we want to use array, we first need to convert it to JSON string.

        render(myLeads)
    })

})



