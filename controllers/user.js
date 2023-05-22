const User = require('../models/user_model.js')
const {sequelize} = require('../utils/db_con.js')
exports.postAddUser = async (req,res,next) => {
    const transaction = await sequelize.transaction();
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    try{
    const user = await User.create({
        name:name,
        email:email,
        contact:contact
    },{transaction})

    await transaction.commit();
    res.status=201;
    res.json({'msg':"Created"})
    }catch(err){
        await transaction.rollback();
    }
}
exports.getUserList = async (req,res,next) => {

    const transaction = await sequelize.transaction();
    try{
        const users = await User.findAll({transaction});
        await transaction.commit();
        res.json(users)
    }catch(err){
        await transaction.rollback();
        res.err("Error")
    }
}
exports.getSingleUser = async (req,res,next) => {
    const transaction = await sequelize.transaction();
    const userId = req.params.userId;
    console.log(userId)
    try{
        const user = await User.findByPk(userId,{transaction})
        await transaction.commit();
        res.json(user)
    }catch(err){
        await transaction.rollback();
        res.error("Error");
    }
}
exports.updateUser = async (req,res,next) => {
    const transaction = await sequelize.transaction();
    const userId = req.params.userId;
    try{
        const user = await User.update({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact
        },{where:{id:userId}},{transaction})
        await transaction.commit();
        res.status(204).send('updated')
    }catch(err){
        await transaction.rollback(); 
        res.status(300).send('unsuccessful')}
}
exports.deleteUser = async (req,res,next) => {

    const transaction = await sequelize.transaction();
    const userId = req.params.userId;
    try{
    const user = await User.findByPk(userId,{transaction})
    const resp = await user.destroy({transaction});
    await transaction.commit();
    res.status(204).send('Deleted');
    }catch(err){
        await transaction.rollback();
        res.err("error")
    }
}