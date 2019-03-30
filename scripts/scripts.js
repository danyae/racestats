$(document).ready(function() {
  // elements wil go here
  var $container = $(".container");
  // template to clone. We will also take a size of "track" from it
  var $user = $(".user")
    .first()
    .clone();
  var carWidth = 155;
  var trackWidth =
    $(".user")
      .find(".track")
      .width() - carWidth;
  $(".user").remove();

  var data = [
    { username: "Иванов Иван Иванович", demands: 0 },
    { username: "Пупкин Василий Иннокентьевич", demands: 10 },
    { username: "Петров Петр Петрович", demands: 20 },
    { username: "Сидоров Сидор Сидорович", demands: 30 },
    { username: "Житар Орландо Григорьевич", demands: 40 },
    { username: "Некрасов Оливер Андреевич", demands: 50 }
  ];

  var max = Math.max.apply(
    Math,
    data.map(function(o) {
      return o.demands;
    })
  );
  //18 hours - 100%, 9 hours - 0% of a track for a car with biggest amount of demands
  var startDate = new Date();
  startDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    9,
    0,
    0
  );
  var now = new Date();
  if (now.getHours() > 18) {
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);
  }
  var diffMs = now - startDate;
  var diffMins = Math.round(diffMs / 60000);
  // 540 min between 9:00 and 18:00
  var leaderPositionPercent = diffMins >= 540 ? 100 : diffMins / 5.4;
  var leaderPositionPix = leaderPositionPercent * (trackWidth / 100);

  var counter = 0;
  for (let item of data) {
    // some async stuff with 'let'
    let counter_local = counter + 1;
    setTimeout(function() {
      var names = item.username.split(" ");
      var shortName = names[1] + " " + names[2][0] + ".";

      var $newUser = $user.clone();
      $newUser.find(".name").html(shortName);
      $newUser.find(".score").html(item.demands);
      var $car = $newUser.find(".car").addClass("car" + counter_local);
      $container.append($newUser);

      //move the car
      var position =
        item.demands == max
          ? leaderPositionPix
          : (item.demands / (max / 100)) * (leaderPositionPix / 100);
      if (position < 0) {
        position = 0;
      }

      $car.animate({ left: position });
    }, 500 * counter);
    counter++;
  }
});
