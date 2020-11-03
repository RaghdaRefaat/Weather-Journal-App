//const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '8933de6286e3a8c9568b2d6f248b2c2c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// the button event listener
document.getElementById('generate').addEventListener('click',function(e){
    e.preventDefault(); // to prevent the page to reload 

    //to get feeling and zip code from the form
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    
    //validation of the values 
    if(zip == 0 || zip == '')
        document.getElementById('errorZip').innerHTML = "Please Enter a Valid Zip Code !!";
    if(feeling == '')
        document.getElementById('errorFeeling').innerHTML = "please enter your feeling !!";

    //to get the temperature
    getCurrentTemp(zip,apiKey)
    .then(function(data){
        postData('/collectData', {date: newDate , temp: data.main.temp , feeling})
    }).then(function(){
        updateForm();
    });
    document.querySelector('form').reset(); 
});

//this function to get the current temperature from OpenWeatherApi 
const getCurrentTemp = async(zip , apiKey) => {
    
      const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=metric`);
      try{
        const Data = await req.json();
        return Data;
      }catch(error){
        console.log('error is',error);
      }
      
};

//the function of post data from the server
async function postData(url= '' , data={})
{
    const req = await fetch(url , {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
        date: data.date ,
        temp: data.temp ,
        feeling: data.feeling
        })
    })
    try{
        const newData = await req.json();
        return newData;
    }
    catch(error){
        console.log('error is',error);
    }
};

//the function of updating the form with the collected data
async function updateForm()
{
    const request = await fetch('/allData');
    try{
        const projectData = await request.json();
        document.getElementById('date').innerHTML = projectData.date;
        document.getElementById('temp').innerHTML = projectData.temp;
        document.getElementById('content').innerHTML = projectData.feeling;
    }catch(error){
    console.log('error is',error);
    }
  }
