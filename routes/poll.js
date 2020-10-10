const express = require('express');
const router = express.Router();
const { validate, Model } = require('./../models/model');
const makeId = require('./../functions/makeid');
const mongoose = require('mongoose');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  res.render('index', { error: false });
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.render('index', { error: true, message: error.details[0].message });

  const id = makeId(6);

  const newOne = new Model({
    first: {
      name: req.body.first,
      votes: 0
    },
    second: {
      name: req.body.second,
      votes: 0
    },
    third: {
      name: req.body.third,
      votes: 0
    },
    fourth: {
      name: req.body.fourth,
      votes: 0
    },
    redirectkey: id
  });
  await newOne.save();

  res.redirect(`/poll/${id}`);
});

router.put('/poll/vote', async (req, res) => {
  const redirectKey = req.query.redirectKey;
  const pollId = req.query.pollId;

  const found = await Model.findOne({ redirectkey: { $eq: redirectKey }});

  let newOneToUpdate = {};

  switch (pollId) {
    case "first":
      newOneToUpdate = {
        first: {
          name: found.first.name,
          votes: found.first.votes + 1,
        },        
        second: {
          name: found.second.name,
          votes: found.second.votes
        },        
        third: {
          name: found.third.name,
          votes: found.third.votes
        },        
        fourth: {
          name: found.fourth.name,
          votes: found.fourth.votes
        }        
      }
      break;
    case "second":
      newOneToUpdate = {
        first: {
          name: found.first.name,
          votes: found.first.votes,
        },        
        second: {
          name: found.second.name,
          votes: found.second.votes + 1
        },        
        third: {
          name: found.third.name,
          votes: found.third.votes
        },        
        fourth: {
          name: found.fourth.name,
          votes: found.fourth.votes
        }        
      }
      break;
    case "third": 
      newOneToUpdate = {
        first: {
          name: found.first.name,
          votes: found.first.votes,
        },        
        second: {
          name: found.second.name,
          votes: found.second.votes
        },        
        third: {
          name: found.third.name,
          votes: found.third.votes + 1
        },        
        fourth: {
          name: found.fourth.name,
          votes: found.fourth.votes
        }        
      }
      break;
    case "fourth": 
      newOneToUpdate = {
        first: {
          name: found.first.name,
          votes: found.first.votes,
        },        
        second: {
          name: found.second.name,
          votes: found.second.votes
        },        
        third: {
          name: found.third.name,
          votes: found.third.votes
        },        
        fourth: {
          name: found.fourth.name,
          votes: found.fourth.votes + 1
        }        
      }
      break;
    default: newOneToUpdate = {}
  };

  const updated = await Model.findByIdAndUpdate(found._id, newOneToUpdate, {
    new: true
  });

  res.send(updated);
});

router.get('/poll/:id', async (req, res) => {
  const redirectkey = req.params.id;
  const poll = await Model.findOne({ redirectkey: { $eq: redirectkey } });
  if(!poll) return res.render('notFound');

  res.render('vote', { poll: poll });
});

router.get('/api/raw/votes/:redirectKey', async (req, res) => {
  const redirectKeyForPoll = req.params.redirectKey;
  const dataToSend = await Model.findOne({ redirectkey: { $eq: redirectKeyForPoll }});
  res.send(dataToSend);
});

router.get('/polls/results/:redirectKey', async (req, res) => {
  const redirectKeyForPoll = req.params.redirectKey;
  const dataToSend = await Model.findOne({ redirectkey: { $eq: redirectKeyForPoll }});
  if(!dataToSend) return res.render('notFound');

  res.render('result', { poll: dataToSend });
});

router.get('/poll/*', (req, res) => {
  res.render('notFound');
});

router.get('/polls/results/*', (req, res) => {
  res.render('notFound');
});

module.exports = router;