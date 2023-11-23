export const convertTime = (inputTime:string) =>{

const [hours, minutes] = inputTime.split(':').map(Number);

const resultDate = new Date();
resultDate.setHours(hours);
resultDate.setMinutes(minutes);

return `${resultDate.getHours().toString().padStart(2, '0')}:${resultDate.getMinutes().toString().padStart(2, '0')}:${resultDate.getSeconds().toString().padStart(2, '0')}`;
}

export const convertTo12HourFormat = (time24: string) => {
    // Split the time into hours and minutes
    const temptime24 = time24.split(':');
    const hours = Number(temptime24[0]);
    const minutes = Number(temptime24[1]);
  
    // Determine AM or PM
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    const hours12 = (hours % 12) || 12; // If hours is 0, set it to 12
  
    const HH = String(hours12).padStart(2, '0');
    const MM = String(minutes).padStart(2, '0');
  
    // Create the 12-hour time string
    const time12 = `${HH}:${MM} ${amPm}`;
  
    return time12;
  };
  
export const dayMMDDYYYY = (time:string)=>{
    const timeArr = time.split('-');
    return String(`${timeArr[1]}-${timeArr[2]}-${timeArr[0]}`)
}