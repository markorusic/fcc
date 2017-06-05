var Clock = (function() {
  var isTimerRunning = true;
  //timers
  var workMins = 25;
  var workSecs = 0;
  var breakMins = 5;
  var breakSecs = 0;

  //Cache DOM
  var $wrapper = $(".wrapper"); //main div

  var $control = $wrapper.find(".control");
  var $clock = $wrapper.find(".clock");

  var $timer = $clock.find("h3");
  var $timerHeader = $clock.find("h4");

  var $break = $control.find(".break");
  var $breakMinus = $break.find(".fa-minus");
  var $breakPlus = $break.find(".fa-plus");
  var $breakTime = $break.find(".breakTime");

  var $work = $control.find(".work");
  var $workMinus = $work.find(".fa-minus");
  var $workPlus = $work.find(".fa-plus");
  var $workTime = $work.find(".workTime");

  renderControl();
  renderClock();
  //Bind events
  // + - events
  setEvents();

  // start/stop timer events
  $clock.on("click", startTimer)

  //remove events + - events
  function removeEvents() {
    $breakMinus.off();
    $breakPlus.off();
    $workMinus.off();
    $workPlus.off();
  }

  function setEvents() {
    $breakMinus.on("click", minusBreak);
    $breakPlus.on("click", plusBreak);
    $workMinus.on("click", minusWork);
    $workPlus.on("click", plusWork);
  }

  //Event handlers
  function startTimer() {
    var localWorkMins = workMins;
    var localWorkSecs = workSecs;
    var localBreakMins = breakMins;
    var localBreakSecs = breakSecs;
    if (isTimerRunning) {
      removeEvents();
      var interval = setInterval((reduceWork)(), 1000);

      function reduceWork() {
              $clock.removeClass("breakActive").addClass("workActive");
        $timerHeader.html("Work<br /><p class=\"smallText\">(Click again to stop)</p>");
        renderClock(localWorkMins, localWorkSecs);
        if (localWorkSecs == 0) {
          localWorkMins--;
          localWorkSecs = 59;
        } else
          localWorkSecs--;
        renderClock(localWorkMins, localWorkSecs);
        if (localWorkMins == 0 && localWorkSecs == 0) {
          localWorkMins = workMins;
          localWorkSecs = workSecs;
          localBreakMins = breakMins;
          localBreakSecs = breakSecs;
          clearInterval(interval);
          interval = setInterval(reduceBreak, 1000);
        }
        return reduceWork;
      }

      function reduceBreak() {
        $clock.removeClass("workActive").addClass("breakActive");
        $timerHeader.html("Break<br /><p class=\"smallText\">(Click again to stop)</p>");
        renderClock(localBreakMins, localBreakSecs);
        if (localBreakSecs == 0) {
          localBreakMins--;
          localBreakSecs = 59;
        } else
          localBreakSecs--;
        renderClock(localBreakMins, localBreakSecs);
        if (localBreakMins == 0 && localBreakSecs == 0) {
          localWorkMins = workMins;
          localWorkSecs = workSecs;
          localBreakMins = breakMins;
          localBreakSecs = breakSecs;
          clearInterval(interval);
          interval = setInterval(reduceWork, 1000);
        }
        return reduceBreak;
      }

      isTimerRunning = !isTimerRunning;
    } else {
      (function clearLastInterval() {
        var i = setInterval(function() {}, 10000);
        clearInterval(i - 1);
        clearInterval(i);
      })();
      $timerHeader.html("Start");
      $clock.removeClass("workActive").removeClass("breakActive");
      renderClock();
      setEvents();
      isTimerRunning = !isTimerRunning;
    }
  }

  function minusBreak() {
    if (breakMins > 1) {
      breakMins--;
      renderControl();
    }
  }

  function plusBreak() {
    breakMins++;
    renderControl();
  }

  function minusWork() {
    if (workMins > 1) {
      workMins--;
      renderControl();
      renderClock();
    }
  }

  function plusWork() {
    workMins++;
    renderControl();
    renderClock();
  }

  //render
  function renderControl() {
    $workTime.text(workMins);
    $breakTime.text(breakMins);
  }

  function renderClock(timeMins = workMins, timeSecs = workSecs) {
    var txt = "";
    if (timeSecs.toString().length < 2)
      txt = timeMins + ":" + "0" + timeSecs;
    else
      txt = timeMins + ":" + timeSecs;

    $timer.text(txt);
    $(document).prop('title', "(" + txt + ")" + " Pomodoro clock");
  }

})();