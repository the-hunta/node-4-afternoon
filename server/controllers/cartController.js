const swag = require('../models/sawg')

module.exports = {
    add: (req, res) => {
        const { id } = req.params;
        let { user } = req.session;
        
        const index = user.cart.findIndex(sawg => swag.id === id)

        if(index === -1) {
            const selectSwag = swag.find(swag => swag.id == id);

            user.cart.push(selectSwag)
            user.total += selectSwag.price
        }
        res.status(200).send(user)
    },
    delete: (req, res) => {
        const { id } = req.params;
        let { user } = req.session;

        const index = user.cart.findIndex(swag => swag.id == id);
        const selectSwag = swag.find(swag => swag.id == id)

        if (index !== -1){
            user.cart.splice(index, 1)
            user.total -= selectSwag.price
        }
            res.status(200).send(user)
    },
    checkout: (req, res) => {
            const {user} = req.session
            user.cart = [];
            user.total = 0;

            res.status.send(user)
    }
}