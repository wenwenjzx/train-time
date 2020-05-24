var Config = {
    apiKey: "AIzaSyC0-OmW3rOXtvQzwP1qk9SaaU4XPe825hs",
    authDomain: "train-time-abdd2.firebaseapp.com",
    databaseURL: "https://train-time-abdd2.firebaseio.com",
    projectId: "train-time-abdd2",
    storageBucket: "train-time-abdd2.appspot.com",
    messagingSenderId: "706195900382",
    appId: "1:706195900382:web:70b43e423dad5891cebf4f",
    measurementId: "G-XGRYE3YVC4"
  };
  // Initialize Firebase
  firebase.initializeApp(Config);
  

  var trainData = firebase.database();

  $("#addTrainBtn"). on("click", function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain =moment( $("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
      var frequency = $("#frequencyInput").val().trim();

      var newTrain ={
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }
      trainData.ref().push(newTrain);

      alert("train Added! ");

      $("#trainNaameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("frequencyInpt").val("");

      return false;
  })

  trainData.ref().on("child_added",function(snapshot){
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency =snapshot.val().frequency;
      var firstTrain = snapshot.val().firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"m").format ("hh:mm A");

      console.log(remainder);
      console.log(minutes);
      console.log(arrival);

      $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+ destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><td>");
  })