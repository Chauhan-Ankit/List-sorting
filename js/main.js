function init(){
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        iterateData(data);
    })
}

function iterateData(_data){
    var userIdArray = [];
    ObjectArray = [];
    _data.forEach(function(key, val, arr){
        if(userIdArray.indexOf(key.userId) == "-1"){
            userIdArray.push(key.userId);
            let temp = _data.filter(function(_ele){
               return(_ele.userId == key.userId);
            })
            let obj = new Object();
            obj.id = key.userId;
            obj.info = temp
            ObjectArray.push(obj);
        }
    });
    createDropDown(userIdArray);
}

function createDropDown(_options){
    let sel = document.querySelector("#userIdDD")
    _options.forEach(function(_val){
        let opt = document.createElement("option");
        opt.value = _val;
        opt.text = _val;
        sel.add(opt);
    })
}

function onUserSelect(_flag, _sort){
    let sel = document.querySelector("#userIdDD");
    if(sel.value == "selectUser"){
        alert("Please select userId");
        clearTable();
        return false;
    }

    let filterData = ObjectArray.filter(function(_ele){
        return (_ele.id == sel.value);
    })
    
    if(_flag){
        displayTable(filterData[0].info);
    }
    else{
       let data = sortData(filterData[0].info, _sort);
       displayTable(data);
    }
    
    
}

function clearTable(){
    var tableEl = document.querySelector("table");
    for (var i = tableEl.rows.length - 1; i > 0; i--) {
        tableEl.deleteRow(i);
    }
}

function displayTable(_data) {
    clearTable();
    let tableEl = document.querySelector("table");

    _data.forEach(function(_key, _val){
        rowEl = tableEl.insertRow();

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.disabled = true;
        checkbox.checked = _key.completed;
        
        rowEl.insertCell().textContent = _key.id ;      
        rowEl.insertCell().textContent = _key.title ;
        rowEl.insertCell().appendChild(checkbox) ;
    })
}

function sortData(_data, _sort){
    var _obj = _data.slice(0);

    switch(_sort) {
        case "id":
            let todoID = document.querySelector("#todoID");
            let idOrder = todoID.getAttribute("data-order");
        
            _obj.sort(function(a,b) {   
                return (idOrder == "asc")? b.id - a.id : a.id - b.id 
            });
            (idOrder == "asc")? todoID.setAttribute("data-order", "dsc"):todoID.setAttribute("data-order", "asc");
        break;
        case "title":
            let todoTitle = document.querySelector("#todoTitle");
            let titleOrder = todoTitle.getAttribute("data-order");
        
            _obj.sort(function(a,b) {
                console.log(a.title ,b.title);
                return (titleOrder == "asc")? b.title.localeCompare(a.title) : a.title.localeCompare(b.title); 
            });
            (titleOrder == "asc")? todoTitle.setAttribute("data-order", "dsc"):todoTitle.setAttribute("data-order", "asc");

        break
        case "completed":
            let todoCompleted = document.querySelector("#todoCompleted");
            let completeOrder = todoCompleted.getAttribute("data-order");
        
            _obj.sort(function(a,b) {   
                return (completeOrder == "asc")? b.completed - a.completed : a.completed - b.completed 
            });
            (completeOrder == "asc")? todoCompleted.setAttribute("data-order", "dsc"):todoCompleted.setAttribute("data-order", "asc");
        break;
    }
        
    return _obj;
}

init();

