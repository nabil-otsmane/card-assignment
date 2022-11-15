const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// taken from https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
// to format the date in the dd MM yyyy format
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth(); // getMonth() is zero-based
    var dd = this.getDate();
  
    return [
        (dd>9 ? '' : '0') + dd,
        MONTHS[mm],
        this.getFullYear(),
    ].join(' ');
};