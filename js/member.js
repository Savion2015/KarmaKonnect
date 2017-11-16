
$(document).ready(function() {
	//logincheck();
$('a.login-window').click(function() {
    
	if($('#loginmenu').text()=="LOGOUT"){
	facebooklogout();
	logout();
	}else{
            //Getting the variable's value from a link 
    var loginBox = $(this).attr('href');

    //Fade in the Popup
    $(loginBox).fadeIn(300);
    
    //Set the center alignment padding + border see css style
    var popMargTop = ($(loginBox).height() + 24) / 2; 
    var popMargLeft = ($(loginBox).width() + 24) / 2; 
    
    $(loginBox).css({ 
        'margin-top' : -popMargTop,
        'margin-left' : -popMargLeft
    });
    
    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);
    
    return false;
	}
});

// When clicking on the button close or the mask layer the popup closed
$('a.close, #mask').live('click', function() { 
  $('#mask , .login-popup').fadeOut(300 , function() {
    $('#mask').remove();  
}); 
return false;
});
});

$(window).ready(function() {
	//logincheck();
});

 $('#login-form input').keydown(function (e) {            
            if (e.keyCode == 13) {
                dologin();
            }
        });
        


        function logincheck() {
			debugger;

			$.ajax(
                        {
                            url: "/wmember/logincheck",
                            dataType: 'json',
                            success: function (data, textStatus, jqxhr) {
                            						
							if(data.status=="fail"){
								//$("#loginmenu").text("LOGIN/SIGNUP");
								checkLoginState1();
                            }
							else{
							$("#loginmenu").text("LOGOUT");
							}
							},
                            error: function (jqxhr, textStatus, errorMessage) {
                            
                            }
                        });
			//alert("loginc");
			checkLoginState();
			
        }

		function logout() {

			$.ajax(
                        {
                            url: "/wmember/logout",
                            dataType: 'json',
                            success: function (data, textStatus, jqxhr) {
                            window.location.href = "home.html";
                            },
                            error: function (jqxhr, textStatus, errorMessage) {
                            
                            }
                        });
			//alert("loginc");
			
        }



		function dologin(){
			debugger;
		var addrobj = "{\"Email\": \"" + $("input#lemail").val() + "\", \"Password\": \"" + $("input#lpassword").val() + "\"}";
                var addrobjs = JSON.stringify(eval("(" + addrobj + ")"));
                $.ajax({
                    type: "POST",
                    url: "/wmember/login",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: addrobjs,
                    success: function (result) {
                       //var result = jQuery.parseJSON("'"+result+"'");
					   //alert(result.msg);
                    if (result.status=="passed") {
						alert("Sucessfully logged in");
                        window.location.href = "home.html";
                    }
					else{
					alert("Login failed try again.");
					}                        
                    },
					error: function (error) {
                
					}
					
                });
		}

		function logincheck() {
			debugger;

			$.ajax(
                        {
                            url: "/wmember/logincheck",
                            dataType: 'json',
                            success: function (data, textStatus, jqxhr) {
                            						
							if(data.status=="fail"){
								//$("#loginmenu").text("LOGIN/SIGNUP");
								checkLoginState1();
                            }
							else{
							$("#loginmenu").text("LOGOUT");
							}
							},
                            error: function (jqxhr, textStatus, errorMessage) {
                            
                            }
                        });
			//alert("loginc");
			
			
        }	

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }


/*	
 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1977006865915530',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //  // These three cases are handled in the callback function.
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
		$("#loginmenu").text("LOGOUT");
		$('#login-box').hide();

    });
  }

  function facebooklogout(){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                FB.logout(function(response) {
                    // this part just clears the $_SESSION var
                    // replace with your own code
                    $.post("/logout").done(function() {
                        alert("Logged out.");
                    });
                });
            }
        });
    }
	*/