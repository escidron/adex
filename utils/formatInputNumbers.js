export default function formatNumberInput(value) {
    let rawValue = value.replace(/,/g, '');
    const formattedNumber = formatNumber(rawValue);
    return formattedNumber;
  };

  export const formatNumber = (value) => {
    const numberPattern = /\B(?=(\d{3})+(?!\d))/g;
    if(value != undefined){
      return value.replace(numberPattern, ',');
    }
    return ''
  };