
let downloaded = false;
let currencyData;

export const useCurrenciesData = () => {


    if (!downloaded) {
        let currenciesSymbols;
        (async () => {
            try {
                const response = await fetch("https://api.exchangerate.host/latest?base=PLN");
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const currencyData = await response.json();
                console.log(currencyData);
                //localStorage.setItem("currenciesData",JSON.stringify(currencyData));
                //localStorage.setItem("ratesTable",JSON.stringify(Object.keys(currencyData.rates)));
                downloaded = true;
                //alert("fetch rates "+JSON.stringify(Object.keys(currencyData.rates)));
                currenciesSymbols = Object.keys(currencyData.rates);
                //alert("fetch main2 "+currenciesSymbols);

                localStorage.setItem("currenciesData",[]);
                let newCurrenciesData=[];
                for(const currencySymbolIndex in currenciesSymbols){
                    try {
                        const response = await fetch(`https://api.exchangerate.host/latest?base=${currenciesSymbols[currencySymbolIndex]}`);
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        const currencyData = await response.json();
                        //const newCurrenciesData = [...(localStorage.getItem("currenciesData")),currencyData];
                        newCurrenciesData = [...newCurrenciesData,currencyData];
                        
                        //localStorage.setItem("currenciesData",tab);
                        //localStorage.setItem("ratesTable",JSON.stringify(Object.keys(currencyData.rates)));
                    
                    }
                    catch (error) { console.error("Network error", error); }
                };
                localStorage.setItem("currenciesData",JSON.stringify(newCurrenciesData));
            
            }
            catch (error) { console.error("Network error", error); }
        })();
    
           return currenciesSymbols;
    }
    else {
        
    }

};
