const express = require('express');
const axios = require('axios');
const {nanoid} = require('nanoid');
const User = require('../models/User');
const config = require('../config');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/collaborators', auth, async (req, res) => {
  try {
    const items = [];
    const collaboratorsIds = req.user.collaborators;

    if (!collaboratorsIds && !collaboratorsIds.length) {
      return res.status(401).send({message: 'User dont have collaborators!'});
    }

    for (const itemId of collaboratorsIds) {
      const collaborator = await User.findById(itemId);
      items.push(collaborator);
    }

    res.send(items);
  } catch(e) {
    console.error(e);
    res.sendStatus(500).send(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const {email, password, displayName} = req.body;
    const userData = {email, password, displayName};

    const user = new User(userData);

    user.generateToken();
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) {
    return res.status(401).send({message: 'Credentials are wrong!'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({message: 'Credentials are wrong!'});
  }

  user.generateToken();
  await user.save({validateBeforeSave: false});
  res.send({message: 'Username and password correct!', user});
});

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenUrl);
    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect!'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({message: 'Wrong User ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      user = new User({
        email: req.body.email,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name
      });
    }


    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({message: 'Login or register successful!', user});
  } catch (e) {
    return res.status(401).send({message: 'Facebook token incorrect!'});
  }
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Success'};

  if (!token) return res.send(success);

  const user = await User.findOne({token});

  if (!user) return res.send(success);

  user.generateToken();
  await user.save({validateBeforeSave: false});

  return res.send({success, user});
});

router.put('/share', auth, async (req, res) => {
  try {
    const {userEmail} = req.body;

    if (req.user.email === userEmail) {
      return res.status(401).send({
        email: 'We can\'t use own email!'
      });
    }

    const collaborator = await User.findOne({email: userEmail});

    if (!collaborator) {
      return res.status(401).send({
        email: 'User was not found!'
      });
    }

    if (req.user.collaborators && req.user.collaborators.includes(collaborator._id)) {
      return res.status(401).send({
        email: 'Already shared for this user!'
      });
    }

    const userData = {
      collaborators: [collaborator._id]
    }

    if (req.user.collaborators && req.user.collaborators.length) {
      userData.collaborators = [...userData.collaborators, ...req.user.collaborators]
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, userData, { new: true })

    return res.send(updatedUser);
  } catch(e) {
    console.error(e);
    return res.sendStatus(500).send(e);
  }
});


router.put('/unshare', auth, async (req, res) => {
  try {
    const collaborator = await User.findOne({ _id: req.body.collaboratorId });

    if (!collaborator) {
      res.status(404).send({message: 'Collaborator not found!'});
    }

    const updatedCollaborator = await User.findByIdAndUpdate(req.body.collaboratorId, {
      collaborators: collaborator.collaborators.sort(item => item !== req.user._id)
    }, {new: true});

    return res.send(updatedCollaborator);
  } catch(e) {
    console.error(e);
    res.sendStatus(500).send(e);
  }
});

module.exports = router;