const sayHello = (req,res) => {
    res.status(200).json({message:'from fraustration'})
}

const updateUser = (req,res) => {
    const { fullname,bio,country } = req.body
    console.log(fullname)
    console.log(bio)
    console.log(country)

    res.status(200).json({
        message:'hello'
    })



}

module.exports = {
    sayHello,
    updateUser
}