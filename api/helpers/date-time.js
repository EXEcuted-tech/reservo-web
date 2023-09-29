// Function to check if a string is a valid date in 'YYYY-MM-DD' format
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

// Function to check if a string is a valid timestamp
function isValidTime(timeString) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return regex.test(timeString);
}

module.exports={
    isValidDate,
    isValidTime
}