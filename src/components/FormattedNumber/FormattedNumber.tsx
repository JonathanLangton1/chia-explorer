function FormattedNumber({ number }: {number: number}) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
     });

    return ( 
        <>{formatter.format(number)}</>
     );
}

export default FormattedNumber;