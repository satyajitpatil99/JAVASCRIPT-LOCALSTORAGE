// validate form inputs before submiting data
function validateForm(){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if(name == ""){
        alert("Name is required");
        return false;
    }
    if(age == ""){
        alert("Age is required");
        return false;
    }
    else if(age < 1){
        alert("Age must not be zero or less than zero");
        return false;
    }
    if(address == ""){
        alert("Address is required");
        return false;
    }
    if(email == ""){
        alert("Email is required");
        return false;
    }
    else if(!email.includes("@")){
        alert("Invalid email address")
        return false;
    }
    return true;
}

// Function to show data
function showData(){
    var peopeleList;
    if(localStorage.getItem("peopeleList") == null){
        peopeleList = [];
    }
    else{
        peopeleList = JSON.parse(localStorage.getItem("peopeleList"));
    }
    var html = "";
    peopeleList.forEach(function(element,index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick ="deletData('+ index +')"class="btn btn-danger">Delete</button>  <button onclick="updatedata('+ index +')"class="btn btn-warning">Edit</button></td>';
        html += "</tr>";
    });
    document.querySelector("#crudeTable tbody").innerHTML = html;
}
// Loads All data when document or page loaded
document.onload = showData();
// function to add data to local storage
function AddData(){
// If form is validate
if(validateForm() == true){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    var peopeleList;
    if(localStorage.getItem("peopeleList") == null){
        peopeleList = [];
    }
    else{
        peopeleList = JSON.parse(localStorage.getItem("peopeleList"));
    }

    peopeleList.push({
        name : name,
        age : age,
        address : address,
        email : email,
    });
    localStorage.setItem("peopeleList", JSON.stringify(peopeleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
}

}
// function to delete data from local storage
function deletData(index){
    var peopeleList;
    if(localStorage.getItem("peopeleList") == null){
        peopeleList = [];
    }
    else{
        peopeleList = JSON.parse(localStorage.getItem("peopeleList"));

    }

    peopeleList.splice(index,1);
    localStorage.setItem("peopeleList", JSON.stringify(peopeleList));
    showData();
}

// function to edit data in local storage
function updatedata(index){
// submit will be hide and update button will be show for updating of data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopeleList;
    if(localStorage.getItem("peopeleList") == null){
        peopeleList = [];
    }
    else{
        peopeleList = JSON.parse(localStorage.getItem("peopeleList"));

    }

    document.getElementById("name").value = peopeleList[index].name;
    document.getElementById("age").value = peopeleList[index].age;
    document.getElementById("address").value = peopeleList[index].address;
    document.getElementById("email").value = peopeleList[index].email;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            peopeleList[index].name = document.getElementById("name").value;
            peopeleList[index].age = document.getElementById("age").value;
            peopeleList[index].address = document.getElementById("address").value;
            peopeleList[index].email = document.getElementById("email").value;
            
            localStorage.setItem("peopeleList", JSON.stringify(peopeleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            // update button will hide and submit button will show
             document.getElementById("Submit").style.display = "block";
             document.getElementById("Update").style.display = "none";
        }
    }

}