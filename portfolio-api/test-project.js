require('dotenv').config();
const mongoose = require('mongoose');
const Project = require(process.cwd() + '/src/models/Project').default;

const id = '687369f6123a314dc671133e';

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const project = await Project.findById(id);
    console.log('Project:', project);
    process.exit();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 