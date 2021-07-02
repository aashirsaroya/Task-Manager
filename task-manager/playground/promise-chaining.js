require('../src/db/mongoose')
const User = require('../src/models/user')
//60d98f19fd6f092c20a9efe4

// User.findByIdAndUpdate('60d9d6272354f143247e0e4a',{ age: 20}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 20})
// }).then((c) => {
//     console.log(c)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount =   async (id,age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments( { age } )
    return count;
}

updateAgeAndCount('60d9d6272354f143247e0e4a',21 ).then((count) =>{
    console.log(count)
}).catch((e) => {
    console.log('error',e)
})