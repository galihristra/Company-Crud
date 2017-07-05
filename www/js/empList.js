$('body').on('pageshow', "#empListPage", function(event){
    db = window.openDatabase("abcDB", "0.1", "ABC Company DB", 1000);
    db.transaction(loadEmpList, txError, txSuccess);
});

function loadEmpList(tx){
    tx.executeSql("SELECT firstname, lastname FROM employees", [], txSuccessLoadEmployees);
}

function txSuccessLoadEmployees(tx, results){
    console.log("Read Employee List Success");
    
    if(results.rows.length){
        var len = results.rows.length;
        var emp;
        for(var i = 0; i < len; i++){
            emp = results.rows.item(i);
            $('#empList').append("<li><h4>" + emp.firstname + " " + emp.lastname + "</h4></li>");
        }
        $('#empList').listview('refresh');
    }
}