// Define Employee object constructor
function Employee(firstName, familyName, title, payPerHour) {
    this.firstName = firstName;
    this.familyName = familyName;
    this.title = title;
    this.payPerHour = payPerHour;
    this.timeInEvents = [];
    this.timeOutEvents = [];
  }
  
  //  create an employee record
  function createEmployeeRecord(record) {
    return new Employee(
      record[0], // firstName
      record[1], // familyName
      record[2], // title
      record[3]  // payPerHour
    );
  }
  
  // create employee records from an array of arrays
  function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record));
  }
  
  // add a timeIn event object to an employee's record of timeInEvents
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  
  //  add a timeOut event object to an employee's record of timeOutEvents
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  //calculate hours worked on a given date for an employee
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // calculate wages earned on a given date for an employee
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
  }
  
  // calculate all wages earned by an employee
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // alculate total payroll for an array of employees
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
    return totalPayroll;
  }
  