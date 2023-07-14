let dateHead=document.getElementById("date");
let date = "**";
let weekdays=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function promisenextDate(i) {
    const date = new Date();
    console.log(date,typeof(date));

    let new_date=new Date(new Date().setDate(date.getDate() - i));
    let year=new_date.getFullYear();
    let month=new_date.getMonth();
    let day=new_date.getDate();
    // console.log(new_date);
    let s=year.toString()+":"+month.toString()+":"+day.toString();
    console.log(s);
    return(s);
} 
function nextDate(i) {
    return Promise.resolve(promisenextDate(i));
} 
function getPastDates(numDays) {
  var result = [];
  var today = new Date();
  for (var i = 0; i < numDays; i++) {
    var pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i - 1);
    result.push(pastDate);
  }
  console.log(result);
  return result;
}
function currentDate() {
  return new Promise(function(resolve, reject) {
    if(date!="**") resolve(date)
    fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // console.log(data);
        // Update the date variable with the formatted date string
        let date = data.datetime.slice(0,4) + ":" + data.datetime.slice(5,7) + ":" + data.datetime.slice(8,10);
        // Resolve the Promise with the updated date variable
        dateHead.innerHTML=months[parseInt(data.datetime.slice(5,7))-1]+" "+ data.datetime.slice(8,10)+"<br>"+weekdays[data.day_of_week%7];
        resolve(date);
      })
      .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('Error fetching data:', error);
        reject(error);
      });
  });
} 
// To update min and max temperature
document.addEventListener('DOMContentLoaded', function(){
  currentDate().then(date=> {
      console.log(date+",,");

      fetch('http://localhost:9005/temp/date/'+date+'')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Do something with the data
      console.log(data);
      return data;
    })
    .then(data=>{
      console.log(data);
      let today_Temp =document.getElementById("temp");
      today_Temp.innerHTML=data['min']+"  |  "+data['max']+" C";
    })
    .catch(error => {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching data:', error);
    });
    }
  )
  .catch(error => {
    // Handle any errors that occur during the fetch operation
    console.error('Error fetching data:', error);
  });
});

// To update min and max humidity
document.addEventListener('DOMContentLoaded', async function(){
  currentDate().then(async date=> {
    console.log(date+",,");

    fetch('http://localhost:9005/humi/date/'+date+'')
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        // Do something with the data
        console.log(data);
        return data;
      })
      .then(data=>{
        console.log(data);
        let today_Temp =document.getElementById("humi");
        today_Temp.innerHTML=data['min']+"  |  "+data['max']+" %";
        return data;
      })
      .then(async data=>{
        console.log("**");
        let days=[1,2,3,4,5,6,7];

        async function processDay(new_date,i) {
          let date = new_date;
          // date=await nextDate(date,i);
          console.log(date+",,",i);

          return fetch('http://localhost:9005/temp/date/'+new_date+'')
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
              // Do something with the data
              console.log(data);
              return data;
            })
            .then(data=>{
              console.log(data);
              let temp=document.getElementById("day"+i.toString());
              temp.innerHTML=data['min']+"  |  "+data['max']+" C";
              return data;
            })
            .catch(error => {
              // Handle any errors that occur during the fetch operation
              console.error('Error fetching data:', error);
            });
        }
        let pastDates=getPastDates(7);
        for await (const [index, date] of pastDates.entries()) {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dateString = year + ":" + month + ":" + day;
          const temp = document.getElementById("day" + (index + 1));
          await processDay(dateString, index + 1);
          // update the temp element after the processDay function completes
          temp.innerHTML = temp.innerHTML + "<br>" + weekdays[date.getDay()];//+"<br>"+months[month-1].slice(0,3)+" "+day;
        }
      })
      .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('Error fetching data:', error);
      });
  })
  .catch(error => {
    // Handle any errors that occur during the fetch operation
    console.error('Error fetching data:', error);
  });
});
const dateInput = document.getElementById("myDateInput");
// This code should remove the error and run without any issues.

const form = document.querySelector('form');
const searchDay = document.getElementById('searchDay');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const input = document.querySelector('input[type="date"]');
  const inputValue = input.value;
  let randDate=months[parseInt(inputValue.slice(5,7))-1]+" "+inputValue.slice(8,10);
  console.log(randDate);
  dateHead.innerHTML=randDate;
  fetch('http://localhost:9005/temp/date/'+inputValue+'')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Do something with the data
      console.log(data);
      return data;
    })
    .then(data=>{
      console.log(data);
      let today_Temp =document.getElementById("temp");
      today_Temp.innerHTML=data['min']+"  |  "+data['max']+" C";
    })
    .catch(error => {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching data:', error);
    });

    fetch('http://localhost:9005/humi/date/'+inputValue+'')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Do something with the data
      console.log(data);
      return data;
    })
    .then(data=>{
      console.log(data);
      let today_Temp =document.getElementById("humi");
      today_Temp.innerHTML=data['min']+"  |  "+data['max']+" %";
    })
    .catch(error => {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching data:', error);
    });
  // console.log(inputValue,"***");
});





