import { useState, useEffect } from "react";

let pending = false;
let currencyData;

const updateRequired = () => {
    const updateDate = new Date(localStorage.getItem("updateDate"));
    const currentDate = new Date();
    if (pending) {
        return false;
    }
    else if (localStorage.getItem("updateDate")
        && localStorage.getItem("currenciesData")
        && localStorage.getItem("currenciesSymbols")
        && (updateDate.getFullYear() === currentDate.getFullYear()
            && updateDate.getMonth() === currentDate.getMonth()
            && updateDate.getDate() === currentDate.getDate())) {
        return false;
    }
    return true;
};

const getCurrencyData = (res,currencySymbol) => {
    const API_URL = "https://api.exchangerate.host/";
    const requestParameters = `latest?base=${currencySymbol}`;
    
    (async () => {
        try {
            const response = await fetch(`${API_URL}${requestParameters}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            currencyData = await response.json();
            //await new Promise((res) => setTimeout(res, 5000));
           // alert(currencyData);
            res();
            return currencyData;
        }
        catch (error) {
            console.error("Fetching data error: ", error);
            res();
            return null;
        }
    })();
    return currencyData;
};

export const useCurrenciesData = () => {
    const [downloadStatus, setDownloadStatus] = useState("pending");

    useEffect(() => {
        if (updateRequired()) {
            pending = true;
            (async () => {
                    await new Promise((res)=>getCurrencyData(res,"PLN"));
                    //await new Promise((res) => setTimeout(res, 5000));
                    //alert(currencyData);
                    
                    if (currencyData) {
                        const currenciesSymbols = Object.keys(currencyData.rates);
                        localStorage.setItem("currenciesSymbols", JSON.stringify(currenciesSymbols));

                        let newCurrenciesData = [];
                        for (const currencySymbolIndex in currenciesSymbols) {
                                await getCurrencyData(currenciesSymbols[currencySymbolIndex]);
                                newCurrenciesData = [...newCurrenciesData, currencyData];
                        };
                        localStorage.setItem("currenciesData", JSON.stringify(newCurrenciesData));
                        localStorage.setItem("updateDate", new Date().toISOString());
                        setDownloadStatus("resolved");
                        alert("resolved");
                        pending = false;

                    }
                    else {
                        setDownloadStatus("rejected");
                    }
            })();
        }
        else if (!pending) {
            setDownloadStatus("resolved");
        }
        //return downloadStatus;
    }, []);
    

};
