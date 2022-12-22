import { useState, useEffect } from "react";

let pending = false;

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

export const useCurrenciesData = () => {
    const [downloadStatus, setDownloadStatus] = useState("pending");
    
    useEffect(() => {
        const API_URL = "https://api.exchangerate.host/";
        let requestParameters = "latest?base=PLN";
        if (updateRequired()) {
            pending = true;
            (async () => {
                try {
                    const response = await fetch(`${API_URL}${requestParameters}`);
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    const currencyData = await response.json();
                    const currenciesSymbols = Object.keys(currencyData.rates);
                    localStorage.setItem("currenciesSymbols", []);
                    localStorage.setItem("currenciesSymbols", JSON.stringify(currenciesSymbols));
                    localStorage.setItem("currenciesData", []);
                    let newCurrenciesData = [];
                    for (const currencySymbolIndex in currenciesSymbols) {
                        try {
                            requestParameters=`latest?base=${currenciesSymbols[currencySymbolIndex]}`;
                            const response = await fetch(`${API_URL}${requestParameters}`);
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            const currencyData = await response.json();
                            newCurrenciesData = [...newCurrenciesData, currencyData];
                        }
                        catch (error) { console.error("Network error", error); }
                    };
                    await new Promise((res) => setTimeout(res, 10000));
                    localStorage.setItem("currenciesData", JSON.stringify(newCurrenciesData));
                    localStorage.setItem("updateDate", new Date().toISOString());
                    setDownloadStatus("resolved");
                    pending = false;
                }
                catch (error) {
                    setDownloadStatus("rejected");
                    console.error("Fetching data error: ", error);
                }
            })();
        }
        else if (!pending) {
            setDownloadStatus("resolved");
        }
    }, []);
    return downloadStatus;
};
