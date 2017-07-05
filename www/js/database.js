var db;

$('#homepage').bind('pageinit', function(event){
    db = window.openDatabase("abcDB", "0.1", "ABC Company DB", 1000);
    db.transaction(createDB, txError, txSuccess);
});

function createDB(tx){
    tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='employees'", [], function (tx, result){
        if(result.rows.length == 0){
            // if table doesnt exists
            tx.executeSql("CREATE TABLE employees(firstname text, lastname text, birthdate date, email text, address text)");
        }
    })
};

function txError(Error){
    console.log(Error);
    console.log("Database Error : " + Error);
}

function txSuccess(){
    console.log("DB Success.");
}

function addNewEmployee(){
    navigator.notification.confirm("Add This Employee ?", function(buttonPressed){
        if (buttonPressed == 1){
//            alert('save');
            db = window.openDatabase("abcDB", "0.1", "ABC Company DB", 1000);
            db.transaction(addNewEmployeeDB, txError, txSuccessAddEmp);
        }
    }, "Confirm", ["Save", "Cancel"]);
}

function addNewEmployeeDB(tx){
    var fname = $('#addfname').val();
    var lname = $('#addlname').val();
    var birthDate = $('#addbdate').val();
    var email = $('#addemail').val();
    var address = $('#addaddress').val();
    
    tx.executeSql("INSERT INTO employees(firstname, lastname, birthdate, email, address) VALUES (?, ?, ?, ?, ?)", [fname, lname, birthDate, email, address]);
};

function txSuccessAddEmp(){
    navigator.notification.alert("Success !", addEmpSuccess);
//    $.mobile.changePage("empList.html");
}

function addEmpSuccess(){
    $.mobile.changePage("empList.html");
}