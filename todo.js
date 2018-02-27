//GLOBAL VARIABLES
var descSortAsc = false;
var curSortMethod = 3;
var options = [
    ["Homework", "DeepSkyBlue"],
    ["Chore/Errand", "Lavender"],
    ["Test/Quiz","LightGreen"],
    ["Other","RebeccaPurple"]
];
var tasks = [
    {
        complete: false,
        desc: "Clean room",
        cat: 1,
        deadline: "2018-02-22"
    },
    {
        complete: false,
        desc: "Homework for Web Dev",
        cat: 0,
        deadline: "2018-03-02"
    },
    {
        complete: true,
        desc: "Study for Quiz 1",
        cat: 2,
        deadline: "2018-02-20"
    }
];
/*
 *  Function buildCategories() reads categories from the options array
 *  and adds them to the category select.
 */
function buildCategories(){
    console.log("Building select...");
    var select = document.getElementById("taskCat");
    var optionBuilder = '<option value="">---</option>"';
    for (var i = 0; i < options.length; i++){
        optionBuilder += '<option value="'+i+'">'+options[i][0]+'</option>';
    }
    optionBuilder += "<option disabled>- - - - - - - - - - -</option>";
    optionBuilder += '<option value="NEWCAT">New Category</option>';
    select.innerHTML = optionBuilder;
}
buildCategories();

/*
 *  Reads in values from new category inputs and updates the
 *  category select input
 */
function addCategory(){
    var title = document.getElementById("newCatTitle").value;
    var color = document.getElementById("catColor").value;
    console.log(title + " " + color);
    console.log(options);
    options.push([title,color]);
    buildCategories();
    document.getElementById("newCatDiv").style.display = "none";
}

/*
 * Shows new category input when "New category" is selected
 */
function showNewCat(){
    var select = document.getElementById("taskCat").value;
    if (select == "NEWCAT"){
        document.getElementById("newCatDiv").style.display = "block";
    }
}

/*
 * Submits new task to to-do list
 */
function submitNewTask(){
    var desc = document.getElementById("taskDesc").value;
    var catIndex = document.getElementById("taskCat").value;
    var date = document.getElementById("taskDuedate").value;

    var taskObj = {
            complete: false,
            desc: desc,
            cat: catIndex,
            deadline: date
        };
    tasks.push(taskObj);
    console.log(tasks);
}

function buildTable(){
    var list = document.getElementById("todoList");
    var newTask = "";
    for(var i = 0; i < tasks.length; i++){
        var curTask = tasks[i];
        var catColor = options[curTask.cat][1];
        var catText = options[curTask.cat][0];

        newTask += '<tr style="background-color: '+catColor+'" id="row_'+i+'">';
        if(curTask.complete){
            newTask += '<td class="checkbox_col"><input type="checkbox" checked></td>';
        }else{
            newTask += '<td class="checkbox_col"><input type="checkbox"></td>';
        }

        newTask += '<td class="desc_col">'+curTask.desc+'</td>';
        newTask += '<td class="cat_col">'+catText+'</td>';
        newTask += '<td class="deadline_col">'+curTask.deadline+'</td>';
        newTask += '<th class="remove" onclick="removeTask('+i+')">(remove)</th>';
        newTask += '</tr>';

    }
    list.innerHTML += newTask;
    sortTable(curSortMethod);
}
buildTable();

/*
 * TODO: removeTask removes a given task
 */
function removeTask(index){
    console.log("Remove task at index: " + index);
}
/*
 * Sorts columns in the to-do table; Based on function found at: https://www.w3schools.com/howto/howto_js_sort_table.asp
 */
function sortTable(col) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("todoList");
    switching = true;
    if(col != curSortMethod){
        descSortAsc = false;
        curSortMethod = col;
    }
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 0; i < (rows.length- 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[col];
            y = rows[i + 1].getElementsByTagName("td")[col];
            if(col == 0){
                if(descSortAsc){
                    if(x.getElementsByTagName("input")[0].checked > y.getElementsByTagName("input")[0].checked){
                        shouldSwitch = true;
                        break;
                    }
                }else{
                    if(x.getElementsByTagName("input")[0].checked < y.getElementsByTagName("input")[0].checked){
                        shouldSwitch = true;
                        break;
                    }
                }
            }else{
                if(descSortAsc){
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }else{
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
            }

        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
    if(descSortAsc){
        descSortAsc = false;
    }else{
        descSortAsc = true;
    }
}
sortTable(curSortMethod);