const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtControllers');

router.get('/', getAllThoughts);
router.get('/:id', getSingleThought);
router.post('/', createThought);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);

router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);


module.exports = router;
