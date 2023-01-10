$(function () {
  
  var tasks = [];

  // when the save button is clicked puts the id of the div that is clicked and the text that was entered in the div
  // and saves it to local storage
  $(".time-block").on("click", ".saveBtn", function () {
    var text = $(this).parent().children("textarea").val();
    
    var task = {
      time: $(this).parent().attr("id"),
      taskText: text,
    };
    tasks.push(task);
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  
  // updates the time block divs with the past, presenent, future styles depeding on the time of day
  var hour = dayjs().format("H");
  
  for (var i = 0; i < 9; i++) {
    var divEl = $("#hour-" + (i + 9));
    
    if (i + 9 == hour) {
      divEl.attr("class", "row time-block present");
    }
    else if (i + 9 < hour) {
      divEl.attr("class", "row time-block past");
    }
    else {
      divEl.attr("class", "row time-block future");
    }
  }
  
  
  // renders the tasks that were saved in local storage onto the page
  var storedTasks = JSON.parse(localStorage.getItem("tasks"));
  for (var i = 0; i < storedTasks.length; i++) { 
    var timeBlock = storedTasks[i].time;
    var textContent = storedTasks[i].taskText;
    
    $("#" + timeBlock).children("textarea").text(textContent);
  }
  
  // displays the current date at the top of the page
  var currentDate = dayjs().format("MMM D, YYYY");
  var date = $("#currentDay");
  date.text(currentDate);
});
