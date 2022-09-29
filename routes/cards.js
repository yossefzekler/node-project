const express = require("express");
const auth = require("../middlewares/auth")
const Card = require("../models/Card");
const joi = require('joi');
const router = express.Router();

const cardSchema = joi.object({
name: joi.string().required().min(2), description: joi.string().required().min(2).max(255),
address: joi.string().required().min(2),
tel: joi.number().required().min(0),
image: joi.string().required().min(2),
biznumber:joi.number().required()
});

// get specific card by _id
router.get("/:id", auth, async (req, res) => {
try {
    let card = await Card.findById(req.params.id);
    if (!card) return res.status(404).send("No such card");
    res.status(200).send(card);
} catch (error) {
    res.status(400).send(error);
}
});

// add new card
router.post("/", auth, async (req, res) => {
try {
    // joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // add the card to db
    let card = new Card(req.body);
    let bizNumberFlag = true;
    let newBizNumber;
    do {
        newBizNumber = _.random(1, 100000);
        let checkcard = await Card.findOne({ biznumber: newBizNumber });
        if (!checkcard) bizNumberFlag = false;
    }
    while (bizNumberFlag);
    card.bizNumber = newBizNumber;
    card.userId = req.payload._id;

    await card.save();
    res.status(201).send(card);
} catch (error) {
    res.status(400).send('error in card'+error);
}
});

// update of card
router.put("/:id", auth, async (req, res) => {
try {

    // joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // update in db
    let card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) return res.status(404).send("No such card");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
}
});
// delete card
router.delete("/:id", auth, async (req, res) => {
try {

    let card = await Card.findByIdAndRemove(req.params.id);
    if (!card) return res.status(404).send("No such card");
    res.status(200).send("card removed successfully!");
} catch (error) {
    res.status(400).send(error);
}
});



// get user's cards
router.get("/", auth, async (req, res) => {
  try {
    // search for user's cards
    let cards = await Card.find({ userId: req.payload._id });
    if (!cards) return res.status(404).send("No such cards for user");
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get all cards
router.get("/", auth, async (req, res) => {
try {
    let cards = await Card.find();
    res.status(200).send(cards)
} catch (error) {
    res.status(400).send(error)
}
});








module.exports = router;










