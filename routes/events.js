const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const { check } = require("express-validator");
const { getEvents, newEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validateFields } = require("../middlewares/validateFields"); 
const { isDate } = require("../helpers/isDate");

const router = Router();
/**
 * Middleware all routes
 */
router.use(validateJWT);


router.get('/',  getEvents);

router.post('/',
[
    check('title','title is obliged').not().isEmpty(),
    check('start','date start is obliged').custom( isDate ),
    check('end','date end  is obliged').custom( isDate ),
    validateFields
],
newEvent);

router.put('/:id',   updateEvent);

router.delete('/:id',  deleteEvent);

module.exports = router;