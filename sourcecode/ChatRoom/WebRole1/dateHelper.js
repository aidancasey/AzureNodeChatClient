function CurrentDateAndTime()
{
var currentTime = new Date();
var month = currentTime.getMonth() + 1;
if (month < 10){
  month = "0" + month;
}

var day = currentTime.getDate()
if (day < 10){
  day = "0" + day;
}

var year = currentTime.getFullYear()

var hours = currentTime.getHours();

var minutes = currentTime.getMinutes();
if (minutes < 10){
  minutes = "0" + minutes;
}
var seconds = currentTime.getSeconds();
if (seconds < 10){
  seconds = "0" + seconds;
}

  var now =  day + '/' + month + '/' + year + '   :' +  hours + ':' + minutes + ':' + seconds;
return now;  
}

exports.CurrentDateAndTime = CurrentDateAndTime;

