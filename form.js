const firebaseConfig = {
    apiKey: "AIzaSyBubPGv219D0KB4NdhLYNPuWRhEUrKXozI",
    authDomain: "techsquaredio.firebaseapp.com",
    databaseURL: "https://techsquaredio-default-rtdb.firebaseio.com",
    projectId: "techsquaredio",
    storageBucket: "techsquaredio.appspot.com",
    messagingSenderId: "247120278795",
    appId: "1:247120278795:web:7b38e0fad788dd75a31e0e"
  };
  firebase.initializeApp(firebaseConfig);
  var feedBackFormDB=firebase.database().ref('feedBackForm');
  
   
  var $ = function (id) { 
    return document.getElementById(id); 
};
  



  
 
  function submitForm(e){
    e.preventDefault();
    var nm=$("name").value;
    var em=$("email").value;
    var fbk=$("feedback").value;
    var rtng=$("rating").selectedOptions[0].value;
    console.log(nm,em,fbk,rtng);
    loadToDB(nm,em,fbk,rtng);
    alert("Submitted,Thankyou for your valuable feedback");
    clearForm();


  }
  function clearForm(){
    $("name").value="";
    $("email").value="";
    $("feedback").value="";
    $("rating").value="";
  }
  const loadToDB=(nm,em,fbk,rtng)=>{
    var newFeedBackForm=feedBackFormDB.push();
    newFeedBackForm.set({
        name: nm,
        emailid: em,
        feedback: fbk,
        rating: rtng,


    });


  }



window.onload=function(){
    $("submit").onclick=submitForm;

}


  