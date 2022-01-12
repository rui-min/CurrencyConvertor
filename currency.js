document.addEventListener('DOMContentLoaded', function(){
    // (2022.1.10) the api hoster modifies its policy to stop basic account users changing
    // base currenty to non-EUR. So only EUR base is possible.
    document.querySelector('form').onsubmit=function() {
        fetch('http://api.exchangeratesapi.io/v1/latest?access_key=3bc4463a8d18e8e39084f4250df745e3')
        .then(response => response.json() )
        .then(data => {
            const currency = document.querySelector('#currency').value.toUpperCase();
            const rate = data.rates[currency];
            
            // remember to convert text to number below
            const amount = Number(document.querySelector('#amount').value);
            const total = rate*amount;
            const res = document.querySelector('#result');
            res.style.textAlign="center";
            res.style.fontSize="32px";            
            
            if (rate !== undefined){
                res.innerHTML = `${amount.toFixed(2)} EUR is equal to ${total.toFixed(2)} ${currency} (now rate: ${rate.toFixed(3)}).`;
            } else {
                res.innerHTML = `Invalid currency.`;
            }
            
        })
        .catch(error => {
            console.log('Error',);
        });

        return false;
    }

});