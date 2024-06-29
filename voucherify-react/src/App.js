import * as React from 'react'

import * as ReactDOM from 'react-dom'

import '@voucherify/react-widget/dist/voucherify.css'
import { VoucherifyRedeem } from '@voucherify/react-widget'
import { VoucherifyPublish } from '@voucherify/react-widget'

const App = () => {
    const onRedeemResponse = response => {
        console.log('Do something with response: ', response)
    }

    const onErrorResponse = error => {
        console.log('Do something with error: ', error)
    }

    const onPublishedResponse = response => {
        console.log('Do something with response: ', response)
    }

    return (
        <VoucherifyRedeem
            clientApplicationId="0ee4c8aa-c748-4d81-872d-3628249aae1a"
            clientSecretKey="5d580a7c-ea52-4afd-b3cc-cbf892f82e02"
            textPlaceholder="e.g. Testing7fjWdr"
            apiUrl='https://as1.api.voucherify.io'
            amount
            onRedeem={onRedeemResponse}
            onError={onErrorResponse}
        />
    )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'))