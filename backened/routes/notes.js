const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser');
const { findById } = require('../models/Notes');
const model = require('../models/Notes')
const usermodel = require('../models/User')


//ROUTE 1 : get all the notes using GET req 'api/notes/fetchallnotes', login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await model.find({ user: req.user.id })
    res.json(notes);
})

//ROUTE 2 : add a note using POST req 'api/notes/addnotes' , login required
router.post('/addnotes', fetchuser, [
    body('title', 'it cannot be empty').isLength({min : 1}),
    body('description', 'it cannot be empty').isLength({min : 1})
], async (req, res) => {
    const err = validationResult(req);
    if ((!err.isEmpty())) {
        return res.status(404).json({ error: err.array() });
    }
    const notes = await model.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
        tag: req.body.tag
    })
    if (!notes) { return res.status(404).json({ error: 'some error occured in adding data' }) }
    res.json(notes);
})


//ROUTE 3 : updating a note with POST request 'api/notes/updatenotes' , login required
router.put('/updatenotes/:id',fetchuser,[
    body('title','it must not be empty').isLength({min : 1}),
    body('description','it must not be empty').isLength({min : 1})
],async(req,res)=>{

    const note =await model.findById(req.params.id);   //to check if the note is there or not
    if(!note){ return res.status(404).json({error : "not found"})} 

    const newnote = {};
    if(req.body.title){ newnote.title = req.body.title;}
    else { newnote.title = note.title}
    if(req.body.description) {newnote.description = req.body.description}
    else { newnote.description = note.description}
    if(req.body.tag) {newnote.tag = req.body.tag}
    else { newnote.tag = note.tag}


    

    //if unauthorized user tries to access it
    if(note.user.toString() != req.user.id){return res.status(404).json({error : "not found"}) }

    await model.findByIdAndUpdate(req.params.id,{$set : newnote},{new : true});
    res.json(note);


    
})


//ROUTE 4 : deleting a note using DELETE req 'api/notes/deletenote', login required
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
    const note = await model.findById(req.params.id);
    
    //to check if the note exists or not
    if(!note) { return res.status(404).json({error : "not found"})}

    //checking if the user is correct or not
    if(note.user.toString() != req.user.id) {return res.status(404).json({error : "not allowed"})}

    model.findByIdAndDelete(req.params.id).then(()=>{
        res.json(note);
    })
    

})


module.exports = router;