const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req,res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id 
    })
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(400).send()
    }

})

router.get('/tasks', auth, async (req,res) => {

    try{
        //const tasks = await Task.find({})
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }
    catch(e){
        res.status(500).send()
    }

})

router.get('/tasks/:id',async (req,res) => {
    
    const _id = req.params.id
    try{
    
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }

})



router.patch('/tasks/:id', auth, async (req,res) => {
    const updateBody = Object.keys(req.body)
    const allowedupdates = ['description', 'completed']
    const ValidHai =  updateBody.every((update) => allowedupdates.includes(update))

    if(!ValidHai)
    {
        res.status(400).send({Error : 'Invalid Updates!'})
    }
    try
    {

            const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        

        updateBody.forEach((update) => {
            task[update] = req.body[update]
        });

        await task.save()
        
        if(!task)
        {
            return res.status(404).send()
        }

        res.send(task)
    }
    catch(e)
    {
        res.status(400).send(e)
    }

})


router.delete('/tasks/:id', auth, async (req, res) => {
     try
     {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task)
        {
            res.status(404).send()
        }
        res.send(task)
     }
     catch(e)
     {
        res.status(500).send(e)
     }
})

module.exports = router