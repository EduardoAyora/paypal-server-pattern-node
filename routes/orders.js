const express = require('express')
const ordersRouter = express.Router()

const paypal = require('@paypal/checkout-server-sdk')
const payPalClient = require('../Common/payPalClient')

ordersRouter.route('/')
.post(async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '150.00',
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: "135.00"
                  },
                  tax_total: {
                    currency_code: "USD",
                    value: "15.00"
                  }
                }
            },
            items: [
                {
                    name: "T-Shirt",
                    description: "Green XL",
                    unit_amount: {
                        currency_code: "USD",
                        value: "90.00"
                    },
                    tax: {
                        currency_code: "USD",
                        value: "10.00"
                    },
                    quantity: "1",
                    category: "PHYSICAL_GOODS"
                },
                {
                    name: "Shoes",
                    description: "Running, Size 10.5",
                    unit_amount: {
                        currency_code: "USD",
                        value: "45.00"
                    },
                    tax: {
                        currency_code: "USD",
                        value: "5.00"
                    },
                    quantity: "1",
                    category: "PHYSICAL_GOODS"
                }
            ]
        }]
    });

    let order;
    try {
        order = await payPalClient.client().execute(request);
    } catch (err) {

        // 4. Handle any errors from the call
        console.error(err);
        return res.send(500);
    }

    // 5. Return a successful response to the client with the order ID
    res.status(200).json({
        orderID: order.result.id
    })
})

module.exports = ordersRouter