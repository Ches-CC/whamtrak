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
        //having some issues here--the child_added seems to re-list every entry (vs just he last one)
        database.ref().on("child_added", function (DataSnapshot){

            //going to try and pull just the last value...
           //-----FAIL
            //    let newItems = false;
            //    child.trainName("trainName").on("child_added", DataSnapshot => {
            //        if (!newItems) { return }
            //        console.log("Only last one");
            //    })

            //    database.child("trainName").once("value", () => {
            //        newItems = true;
            //    })
           //----------FAIL

            //Next try: creating an empty array to push DataSnapshots to, then pull the last array item;
            //FAIL: each database item creates its own array--> end up with a bunch of arrays with 0 (1) item;
            var childArray = [];
            


            //easier to type out & read this way, or so I've heard
            var response = DataSnapshot.val();

            // console.log(response);
            childArray.push(response);
            console.log(childArray.length);

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