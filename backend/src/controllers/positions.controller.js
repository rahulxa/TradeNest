import { asyncHandler } from "../utils/asyncHandler.js"
import { Positions } from "../models/Positions.models.js"

const allPositions = asyncHandler(async (req, res) => {
    let allPositions = await Positions.find();
    try {
        if (allPositions) {
            console.log("all positions fetched")
        }
    } catch (error) {
        console.log("ERROR:", error)
    }
    return res
        .status(200)
        .json(allPositions)
})

export { allPositions }