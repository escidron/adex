export default function diferenceBetweenDates(date) {
    const currentDate = new Date()
    const startDate = new Date(date)

    const diference = startDate - currentDate;
    const diferencaInDays = diference / (1000 * 60 * 60 * 24);
    
    return diferencaInDays
  };