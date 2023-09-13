const {
    getAllPreOrders,
    getAPreOrder,
    createAPreOrder,
    deleteAPreOrder,
    getCurrentOrders,
    updateAPreOrder
} = require("../controllers/preOrderController")

const express = require("express")
const PreOrderrouter = express.Router()


PreOrderrouter.get('/', getAllPreOrders)
// PreOrderrouter.get('/:id', getAPreOrder)
PreOrderrouter.get("/ordered", getCurrentOrders)
PreOrderrouter.post('/', createAPreOrder)
PreOrderrouter.delete('/ordered/:id',deleteAPreOrder)
PreOrderrouter.patch('/ordered/:id', updateAPreOrder)

module.exports = PreOrderrouter;