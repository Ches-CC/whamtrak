// alert("This page is on time!");

$(document).ready(function(){

    //declaring g'variables for the functions to follow
    //basically inputs from 
    var trainName = "";
    var destinationInput = "";
    var firstTime = "";
    var frequencyInput = "";
    var nextArrival = "";
    var minutesAway = "";

    $("button").on("click", function() {
        
        event.preventDefault();

        //employ jquery to capture input values
        var trainName = $("#train-name").val().trim();
        var destinationInput = $("#destination-input").val().trim();
        var firstTime = $("#first-time").val().trim();
        var frequencyInput = $("#frequency-input").val().trim();

        //console log those sweet, sweet values
        console.log(trainName);
        console.log(destinationInput);
        console.log(firstTime);
        console.log(frequencyInput);

        //reset the form after submission
        $("form").trigger("reset");

        //set--nay--PUSH the input values to the database
        database.ref().push({

            trainName: trainName,
            destinationInput: destinationInput,
            firstTime: firstTime,
            frequencyInput: frequencyInput,

        });

        //retrieve the values from firebase
        database.ref().on("child_added", function (snapshot){

            //easier to type out & read this way, or so I've heard
            var response = snapshot.val();

            console.log(response);

            //storing database info (via JSON-type file) into new variables 
            var tName = response.trainName;
            var tDestination = response.destinationInput;
            var tFrequency = response.frequencyInput;
            var tNextArrival = "";
            var tMinutesAway = "";

            //now to push the info back to the table
            var newRow = $("<tr>");

            var newTrainName = $("<td>");
            newTrainName.text(tName);
            newRow.append(newTrainName);

            var newDestination = $("<td>");
            newDestination.text(tDestination);
            newRow.append(newDestination);

            var newFrequency = $("<td>");
            newFrequency.text(tFrequency);
            newRow.append(newFrequency);

            var newNextArrival = $("<td>");
            newNextArrival.text(tNextArrival);
            newRow.append(newNextArrival);

            var newMinutesAway = $("<td>");
            newMinutesAway.text(tMinutesAway);
            newRow.append(newMinutesAway);

            //now that it's all ready, kick it out to the HTML
            $("tbody").append(newRow);

        })
    });





})