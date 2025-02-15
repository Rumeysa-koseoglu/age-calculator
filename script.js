//this array stores the number of days of each month of the year
const months = [31,28,31,30,31,30,31,31,30,31,30,31];

//a function that calculates age
function ageCalculate(){
    //get today's date
    let today = new Date();
    //get the date of birth entered by the user
    let inputDate = new Date(document.getElementById
    ("date-input").value);
    //define month, day and year variables for the user's date of birth
    let birthMonth,birthDate,birthYear;
    //divide the user's date of birth into day, month and year
    //  and transfer it to the object
    let birthDetails = {
        date:inputDate.getDate(), // get information about the day the user entered
        month:inputDate.getMonth()+1, //we add +1 because getMonth() starts from zero.
        year:inputDate.getFullYear() //get information about the year the user
    }
    //assign today's year, month and day information to variables
    let currentYear = today.getFullYear();// get today's year
    let currentMonth = today.getMonth()+1;//and today's month (do not forget to add +1 !)
    let currentDate = today.getDate();//get today's date

//checking for leap year and updating February
    leapChecker(currentYear);

    //we stop the user from choosing a future date
    //we will give a "not born yet" warning
    if(
        birthDetails.year > currentYear || //if the year of birth is greater than today's year
        ( birthDetails.month > currentMonth && birthDetails.year == currentYear) || // if in the same year but the birth month is later
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear) // if in the same month but the birth date is later
    ){
        alert("Not Born Yet"); // give a warning to the screen
        displayResult("-","-","-");
        return; // stop the function
    }

    //calculates the difference between the curent year and the birth year to get the initial age in years(yıl cinsinden)
    birthYear = currentYear - birthDetails.year;

    //check if the birthday has already passed this year (for months)
    if(currentMonth >= birthDetails.month){//if the birth month has already passed(or its the same month):
        birthMonth = currentMonth - birthDetails.month;//it calculates how many months have passed since the birthday
    }
    //if the birth month is in the future; it reduces the birth year by 1(since the birthday hasn't occurred yet this year)and calculates the months remaining
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    //check if the birthday has passed this month(for days)//this part compares the current day (date) with the birth day
    if(currentDate >= birthDetails.date){//if the birthdya has already passed in the current month:
        birthDate = currentDate - birthDetails.date;//it calculates the difference in days
    }
    //if the birthday hasn't passed yet this month
    //reduce the birth month by 1(since the current month hasn't fully counted for the birthday yet)
    else{
        birthMonth--;
        let days = months[currentMonth - 2];// get the number of days in the previous month
        birthDate = days + currentDate - birthDetails.date;//adjust the birth date calculation
        //if the month number becomes negative (exmp, january - 1 = -1)
        //set it to december(11)and reduce the birth year by 1
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }

    //call the displayResult function to update the webpage with the calculated age
    displayResult(birthDate,birthMonth,birthYear);
}

//function to display the calculated age on the webpage
function displayResult(bDate,bMonth,bYear){
    //update the "years" element(html) with the calculated birth year
    document.getElementById("years").textContent = bYear;
    //update the "months" element with the calculated birth month
    document.getElementById("months").textContent = bMonth;
    //update the "days" element with the calculated birth date
    document.getElementById("days").textContent = bDate;
}

//function that checks leap years
function leapChecker(year){
    //if the year is divisible by 4 (divisible by 100 and also divisible by 400)
    //  it is a leap year
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}