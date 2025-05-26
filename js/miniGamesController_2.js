var currentNumberOfDragAndDropElements = 0; // zählt die Anzahl der Elemente der JSON-Datei

var questionNumber = 0;
var questionBank = new Array();

var tempDragAndDropBank = new Array();
var dragAndDropBank1 = new Array();
var dragAndDropBank2 = new Array();
var dragAndDropBank3 = new Array();
var dragAndDropBank4 = new Array();
var dragAndDropBank5 = new Array();

var numberOfDragAndDropGamesPlayed = 0;

var numberOfTargetsOfCurrentGame;

// dragAndDropBank[] = new Array();
// dragAndDropBank[][] = new Array();

var q = new Array();
var stage = "#game1";
var stage2 = new Object();
var questionLock = false;
var numberOfQuestions;
var score = 0;
var numberOfFalseOptions = new Array();
var jsonFileName;
var dragAndDropGameTitle;
var dragAndDropGameDescription;
var data;
var numberOfTargets;

var numberOfDragAndDropGames;
var numberOfQuizLists;

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
};

/**
 * 	liest den Namen des Json files in dem alle Inhalte für dieses Spiel gespeichert sind aus der URL aus
 */
var jsonFileName = getUrlParameter("jsonFileName");
var jsonFilePath = "json/" + jsonFileName;

var request = new XMLHttpRequest();
request.open("GET", jsonFilePath, true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    console.log("Success");
    data = JSON.parse(request.responseText);
    console.log(data);
  } else {
    console.log("Server returned an error"); // We reached our target server, but it returned an error
  }
};

request.onerror = function () {
  console.log("ERROR"); // There was a connection error of some sort
};

console.log("Test");
request.send();
console.log(data);

numberOfQuizLists = data.quizGames.length;
numberOfDragAndDropGames = data.DragDropGames.length;

if (numberOfQuizLists > 0) {
  for (var z = 0; z < numberOfQuizLists; z++) {
    /**
     * Alle fragen und antwortmöglichkeiten der quizlist im json werden durchlaufen und in einem 2dimensionalen array gespeichert
     */
    for (i = 0; i < data.quizGames[z].quizlist.length; i++) {
      questionBank[i] = new Array();

      /**
       * 	Die Frage und die richtige Antwort werden an Position 0 und 1 im zweidimensionalen Array gespeichert
       */
      questionBank[i][0] = data.quizGames[z].quizlist[i].question;
      questionBank[i][1] = data.quizGames[z].quizlist[i].optionTrue;

      /**
       * 		Es werden entweder mehrere falsche (SingleChoice Minispiel) oder nur eine Antwortmöglichkeit (Yes/No Minispiele) zum Array hinzugefügt
       */
      for (j = 0; j < data.quizGames[z].quizlist[i].optionFalse.length; j++) {
        questionBank[i][j + 2] = data.quizGames[z].quizlist[i].optionFalse[j];
      }
    }
  } //for(var z=0;z<numberOfQuizLists;z++) {
}

if (numberOfDragAndDropGames > 0) {
  /**
   * 	Die Schleife wird so oft durchlaufen wie es DragDropGames gibt
   */
  for (var k = 0; k < numberOfDragAndDropGames; k++) {
    var tempDragAndDropBankFirstDimension = new Array();

    //

    /**
     * 	Die Schleife wird so oft durchlaufen, wie das jeweilige DragDropGame Elemente hat
     */
    for (var i = 0; i < data.DragDropGames[k].DragAndDropList.length; i++) {
      tempDragAndDropBank[i] = new Array();

      tempDragAndDropBank[i][0] = data.DragDropGames[k].DragAndDropList[i].id;

      tempDragAndDropBank[i][1] =
        data.DragDropGames[k].DragAndDropList[i].target;
      tempDragAndDropBank[i][2] =
        data.DragDropGames[k].DragAndDropList[i].elementtext;

      /**
       * 		Lese game title, description, sowie targettitle aus dem ersten Unterelment im json aus und speichere es im Array an vordefinierter Stelle
       */
      if (data.DragDropGames[k].DragAndDropList[i].id == "d0") {
        dragAndDropGameTitle = data.DragDropGames[k].DragAndDropList[i].title;
        dragAndDropGameDescription =
          data.DragDropGames[k].DragAndDropList[i].description;
        numberOfTargets = data.DragDropGames[k].DragAndDropList[i].targetNumber;

        tempDragAndDropBank[i][3] = dragAndDropGameTitle;
        tempDragAndDropBank[i][4] = dragAndDropGameDescription;
        tempDragAndDropBank[i][5] = numberOfTargets;

        /**
         * Je wie viele Zielkasten definiert sind, werden die verschiedenen Titel im Array an bestimmten Stellen gespeichert
         */
        if (numberOfTargets == 2) {
          tempDragAndDropBank[i][6] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget1;
          tempDragAndDropBank[i][7] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget2;
        }

        if (numberOfTargets == 3) {
          tempDragAndDropBank[i][6] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget1;
          tempDragAndDropBank[i][7] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget2;
          tempDragAndDropBank[i][8] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget3;
        }

        if (numberOfTargets == 4) {
          tempDragAndDropBank[i][6] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget1;
          tempDragAndDropBank[i][7] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget2;
          tempDragAndDropBank[i][8] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget3;
          tempDragAndDropBank[i][9] =
            data.DragDropGames[k].DragAndDropList[i].titleTarget4;
        }
      }

      tempDragAndDropBankFirstDimension.push(tempDragAndDropBank[i]);
    }

    /**
     * Speichere für jedes DragDropGame die Daten in einem separatem Array. Damit wird das Benutzen eines 3 dimensionalen Array umgangen
     */
    if (k == 0) {
      dragAndDropBank1 = tempDragAndDropBankFirstDimension;
    }

    if (k == 1) {
      dragAndDropBank2 = tempDragAndDropBankFirstDimension;
    }

    if (k == 2) {
      dragAndDropBank3 = tempDragAndDropBankFirstDimension;
    }
  }
}

numberOfQuestions = questionBank.length;
