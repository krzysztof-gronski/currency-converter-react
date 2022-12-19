import { useState, useEffect } from "react";

let downloaded = false;
let currencyData;

export const useCurrenciesData = () => {
    const [downloadStatus,setDownloadStatus] = useState("pending");
    let currenciesSymbols=[];

    useEffect(()=>{
        if (!downloaded) {
            (async () => {
                try {
                    const response = await fetch("https://api.exchangerate.host/latest?base=PLN");
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    const currencyData = await response.json();
                    console.log(currencyData);
                    downloaded = true;
                    currenciesSymbols = Object.keys(currencyData.rates);
                    localStorage.setItem("currenciesSymbols",[]);
                    localStorage.setItem("currenciesSymbols",JSON.stringify(currenciesSymbols));
    
                    localStorage.setItem("currenciesData",[]);
                    let newCurrenciesData=[];
                    for(const currencySymbolIndex in currenciesSymbols){
                        try {
                            const response = await fetch(`https://api.exchangerate.host/latest?base=${currenciesSymbols[currencySymbolIndex]}`);
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            const currencyData = await response.json();
                            newCurrenciesData = [...newCurrenciesData,currencyData];
                        }
                        catch (error) { console.error("Network error", error); }
                    };
                    localStorage.setItem("currenciesData",JSON.stringify(newCurrenciesData));
                    setDownloadStatus("resolved");
                    
                }
                catch (error) { 
                    setDownloadStatus("rejected");
                    console.error("Network error", error);
                 }
            })();
        
               
        }
        else {
            
        }
        

    },[]);

    return downloadStatus;

};
