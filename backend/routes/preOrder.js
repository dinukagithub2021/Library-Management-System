const {
    getAllPreOrders,
    getAPreOrder,
    createAPreOrder,
    deleteAPreOrder,
    getUserOrders,
    updateAPreOrder
} = require("../controllers/preOrderController")

const express = require("express")
const requireUserAuth= require("../middleware/requireUserAuth")
const requireAuth = require("../middleware/requireAuth")
const PreOrderrouter = express.Router()


PreOrderrouter.get('/', requireUserAuth, getAllPreOrders)
// PreOrderrouter.get('/:id', getAPreOrder)
PreOrderrouter.get("/ordered", requireUserAuth, getUserOrders)
PreOrderrouter.post('/', requireUserAuth, createAPreOrder)
PreOrderrouter.delete('/ordered/:id',requireUserAuth, deleteAPreOrder)
PreOrderrouter.patch('/ordered/:id', requireUserAuth, updateAPreOrder)

module.exports = PreOrderrouter;