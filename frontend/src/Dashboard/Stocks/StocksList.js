import React, {useEffect} from 'react';
import Stock from './Stock';
import axios from "axios";

const { REACT_APP_STOCK_API_KEY } = process.env;

const Stocks = () => {
    // maybe on sign in of the app see if the user has any saved stocks?
        // set up ability to save/delete favourites with endpoints?
        // should it be it's own page? <Route path="/:userId/stocks"></StocksList></Route>

    // const options = {
    //     method: 'GET',
    //     url: 'https://rapidapi.p.rapidapi.com/stock/v2/get-profile',
    //     params: { symbol: 'AMRN', region: 'US' },
    //     headers: {
    //         'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    //         'x-rapidapi-key': REACT_APP_STOCK_API_KEY
    //     }
    // };

    // const fetchUsersSavedStocks = async () => {
    //     await axios.request(options).then(function (response) {
    //         console.log(response.data);
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }

    // useEffect(() => {

    // })

    return (
        <div>
            <ul>
                {/* render a list of stocks with Stock.js file */}
            </ul>
        </div>
    );
};

export default Stocks;