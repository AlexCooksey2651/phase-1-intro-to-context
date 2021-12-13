// Your code here
function createEmployeeRecord(employeeInfo) {
    let empRecObj = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents:[],
        timeOutEvents: [], 
    };
    return empRecObj;
};

function createEmployeeRecords(empInfoArrays) {
    let arrayOfEmpRecObj = empInfoArrays.map(createEmployeeRecord)
    return arrayOfEmpRecObj
}

// dateStamp = "YYYY-MM-DD HHMM"
function createTimeInEvent(empRecObj, dateStamp) {
    let timeInHour = parseInt(dateStamp.substr(11, 4))
    let timeInDate = dateStamp.substr(0, 10)
    console.log(timeInHour)
    empRecObj.timeInEvents.push({
        type: "TimeIn",
        hour: timeInHour,
        date: timeInDate,
    })
    return empRecObj
}

function createTimeOutEvent(empRecObj, dateStamp) {
    let timeOutHour = parseInt(dateStamp.substr(11, 4))
    let timeOutDate = dateStamp.substr(0, 10)
    empRecObj.timeOutEvents.push({
        type: "TimeOut",
        hour: timeOutHour,
        date: timeOutDate,
    })
    return empRecObj
}

function hoursWorkedOnDate(empRecObj, formDate) {
    let timeIn = empRecObj.timeInEvents.filter(workday => workday.date === formDate).map(obj => obj.hour)
    console.log(timeIn)
    let timeOut = empRecObj.timeOutEvents.filter(workday => workday.date === formDate).map(obj => obj.hour)
    console.log(timeOut)
    let hoursWorked = (parseInt(timeOut) - parseInt(timeIn))/100
    return hoursWorked
 }
// hoursWorkedOnDate has to check if the object contains that date. 
// It has to go into the "timeInEvents" and/or the "timeOutEvents" and see if that date exists
// If so, has to subtract the timeInEvents.hour from the timeOutEvents.hour and return that value

function wagesEarnedOnDate(empRecObj, formDate) {
    let wagesEarned = empRecObj.payPerHour * hoursWorkedOnDate(empRecObj, formDate)
    return wagesEarned
}

function allWagesFor(empRecObj) {
    let totalWages = 0;
    let datesWorked = empRecObj.timeInEvents.map(obj => obj.date)
    console.log(datesWorked)
    for (let date of datesWorked) {{
        let dailyWages = wagesEarnedOnDate(empRecObj, date)
        console.log(dailyWages)
        totalWages += dailyWages
        console.log(totalWages)
    }}
    return totalWages
}

function calculatePayroll(empRecObjArray) {
    let totalPayout = 0
    for (let employee of empRecObjArray) {
        let employeePay = allWagesFor(employee)
        totalPayout += employeePay
    }
    return totalPayout
}