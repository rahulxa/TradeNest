import React from 'react'
import Brokerage from './Brokerage'
import HeroPricing from './HeroPricing'
import OpenAccount from '../OpenAccount'

function PricingPage() {
    return (
        <>
            <HeroPricing />
            <OpenAccount />
            <Brokerage />
        </>
    )
}

export default PricingPage