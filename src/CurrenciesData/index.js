import { useState, useEffect } from "react";

const getCurrencyData = async (currencySymbol) => {
    const API_URL = "https://api.exchangerate.host/";
    const requestParameters = `latest?base=${currencySymbol}`;

    try {
        const response = await fetch(`${API_URL}${requestParameters}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const currencyData = await response.json();
        return currencyData;
    }
    catch (error) {
        console.error("Fetching data error: ", error);
        return null;
    }
};

const checkIsUpdateRequired = () => {
    const lastUpdateDate = new Date(localStorage.getItem("updateDate")).getTime();
    const currentDate = new Date().getTime();

    const isOneOfLocalStorageItemNotExist = [
        localStorage.getItem("updateDate"),
        localStorage.getItem("currenciesData"),
        localStorage.getItem("currenciesSymbols")
    ].some(item => !item);
    const isTimeToUpdate = (currentDate - lastUpdateDate) > 24 * 60 * 60 * 1000;

    return true;  // double render test //isOneOfLocalStorageItemNotExist || isTimeToUpdate;
};

export const useCurrenciesData = () => {
    const [downloadStatus, setDownloadStatus] = useState("loading");
    const [framesNr, setFramesNr] = useState(1);

    useEffect(() => {
        if (checkIsUpdateRequired() && downloadStatus !== "pending") {
            setDownloadStatus("pending");
            alert(`frame nr: ${framesNr} (alert inside useEffect)`);    //double render test
            setFramesNr(prev => prev + 1); 
            (async () => {
                let currencyData = await getCurrencyData("PLN");
                if (currencyData) {
                    const currenciesSymbols = Object.keys(currencyData.rates);
                    localStorage.setItem("currenciesSymbols", JSON.stringify(currenciesSymbols));

                    const newCurrenciesData = await Promise.all(currenciesSymbols.map((_, currencySymbolIndex) =>
                        getCurrencyData(currenciesSymbols[currencySymbolIndex])));
                    localStorage.setItem("currenciesData", JSON.stringify(newCurrenciesData));
                    localStorage.setItem("updateDate", new Date().toISOString());
                    setDownloadStatus("resolved");
                    await new Promise((res)=>setTimeout(res,5000));
                }
                else {
                    setDownloadStatus("rejected");
                }
            })();
        }
        else {
            setDownloadStatus("resolved");
        }
    }, []);
    return downloadStatus;
};
