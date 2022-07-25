const pool = require('../../db').pool;
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv-defaults');
dotenv.config();

const saltRounds = 10;

const getUsers = async (request, response) => {
    userQuery =  'SELECT * FROM users';
    res = await pool.query(userQuery)
    response.status(200).json(res.rows)
}

const register = async (request, response) => {
    const { userName, password, gender, phoneNum, fbUrl, dormID } = request.body;
    const hash = await bcrypt.hash(password, saltRounds)
    Query =  'INSERT INTO users (user_name, gender, phone_num, fb_url, dorm_id, password) VALUES ($1, $2, $3, $4, $5, $6)';
    try{
        await pool.query(Query, [userName, gender, phoneNum, fbUrl, dormID, hash]);
        response.status(200).send({ message: 'success'});
    }
    catch(err){
        response.status(403).send({ message: 'error', err_msg: err});
    }
}

const login = async (request, response) => {
    const { userName, password } = request.body;
    Query =  'SELECT * FROM users WHERE user_name = $1';
    const user = await pool.query(Query, [userName]);

    if (!user) {
        response.status(404).send({ message: 'error', err_msg: "User Not found."});
        return
    }

    if (await passwordInvalid(user.rows[0], password)) {
        response.status(401).send({ message: 'error', err_msg: "Invalid Password!"});
    }

    await updateUserStatus(user.rows[0], response);
    response.status(200).send({ message: 'success', user_id: user.rows[0].user_id});
}

const getOneUser = async (request, response) => {
    const { user_id } = request.params;
    Query =  'SELECT * FROM users WHERE user_id = $1 ';
    const user = await pool.query(Query, [user_id]);

    if (!user) {
        response.status(404).send({ message: 'error', err_msg: "User Not found."});
        return
    }

    serviceCount = 1
    userPointList = []
    while(serviceCount < 5){
        Query = 'SELECT * FROM user_points WHERE user_id = $1 and service_id = $2';
        const pointInfo = await pool.query(Query, [user_id, serviceCount]);
        userPointList.push({
            "service_id": pointInfo.rows[0].service_id,
            "avg_rating": pointInfo.rows[0].avg_rating,
            "counts": pointInfo.rows[0].counts,
            "level_id": pointInfo.rows[0].level_id
        });
        serviceCount += 1;
    }
    response.status(200).send({ 
        message: 'success', 
        user_id: user.rows[0].user_id,
        userName: user.rows[0].user_name,
        gender: user.rows[0].gender,
        phoneNum: user.rows[0].phone_num,
        fbUrl: user.rows[0].fb_url,
        dormId: user.rows[0].dorm_id,
        userPoints: userPointList,
    });
}

const passwordInvalid = async(user, password) => {
    const passwordIsValid = await bcrypt.compare(password, user.password);
    return !passwordIsValid;
}

const updateUserStatus = async(user, response) => {
    const token = jwt.sign({User_ID: user.user_id}, process.env.JWTPRIVATEKEY, {expiresIn: "2h",});
    user.token = token;
    Query = 'UPDATE users SET token = $1 WHERE user_id = $2';
    await pool.query(Query, [token, user.user_id]);
    response.cookie('token', user.Token, {httpOnly: true});
}

module.exports = {
    getUsers,
    register,
    login,
    getOneUser
}
