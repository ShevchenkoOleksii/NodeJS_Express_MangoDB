

const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    // const someArr2 = [
    //     {
    //         title: 'titles',
    //         _id: 'id'
    //     },
    //     {
    //         _id: 'new ObjectId("62227c777568dc3b6360cb22")',
    //         title: 'asda',
    //         completed: false,
    //         __v: 0
    //     }
    // ]

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
        // someArr: someArr2
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {

    const _id = req.body.id
    // console.log(myId)
    // const myTodo = await Todo.findOne({myId})
    // console.log(myTodo)

    const todo = await Todo.findOne({_id})

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})

module.exports = router