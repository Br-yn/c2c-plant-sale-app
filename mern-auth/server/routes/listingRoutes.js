const router = require('express').Router();
const Listing = require('../models/listings');
const path = require('path');
const multer = require('multer');

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Define route handler for serving listing images
router.get('/:id/image/:index?', async (req, res, next) => {
  const index = req.params.index ?? 0;
  try {
    const listing = await Listing.findById(req.params.id, 'images').lean();
    if (!listing || listing.images.length <= index) {
      return res.sendStatus(404);
    }

    res.set('content-type', 'image/jpg').send(listing.images[index]);
  } catch (err) {
    next(err);
  }
});

// Define route handler for returning listings with mapped image URLs
router.get('/', async (req, res, next) => {
  try {
    const listings = await Listing.find().lean();
    const listingsWithImageURLs = listings.map(({ images, ...listing }) => ({
      ...listing,
      images: images.map((_, i) => `/listings/${listing.id}/image/${i}`)
    }));
    res.json(listingsWithImageURLs);
  } catch (err) {
    next(err);
  }
});

// Define route handler for adding a new listing
router.post('/add', async (req, res) => {
  const { title, price, description, images } = req.body;

  const newListing = new Listing({
    title,
    price,
    description,
    images: images || [], // Assuming images are an array in the request
  });

  try {
    await newListing.save();
    res.json('Listing added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).lean();
    if (!listing) {
      return res.sendStatus(404);
    }

    res.json(listing);
  } catch (err) {
    next(err);
  }
});

// Example of updating a listing
router.route('/update/:id').post(async (req, res) => {
  const { title, price, description, images } = req.body;

  const updatedListing = {
    title,
    price,
    description,
    images: images || [], // Assuming images are an array in the request
  };

  try {
    await Listing.findByIdAndUpdate(req.params.id, updatedListing);
    res.json('Listing updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Example of deleting a listing
router.route('/:id').delete(async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json('Listing Deleted');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});


module.exports = router;