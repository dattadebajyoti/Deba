/* Requiring the express  */
var express = require('express');
var router = express.Router();

console.log("in card routes");

/*
Requiring the cardController and creating an object of its function
 */
var cardController = require('../cardControllers/cardControllers').cardController;
cardCntrl = new cardController();
cardCntrl.init();

/*
Requiring the elasticSearchServices and creating an object of its function
 */
var elasticSearchService = require('../elasticSearchServices/elasticSearchServices').elasticSearch;
card_elasticSearch_service = new elasticSearchService();
card_elasticSearch_service.init();

/* specifying all the card routes. */
router.post('/getData', cardCntrl.getCard);
router.post('/deleteCard', cardCntrl.deleteCard);
router.post('/editNote', cardCntrl.editNote);
router.post('/remainder', cardCntrl.remainder);
router.post('/trash', cardCntrl.trash);
router.post('/changeColour', cardCntrl.changeColour);
router.post('/remainderData', cardCntrl.remainderData);
router.post('/checkPin', cardCntrl.checkPin);
router.post('/pin', cardCntrl.pin);
router.post('/unpin', cardCntrl.unpin);
router.post('/trashData', cardCntrl.trashData);
router.post('/checkArchive', cardCntrl.checkArchive);
router.post('/archive', cardCntrl.archive);
router.post('/locate', cardCntrl.locate);
router.post('/share', cardCntrl.share);
router.post('/level', cardCntrl.label);
router.post('/api/photo', cardCntrl.add_image);
router.post('/searchByNote', card_elasticSearch_service.searchByNote);
router.post('/autocomplete', card_elasticSearch_service.autocomplete);
module.exports = router;
