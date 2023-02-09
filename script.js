//Get our document ready
$(document).ready(
  function () {
    //Define API key in constant APIKEY
    const APIKEY = "63e3ceff478852088da67ed7";
    //getUsers();
    //$("success-msg").hide();
    $("#update-message-alert").hide();
    console.log("script");
    //Create submit form listener
    $("#user-submit").on("click", function (e) {
      //prevent default action of button
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
        FirstName: userfname,
        LastName: userlname,
        EmailAddress: useremail,
        Password: userpassword,
        ContactNumber: usercontact,
        BillingAddress: userbilling,
      };

      var settings = {
        async: true,
        crossDomain: true,
        url: "https://vhdla-26d3.restdb.io/rest/memberaccount",
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        },

        processData: false,
        data: JSON.stringify(jsondata),
        beforeSend: function () {
          //disable button/show loading bar
          $("#user-submit").prop("disabled", true);
          //clear our form using the form id and triggering it's reset feature
          $("#add-user-form").trigger("reset");
          console.log("POST!!");
        },
      };
      //calls ajax
      $.ajax(settings).done(function (response) {
        console.log("done");
        console.log(response);
        
        $("#user-submit").prop("disabled", false);
        $("#success-msg").show().fadeOut(3000);
      });
      
    });

    // //user login
    // $("#user-login").on("click", function (e) {
    //   //prevent default action of button
    //   e.preventDefault();

    //   let useremail = $("#user-email").val();
    //   let userpassword = $("#user-password").val();

    //   let jsondata = {
    //     EmailAddress: useremail,
    //     Password: userpassword,
    //   };
    //   console.log("in userlogin");
    // var settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://vhdla-26d3.restdb.io/rest/memberaccount",
    //   "method": "GET",
    //   "headers": {
    //     "content-type": "application/json",
    //     "x-apikey": APIKEY,
    //     "cache-control": "no-cache"
    //   },
    //   //processData: false,
    //   data: JSON.stringify(jsondata)
    // }

    // $.ajax(settings).done(function (response2) {
    //   console.log(response2);

    //   if(response.indexOf("response") !== -1) {  
    //   console.log("Yes, the value exists!"); 
    //   $("#update-message-alert").show();

    // }   
    // else  {  
    //   alert("You have keyed in the wrong credentials, please try again.");
    //   console.log("No, the value is absent."); 
    // }  

    // });
  //})

  function getUsers(all = true){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://vhdla-26d3.restdb.io/rest/memberaccount",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        //processData: false,
        data: JSON.stringify(jsondata)
      }
  
      $.ajax(settings).done(function (response2) {
        console.log(response2);
        
        let credential = "";

        for (var i = 0; i < response.length; i++){
          credential = `${credential}`
          if(response2.indexOf(credential) !== -1) {  
              console.log("Yes, the value exists!"); 
              $("#update-message-alert").show();
        
            }   
            else  {  
              alert("You have keyed in the wrong credentials, please try again.");
              console.log("No, the value is absent."); 
            }  
        }

  })
  }
  });
