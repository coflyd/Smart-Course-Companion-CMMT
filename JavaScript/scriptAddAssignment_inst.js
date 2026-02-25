/*  ---------------------------------------------
SMART COURSE COMPANION — scriptAddAssignment_inst.js
Description: Managing Assignments as Instructor on Dashboard
By Thushika Thavarajah (27516126)
-------------------------------------------------- */

/* Get elements to identify which elements are associated with each user input*/
let addButton = document.getElementById("addAssignmentBtn");
let tableBody = document.getElementById("assignmentTable");
let titleInput = document.getElementById("title");
let dueDateInput = document.getElementById("dueDate");
let weightInput = document.getElementById("weight");
let pointsInput = document.getElementById("points");

/* Add button click */
addButton.addEventListener("click", function () {

    let title = titleInput.value;
    let dueDate = dueDateInput.value;
    let weight = weightInput.value;
    let points = pointsInput.value;

    /* Accounts for empty values */
    if (title == "" || dueDate == "" || weight == "" || points == "") {
        alert("Please fill out missing fields.");
        return;
    }

    /* Create new row */
    let row = document.createElement("tr");

    /*-----Create cells for Assignment Table----- */

    /*Assignment name*/
    let titleCell = document.createElement("td");
    titleCell.textContent = title;

    /*Due Date mm/ dd/ yyyy */
    let dateCell = document.createElement("td");
    dateCell.textContent = dueDate;

    /*Percentage weight of Assignment*/
    let weightCell = document.createElement("td");
    weightCell.textContent = weight + "%";

    /*Total points*/
    let pointsCell = document.createElement("td");
    pointsCell.textContent = points;

    /*Number of Students Submitted- Hardcoded to 0/100 */
    let submissionsCell = document.createElement("td");
    submissionsCell.textContent = "0/100";

    /*Creating cell containing the delete button*/
    let actionsCell = document.createElement("td");

    /* Create Delete button */
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    /* Delete functionality */
    deleteButton.addEventListener("click", function () {
        tableBody.removeChild(row);
    });
    actionsCell.appendChild(deleteButton);

     /* Add Assignment value to table */
    row.appendChild(titleCell);
    row.appendChild(dateCell);
    row.appendChild(weightCell);
    row.appendChild(pointsCell);
    row.appendChild(submissionsCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);

    /* Clear inputs for Add assignment */
    titleInput.value = "";
    dueDateInput.value = "";
    weightInput.value = "";
    pointsInput.value = "";
});
