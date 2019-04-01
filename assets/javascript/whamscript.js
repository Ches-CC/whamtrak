// alert("This page is on time!");

$(document).ready(function () {

    //declaring g'variables for the functions to follow
    //basically inputs from 
    var trainName = "";
    var destinationInput = "";
    var firstTime = "";
    var frequencyInput = "";
    var nextArrival = "";
    var minutesAway = "";

    $("button").on("click", function () {

        event.preventDefault();

        //employ jquery to capture input values
        var trainName = $("#train-name").val().trim();
        var destinationInput = $("#destination-input").val().trim();
        var firstTime = $("#first-time").val().trim();
        var frequencyInput = $("#frequency-input").val().trim();

        //Found online: to validate the input as military time
        // function checkForm(form)
        // {
        //   // regular expression to match required time format
        //     //   re = /^\d{0,1,2}:\d{1,2,3,}([ap]m)?$/;
        //   if(form.starttime.value != '' && !form.starttime.value.match(re)) {
        //     alert("Invalid time format: " + form.starttime.value);
        //     form.starttime.focus();
        //     return false;
        //   }
      
        //   alert("All input fields have been validated!");
        //   return true;
        // }
        

        //Now to work out the Time/Math...
        //-----------
        //[moment.js library, please be kind]
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");  // -1 year, of course (like how we normally tell time)
        // console.log(firstTimeConverted);
        var currentTime = moment(); //quite reasonably captures the current time in an aptly-named a var
        // console.log("Current Time: " + moment(currentTime).format("hh:mm"));
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); //moment.js FTW
        // console.log("Difference in Time: " + diffTime);
        var tRemainder = diffTime % frequencyInput; //"Modulus?" isn't that a lesser-known Marvel villain?
        // console.log(tRemainder);
        var tMinutesTillTrain = frequencyInput - tRemainder; //this part makes sense
        // console.log("Minutes until train: " + tMinutesTillTrain);
        var nextTrain = moment().add(tMinutesTillTrain, "minutes"); //take the minutes 'til next train, add them to current time = next train arrival time. bueno
        var nextArrival = moment(nextTrain).format("hh:mm");
        // console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
        //----------
        //OMG, it worked--that portion would have been IMPOSSIBLE without the "train-example.html"

        //Wait, nope--something is screwy. I fix now! #fixed... some weird variable issue (imagine that!)

        //console log these sweet, sweet values
        console.log("Train name: " + trainName);
        console.log("Destination: " + destinationInput);
        console.log("Virgin Time: " + firstTime);
        console.log("Frequency: " + frequencyInput);
        console.log("Next trains a comin': " + nextArrival);
        console.log("Minutes until train: " + tMinutesTillTrain);


        //reset the form after submission
        $("form").trigger("reset");

        //set--nay--PUSH the input values to the database
        database.ref().push({

            trainName: trainName,
            destinationInput: destinationInput,
            firstTime: firstTime,
            frequencyInput: frequencyInput,
            nextTrain: nextArrival,
            minutesAway: tMinutesTillTrain,

        });
        

    });

    database.ref().on("child_added", function (DataSnapshot) {

        //I had a brutal error of ALL my database rows populating on each click
        //There were many ill-fated attempt to fix this issue (before simply moving the function out of the click event)
        //Some of the following code may or may not be vestigal remnants of those ill-fated attempts
        //Thank you for your patience & understanding
        var childArray = [];



        //easier to type out & read this way, or so I've heard
        var response = DataSnapshot.val();

        // console.log(response);
        childArray.push(response);
        // console.log(childArray.length);

        //storing database info (via JSON-type file) into new variables 
        var tName = response.trainName;
        var tDestination = response.destinationInput;
        var tFrequency = response.frequencyInput;
        var tNextArrival = response.nextTrain;
        var tMinutesAway = response.minutesAway;


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

})