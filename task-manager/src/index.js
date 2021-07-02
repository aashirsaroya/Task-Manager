const express = require('express')
require('./db/mongoose') 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000



app.use(express.json())

app.use(userRouter)

app.use(taskRouter)

app.listen(port, () => console.log('Server is up on port ' + port))

const jwt = require('jsonwebtoken')


const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
    // const task = await Task.findById('60df06d31202b40a74b8fff1')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('60df1d99f455424568bf9e33')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

}

main()