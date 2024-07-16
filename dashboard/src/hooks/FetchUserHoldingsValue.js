import axios from "axios";
import { useDispatch } from "react-redux";
import { setHoldings, setFinalData } from "../store/dataSlice";
import { useEffect } from "react";

const initialHoldings = [
    {
        stockName: "BHARTIARTL",
        qty: 2,
        price: 541.15,
        dayChange: "+2.99%",
        isLoss: false,
        avgCost: 500.0,  // Hypothetical average cost
    },
    {
        stockName: "HDFCBANK",
        qty: 2,
        price: 1522.35,
        dayChange: "+0.11%",
        isLoss: false,
        avgCost: 1400.0,  // Hypothetical average cost
    },
    {
        stockName: "ITC",
        qty: 5,
        price: 207.9,
        dayChange: "+0.80%",
        isLoss: false,
        avgCost: 180.0,  // Hypothetical average cost
    },
    {
        stockName: "TATAPOWER",
        qty: 5,
        price: 124.15,
        dayChange: "-0.24%",
        isLoss: true,
        avgCost: 100.0,  // Hypothetical average cost
    },
    // Add more initial holdings as needed
];

function useFetchUserHoldingsValue(userId, accessToken, trigger) {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            if (userId && accessToken) {
                try {
                    const response = await axios.get(`http://localhost:3002/api/v1/holdings/get-holdings/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    const holdings = response.data.data.holdings;
                    const combinedHoldings = holdings.length > 0 ? [...initialHoldings, ...holdings] : initialHoldings;
                    dispatch(setHoldings({ holdings: combinedHoldings }));
                    // console.log("combined holdings:", combinedHoldings);
                    calculateTotalValues(combinedHoldings);
                } catch (error) {
                    console.error("Error fetching holdings:", error.message);
                }
            }
        }
        fetchData();
    }, [userId, accessToken, dispatch, trigger]);

    const calculateTotalValues = (holdings) => {
        let totalInvestment = 0;
        let totalCurrentValue = 0;

        holdings.forEach(stock => {
            const currValue = stock.price * stock.qty;
            const investment = stock.avgCost * stock.qty;

            totalInvestment += investment;
            totalCurrentValue += currValue;
        });

        const profitLoss = totalCurrentValue - totalInvestment;
        const percentage = ((profitLoss / totalInvestment) * 100).toFixed(2);

        dispatch(setFinalData({
            finalProfitLoss: profitLoss,
            finalProfitLossPercentage: percentage,
            finalCurrentValue: totalCurrentValue,
            finalInvestment: totalInvestment,
            totalHoldings: holdings.length
        }));
        console.log("final data:", profitLoss, percentage, totalCurrentValue, totalInvestment)
    };
}

export default useFetchUserHoldingsValue;
