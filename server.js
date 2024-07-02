const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cloudinary = require('cloudinary').v2;
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
const Schema = mongoose.Schema;
const loginSchema = new Schema({
  username: String,
  password: String,
  code: String,
});
const categoriesSchema = new Schema({}, { strict: false });
const addItemsSchema = new Schema(
  {
    name: String,
    brand: String,
    price: String,
    category: String,
    description: String,
    colors: String,
    images: {
      urls: [String, String, String, String, String, String],
      publicIds: [String, String, String, String, String, String],
    },
  },
  { timestamps: true }
);
const mongoURL =
  'mongodb+srv://OBBLiT:madeofblack@glitchobblitusers.gh5zb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const loginDits = mongoose.model('probook_account', loginSchema);
const itemsCatigories = mongoose.model(
  'shop_items_categories',
  categoriesSchema
);
const addItems = mongoose.model('shop_items', addItemsSchema);
app.get('/api', (req, res) => {
  res.json({ message: 'Hello there. Hope you doing well' });
});
app.post('/admlog', (req, res) => {
  loginDits.find(
    { username: req.body.username, password: req.body.password },
    (err, data) => {
      if (err) {
        res.render({ message: 'error' });
      } else if (Object.keys(data[0]).length !== 0) {
        res.json({ message: data[0].code });
      } else if (Object.keys(data[0]).length === 0) {
        res.json({ message: 'failure' });
      }
    }
  );
});
app.post('/admadditems', (req, res) => {
  let i,
    ii,
    iii = 0,
    images = { urls: [], publicIds: [] };
  for (let index = 1; index <= Object.keys(req.body.images).length; index++) {
    if (index === 1) {
      i = req.body.images.file1;
    } else if (index === 2) {
      i = req.body.images.file2;
    } else if (index === 3) {
      i = req.body.images.file3;
    } else if (index === 4) {
      i = req.body.images.file4;
    } else if (index === 5) {
      i = req.body.images.file5;
    } else if (index === 6) {
      i = req.body.images.file6;
    }
    cloudinary.uploader
      .upload(i, {
        resource_type: 'image',
        public_id: `Shopping Site/${req.body.name}${index}`,
      })
      .then((result) => {
        images.urls[index - 1] = result.url;
        images.publicIds[index - 1] = result.public_id;
        console.log(result);
        iii += 1;
        if (iii === 6) {
          itemsCatigories.find({ name: req.body.category }, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              if (Object.keys(data).length === 0) {
                const x = new itemsCatigories({ name: req.body.category });
                x.save()
                  .then((result) => {
                    const y = req.body;
                    y.images = images;
                    const newItem = new addItems(y);
                    newItem
                      .save()
                      .then((result) => {
                        console.log(result);
                        res.json({ message: 'success' });
                      })
                      .catch((err) => {
                        console.log(err);
                        res.json({ message: 'failure' });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else if (Object.keys(data).length > 0) {
                const y = req.body;
                y.images = images;
                const newItem = new addItems(y);
                newItem
                  .save()
                  .then((result) => {
                    console.log(result);
                    res.json({ message: 'success' });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.json({ message: 'failure' });
                  });
              }
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ message: 'failure' });
      });
  }
});
app.post('/getItems', (req, res) => {
  loginDits.find(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      addItems.find({}, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(data);
        }
      });
    }
  });
});
app.post('/getItemsFree', (req, res) => {
  addItems.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
app.post('/getCategoryItems', (req, res) => {
  if (req.body.message) {
    addItems.find({ category: req.body.message }, (err, data) => {
      console.log(req.body.message);
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  } else {
    addItems.find({}, (err, data) => {
      console.log(req.body.message);
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  }
});
app.get('/getItem/:id', (req, res) => {
  addItems.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
app.get('/getCategories', (req, res) => {
  itemsCatigories.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
const PORT = 3001;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected');
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
