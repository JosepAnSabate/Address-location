const Store = require('../models/Store')

// @description Get all stored
// @ route GET /api/v1/stores
// @ access  Public 

exports.getStores = async (req,res, next) => {
    try {
        const stores = await Store.find();

        return res.status(200).json({
            succes: true,
            count: stores.length,
            data: stores
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Serve error'});
    }
};

// @description create store
// @ route POST /api/v1/stores
// @ access  Public 

exports.addStore = async (req,res, next) => {
    try {
        //console.log(req.body);
        const store = await Store.create(req.body);

        return res.status(200).json({
            succes: true,
            data: store

        }); 
    } catch (err) {
        console.error(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'This store already exists'})
        }
        res.status(500).json({ error: 'Serve error'});
    }
};