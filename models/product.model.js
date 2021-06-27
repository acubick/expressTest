var mongoose = require('mongoose');

var productSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.ObjectId,
		name: String,
		price: Number,
		color: {
			type: String,
			enum: ['White', 'Black', 'Red']
		},
		last_updated: Date
	}, {                                    
		collection: 'products1'
	});

productSchema.pre('save', function(next){
	  this._id = mongoose.mongo.ObjectId();
	  this.last_updated = new Date();
	  next();
});

module.exports = mongoose.model('Product', productSchema)
