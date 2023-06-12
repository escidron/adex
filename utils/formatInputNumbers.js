export default function formatNumberInput(event) {
    let rawValue = event.target.value.replace(/,/g, '');
    const formattedNumber = formatNumber(rawValue);
    console.log(formattedNumber)
    event.target.value = formattedNumber;
  };

  const formatNumber = (value) => {
    const numberPattern = /\B(?=(\d{3})+(?!\d))/g;
    return value.replace(numberPattern, ',');
  };