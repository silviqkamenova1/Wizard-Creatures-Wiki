const router = require('express').Router();
const mongoose = require('mongoose');

const { isAuth } = require('../middlewares/authMiddleware');
const wikiService = require('../services/wikiService');
const { getErrorMessage } = require('../utils/errorutils');


router.get('/catalog', async (req, res) => {

    const creatures = await wikiService.getAll();
    res.render('wiki/catalog', { creatures });
});

router.post('/create', isAuth, async (req, res) => {
    const creatureData = req.body;

    try {
        await wikiService.create(req.user._id, creatureData);
    } catch (error) {
        return res.status(400).render('wiki/create', { error: getErrorMessage(error) });
    }

    res.redirect('/wiki/catalog');
});

router.get('/:creatureId/details', async (req, res) => {
    const creature = await wikiService.getOneDetailed(req.params.creatureId).lean();
    console.log(creature);
    ObjectId = creature.owner._id;
    const isOwner = ObjectId.toString() == req.user?._id;
    const isVote = creature.votes?.some(id => id == req.user?._id);

    res.render('wiki/details', { ...creature, isOwner, isVote });
});

router.get('/:creatureId/vote', isAuth, async (req, res) => {
    const value = req.params.type == 'vote' ? 1 : '';
    try {
        const data = await wikiService.vote(req.user._id, req.params.creatureId, value);

        res.redirect(`/wiki/${req.params.creatureId}/details`);
    } catch (error) {
        console.log(error);
        return res.render('404');
    }

});
router.get('/:creatureId/edit', isAuth, async (req, res) => {
    const creature = await wikiService.getOne(req.params.creatureId);
    console.log(creature);
    res.render('wiki/edit', { ...creature });
});

router.post('/:creatureId/edit', isAuth, async (req, res) => {
    await wikiService.edit(req.params.creatureId, req.body);

    res.redirect(`/wiki/${req.params.creatureId}/details`);
});

router.get('/profile', async (req, res) => {

    const data = await wikiService.getPostByAuthor(req.user._id).lean();
    console.log(data);
    res.render('wiki/profile', { data });
});


router.get('/create', isAuth, (req, res) => {
    res.render('wiki/create');
});


router.get('/:creatureId/delete', isAuth, async (req, res) => {

    await wikiService.delete(req.params.creatureId);
    res.redirect('/wiki/catalog');
});


module.exports = router;