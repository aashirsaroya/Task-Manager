require('../src/db/mongoose')
const  Task = require('../src/models/task')

// Task.findByIdAndDelete('60d98f19fd6f092c20a9efe4').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((c) =>{
//     console.log(c)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount =  async (id) => {
     const task = await Task.findByIdAndDelete(id)
     const count = await Task.countDocuments({completed: false})
     return count
}

deleteTaskAndCount('60dc4f9f47d23fc4df92267f').then((c) => {
        console.log('Count is:',c)
}).catch((e) => {
        console.log(e)
})