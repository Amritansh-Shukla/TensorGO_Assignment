require("dotenv").config()
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json")
const express = require("express");
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const port = 5000

app.use(express.json())
app.use(bodyParser.json())

const [basic, pro, business] = ['99', '499', '999'];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stripe-subscription-2f4de-default-rtdb.firebaseio.com"
  });
  

app.use(
    cors({
        origin:"http://localhost:5173"
    })
)

app.post('/add-user', (req, res) => {
    const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    db.users.push(req.body);
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    res.send({ message: "User added successfully!" });
});

app.post("/api/v1/create-subscription-checkout-session", async(req, res) => {
    const {plan, customerId} = req.body;
    let planId = null;
    if(plan == 99) planId = basic;
    else if(plan == 499) planId = pro;
    else if(plan == 999) planId = business;

    try{

        // const session = await stripeSession(planId);
        // const user = await admin.auth().getUser(customerId);

        await admin.database().ref("users").child(user.uid).update({
            subscription: {
                sessionId: session.id
            }
        });
        return res.json({session})

    }catch(error){
        res.send(error)
    }
})

app.post("/api/v1/create-subscription-checkout-session", async (req, res) => {
    const { plan, customerId } = req.body;
    let planId = null;

    // Assign a plan based on the user's input
    if (plan == 99) planId = "basic";
    else if (plan == 499) planId = "pro";
    else if (plan == 999) planId = "business";

    try {
        // Use fake subscription session instead of Stripe
        const session = await fakeSubscriptionSession(planId);
        const user = await admin.auth().getUser(customerId);

        // Update user data in Firebase
        await admin.database().ref("users").child(user.uid).update({
            subscription: { sessionId: session.id }
        });

        return res.json({ session });
    } catch (error) {
        res.status(500).send({ error: "Failed to create fake subscription" });
    }
});

  
         
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})