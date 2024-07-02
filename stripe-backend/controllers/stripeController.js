const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    let x = (req.body.metadata);
    //const y = x.metadata.name;
   console.log("value of x");
   console.log(x);

    //console.log("value of y");
    //console.log(y);
    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Trip',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            allow_promotion_codes: true,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
};

exports.handleWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Fulfill the purchase...
            break;
        default:
            return res.status(400).end();
    }

    res.json({ received: true });
};
