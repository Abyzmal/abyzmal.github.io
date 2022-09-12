function filterCategory(filterSelection, filterBy){
    let itemsToFilter = Array.from(document.getElementsByClassName("RecipeCardWrapper"))
    for(let listItem of itemsToFilter){
        if(listItem.dataset[filterSelection] === filterBy){
            listItem.style.display = "flex";
        } else {
            listItem.style.display = "none";
            /*the java script that does the sorting to filter items inside the data sets so they ccan be listed on the html. */
        }
    }
}

