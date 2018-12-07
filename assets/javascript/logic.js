
  // Initialize Firebase
  var config = {
    //apiKey: "apiKey will go here",
    authDomain: "billable-hours-webpage.firebaseapp.com",
    databaseURL: "https://billable-hours-webpage.firebaseio.com",
    projectId: "billable-hours-webpage",
    storageBucket: "billable-hours-webpage.appspot.com",
    messagingSenderId: "763843235363"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var userName = "";
  var userRole = "";
  var dateHired = "";
  var monthlyRate = 0;
  var dateFormat = "YYYY-MM-DD";

  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    userName = $("#employee-name").val().trim();
    userRole = $("#employee-role").val().trim();
    dateHired = $("#start-date").val().trim();
    monthlyRate = $("#monthly-rate").val().trim();

    database.ref().push({
        name: userName,
        role: userRole,
        hired: dateHired,
        rate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  });

database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
    var dataName;
    var dataRole;
    var dataDate;
    var months = 0;
    var dataRate;
    var total = 0;

    var employeeRow = $("<tr>");
    var nameCol = $("<td>");
    dataName = snapshot.val().name;
    nameCol.text(dataName);
    var roleCol = $("<td>");
    dataRole = snapshot.val().role;
    roleCol.text(dataRole);
    var startDateCol = $("<td>");
    dataDate = snapshot.val().hired;
    startDateCol.text(dataDate);
    var monthsCol = $("<td>");
    var convertedDate = moment(dataDate, "YYYY-MM-DD");
    months = moment().diff(convertedDate,"months");
    monthsCol.text(months);
    var rateCol = $("<td>");
    dataRate = snapshot.val().rate;
    rateCol.text(dataRate);
    var totalCol = $("<td>");
    total = months * dataRate;
    totalCol.text(total);
    employeeRow.append(nameCol);
    employeeRow.append(roleCol);
    employeeRow.append(startDateCol);
    employeeRow.append(monthsCol);
    employeeRow.append(rateCol);
    employeeRow.append(totalCol);
    $("#employee-info").append(employeeRow);
});