import { asyncHandler } from "../utils/asyncHandler.js"
import { Holdings } from "../models/Holding.models.js"


const allHoldings = asyncHandler(async (req, res) => {
    let allHoldings = await Holdings.find();
    try {
        if (allHoldings) {
            console.log("all holdings fetched")
        }
    } catch (error) {
        console.log("ERROR:", error)
    }
    return res
        .status(200)
        .json(allHoldings)
})

export { allHoldings }