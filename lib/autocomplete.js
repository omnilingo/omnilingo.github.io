// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
/*        icon.onclick = ()=>{
            webLink = "https://demo.omnilingo.xyz/" + userData;
            linkTag.setAttribute("href", webLink);
            console.log(webLink);
            linkTag.click();
        }*/
        emptyArray = languages.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user entered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        // Uniq the list
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = '<li data-value="'+data[1] +'">'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    console.log('select() ' + selectData);
    inputBox.value = selectData;
    var set1 = new Set(language_lookup[selectData]);
    var codes = Array.from(set1);
    console.log('codes:')
    console.log(codes);
    if(codes.length == 1) {
        var webLink = "https://demo.omnilingo.cc/?language=" + codes[0];
        console.log(webLink);
        window.location.href = webLink;
    }

    // FIXME: Probably need to do something here later (e.g. for Ba = pl/fa)
    for(var i = 0; i < codes.length; i++) {
        webLink = "http://demo.omnilingo.cc/language=" + codes[i];
        console.log(i +': ' +  webLink);
        //linkTag.setAttribute("href", webLink);
        //linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

