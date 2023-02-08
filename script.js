//Get our document ready
$(document).ready(function(){
    //Define API key in constant APIKEY
    const APIKEY = "63d26f58a95709597409cfe7";
    getUsers();
    //$("success-msg").hide();
    
    //Create submit form listener
    $("#user-submit").on("click", function(e){
      e.preventDefault();
      //Retrieve data that user has keyed in
      let userfname = $("#user-fname").val();
      let userlname = $("#user-lname").val();
      let useremail = $("#user-email").val();
      let userpassword = $("#user-password").val();
      let usercontact = $("#user-contact").val();
      let userbilling = $("#user-billing").val();
      console.log("Retrieved values!!");
      //get form values when submit is clicked
      let jsondata = {
        "First Name": userfname,
        "Last Name": userlname,
        "Email Address": useremail,
        "Password": userpassword, 
        "Contact Number": usercontact,
        "Billing Address": userbilling
  
      };
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://vhdla-26d3.restdb.io/rest/memberaccount?max=2",
        "method": "POST", //use POST to send info
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
      },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
            //disable button/show loading bar
            $("#user-submit").prop( "disabled", true);
            //clear our form using the form id and triggering it's reset feature
            $("#add-user-form").trigger("reset");
            window.location.href = "/4. Member Page/create-sucess.html";
      }
          
    }
        console.log("POST!!");
        $.ajax(settings).done(function (response) {
          console.log(response);
          $("#user-submit").prop("disabled", false);
  
          $("#success-msg").show().fadeOut(3000);
          //update user table
          getUsers();
        });
    });
    //create function to allow to retrieve all information
    function getUsers(limit = 10, all = true) {
  
      //create AJAX settings
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://vhdla-26d3.restdb.io/rest/memberaccount",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
          console.log("GET!!");
  
          //make AJAX calls
          $.ajax(settings).done(function (response) {
  
            let content = "";
  
            for (var i = 0; i < response.length && 1 < limit; i++){
                content = `${content}<tr id='${response[i]._id}'><td>${response[i].FirstName}</td>
                <td>${response[i].LastName}</td>
                <td>${response[i].EmailAdd}</td>
                <td>${response[i].Password}</td>
                <td>${response[i].Contact}</td>
                <td>${response[i].BillingAdd}</td>
                <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td>
                <td><a href='#update-student-container' class='update' data-id='${response[i]._id}' data-name='${response[i].FirstName}' data-id='${response[i].LastName}' data-mentor='${response[i].EmailAdd} data-class='${response[i].Contact} data-course='${response[i].BillingAdd} data-year='${response[i].Postal}'>Update</a></td></tr>`;
                $("#user-list tbody").html(content);
  
                $("#total-users").html(response.length);
            }
            //console.log(response);
          });
    }
  
    //create update listener
    $("#user-submit").on("click", ".update", function(e){
        e.preventDefault();
  
        //update data to form
        let userfname = $(this).data("First Name");
        let userlname = $(this).data("Last Name");
        let useremail = $(this).data("Email Address");
        let userpassword = $(this).data("Password");
        let usercontact = $(this).data("Contact Number");
        let userbilling = $(this).data("Billing Address");
        console.log($(this).data("First Name"));
  
        $("#update-user-fname").val(userfname);
        $("#update-user-lname").val(userlname);
        $("#update-user-email").val(useremail);
        $("#update-user-password").val(userpassword);
        $("#update-user-contact").val(usercontact);
        $("#update-user-billing").val(userbilling);
        $("#update-user-container").show();
        });
        $("#update-contact-submit").on("click", function (e) {
          e.preventDefault();
          //retrieve all my update form values
          let userfname = $("#update-user-fname").val();
          let userlname = $("#update-user-lname").val();
          let useremail = $("#update-user-email").val();
          let userpassword = $("#update-user-password").val();
          let usercontact = $("#update-user-contact").val();
          let userbilling = $("#update-user-billing").val();
  
        updateForm(userfname, userlname, useremail, userpassword, usercontact, userbilling); 
        });
        function updateForm(userfname, userlname, useremail, userpassword, usercontact, userbilling){
        var  jsondata = {
          "First Name": userfname,
          "Last Name": userlname,
          "Email Address": useremail,
          "Password": userpassword, 
          "Contact Number": usercontact,
          "Billing Address": userbilling
        
        };
  
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://vhdla-26d3.restdb.io/rest/memberaccount/(ObjectID)",
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
      }
      console.log("PUT!!")
  
      $.ajax(settings).done(function(response){
        console.log(response);
  
        $("#update-user-container").fadeOut(5000);
        //update table
        getUsers();
        });
      }
  });
  
  