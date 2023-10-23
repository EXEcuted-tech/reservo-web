export const convertTime = (inputTime:string) =>{

const [hours, minutes] = inputTime.split(':').map(Number);

const resultDate = new Date();
resultDate.setHours(hours);
resultDate.setMinutes(minutes);

return `${resultDate.getHours().toString().padStart(2, '0')}:${resultDate.getMinutes().toString().padStart(2, '0')}:${resultDate.getSeconds().toString().padStart(2, '0')}`;
}