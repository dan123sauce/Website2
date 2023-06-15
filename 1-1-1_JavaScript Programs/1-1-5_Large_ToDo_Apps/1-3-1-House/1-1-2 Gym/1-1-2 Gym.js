
/*                                    Generic Todo List               */
todoMain();

function todoMain() {
  const DEFAULT_OPTION = "Choose Date";

  let inputElem,
    inputElem2,
    dateInput,
    timeInput,
    button,
    selectElem,
    buyList = [];

  getElements();
  addListeners();
  load();
  renderRows();
  updateSelectOptions();

  function getElements() {
    inputElem = document.getElementsByTagName("input")[0];
    inputElem2 = document.getElementsByTagName("input")[1];
    dateInput = document.getElementById("dateInput");
    timeInput = document.getElementById("timeInput");
    button = document.getElementById("addBtn");
    selectElem = document.getElementById("categoryFilter");
  }

  function addListeners() {
    button.addEventListener("click", addEntry, false);
    selectElem.addEventListener("change", filterEntries, false);
  }

  function addEntry(event) {

    let inputValue = inputElem.value;
    inputElem.value = "";

    let inputValue2 = inputElem2.value;
    inputElem2.value = "";

    let dateValue = dateInput.value;
    
    if (dateValue == ""){
      let dateObj = new Date();
      let year = dateObj.getFullYear();
      let month = dateObj.getMonth() + 1;
      let day = dateObj.getDate() - 1;
      let fullDate = year + "-" + month + "-" + day
      dateValue = fullDate;
    }

    let timeValue = timeInput.value;

    dateInput.value = "";

    let obj = {
      id: _uuid(),
      todo: inputValue,
      category: inputValue2,
      date: dateValue,
      time: timeValue,
      done: false,
    };

    rendowRow(obj);
    buyList.push(obj);
    save();
    updateSelectOptions();
  }

  function filterEntries() {

    let selection = selectElem.value;

    if (selection == DEFAULT_OPTION) {

      let rows = document.getElementsByTagName("tr");

      Array.from(rows).forEach((row, index) => {
        row.style.display = "";
      });

    } else {
      let rows = document.getElementsByTagName("tr");

      Array.from(rows).forEach((row, index) => {
        if (index == 0) {
          return;
        }

        let category = row.getElementsByTagName("td")[1].innerText;
        if (category == selectElem.value) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }


  }

  function updateSelectOptions() {
    let options = [];

    let rows = document.getElementsByTagName("tr");

    Array.from(rows).forEach((row, index) => {
      if (index == 0) {
        return;
      }
      let category = row.getElementsByTagName("td")[1].innerText;

      //if (!options.includes(category)) {
      options.push(category);
      //} 
    });

    let optionsSet = new Set(options);

    // empty the select options
    selectElem.innerHTML = "";

    let newOptionElem = document.createElement('option');
    newOptionElem.value = DEFAULT_OPTION;
    newOptionElem.innerText = DEFAULT_OPTION;
    selectElem.appendChild(newOptionElem);

    for (let option of optionsSet) {
      let newOptionElem = document.createElement('option');
      newOptionElem.value = option;
      newOptionElem.innerText = option;
      selectElem.appendChild(newOptionElem);
    }
  }

  function save() {
    let stringified = JSON.stringify(buyList);
    localStorage.setItem("gym", stringified);
  }

  function load() {
    let retrieved = localStorage.getItem("gym");
    buyList = JSON.parse(retrieved);
    console.log(typeof buyList)
    if (buyList == null)
    buyList = [];
  }
  
  function renderRows() {
    buyList.forEach(todoObj => {

      //  let todoEntry = todoObj["todo"];
      //  let key = "category"
      //  let todoCategory = todoObj[key];
      
      rendowRow(todoObj);
    })
  }

  function rendowRow({todo: inputValue, category: inputValue2, id, date, time,  done}){

    // add a new row

    let table = document.getElementById("todoTable");

    let trElem = document.createElement("tr");
    table.appendChild(trElem);

    // checkbox cell
    let checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
    checkboxElem.addEventListener("click", checkClickCallback, false);

    checkboxElem.dataset.id = id;
    let tdElem1 = document.createElement("td");
    tdElem1.appendChild(checkboxElem);
    trElem.appendChild(tdElem1);

    // date cell
    let dateElem = document.createElement("td");
    let dateObj = new Date(date);
    let formatedDate = dateObj.toLocaleDateString("en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",

    })

    dateElem.innerText = formatedDate;
    trElem.appendChild(dateElem);

    //time cell
    if (time == ""){
      let today = new Date()
      time = today.getHours() + ":" + today.getMinutes()
    }
    let tiemElem = document.createElement("td");
    tiemElem.innerText = time;
    trElem.appendChild(tiemElem);

    // to-do cell
    let tdElem2 = document.createElement("td");
    tdElem2.innerText = inputValue;
    trElem.appendChild(tdElem2);



    // delete cell
    let spanElem = document.createElement("span");
    spanElem.innerText = "delete";
    spanElem.className = "material-symbols-outlined"; 
    spanElem.addEventListener("click", deleteItem, false);
    spanElem.dataset.id = id;
    let tdElem4 = document.createElement("td");
    tdElem4.appendChild(spanElem);
    trElem.appendChild(tdElem4);

    console.log(done);
    checkboxElem.type="checkbox";
    checkboxElem.checked = done;
    if (done) {
      trElem.classList.add("strike");
    } else {
      trElem.classList.remove("strike");
    }

    function deleteItem() {
      trElem.remove();
      updateSelectOptions();

      trElem.classList.toggle("strike");
      for(let i = 0; i < buyList.length; i++){
        if(buyList[i].id == this.dataset.id)
        buyList.splice(i, 1)
      }
      save();

    }

    function checkClickCallback() {
      trElem.classList.toggle("strike");
      for(let i = 0; i < buyList.length; i++){
        if(buyList[i].id == this.dataset.id)
        buyList[i] ["done"] = this.checked;
      }
      save();
    }
  }
    function _uuid() {
      var d = Date.now();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }
}
