const router = require('express').Router();
const { Activity } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new Activity
router.post('/', withAuth, async (req, res) => {
  try {
    const newActivity = await Activity.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newActivity);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Activity
router.put('/:id', withAuth, async (req, res) => {
  try {
    const activityData = await Activity.update(
      {
        name: req.body.name,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
      },
      {
        where: {
          id: req.params.id,
          // user_id: req.session.user_id,
        },
      }
    );

    if (!activityData) {
      res.status(404).json({ message: 'No activity found with this id!' });
      return;
    }

    res.status(200).json(activityData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Activity
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const activityData = await Activity.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!activityData) {
      res.status(404).json({ message: 'No activity found with this id!' });
      return;
    }

    res.status(200).json(activityData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// Get Activity Details
router.get('/:id', withAuth, async (req, res) => {
  console.log(req);
  try {
    const activityData = await Activity.findByPk(req.params.id, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!activityData) {
      res.status(404).json({ message: 'No activity found with this id!' });
      return;
    }

    res.status(200).json(activityData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
