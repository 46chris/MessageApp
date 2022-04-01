//https://www.npmjs.com/package/getstream
const { connect } = require('getstream'); 
const bcrypt = require('bcrypt'); 
const StreamChat = require('stream-chat')
const crypto = require('crypto');

//NOTE!!! getstream is the company's activity feed API whereas Streamchat is their 
//chat API. Both have their own auth functions. 

//https://www.youtube.com/watch?v=MJzbJQLGehs 1hr 31 min 
const api_key = process.env.STREAM_API_KEY; 
const api_secret = process.env.STREAM_API_SECRET; 
const app_id = process.env.STREAM_API_ID; 

const signup = async (req,res) => {
    try{
        const { fullName, username, password, phoneNumber } = req.body; 

        const userId = crypto.randomBytes(16).toString('hex'); 

        //Instantiate a new client server side  
        const serverClient = connect(api_key, api_secret, app_id); 

        //This is just encrypting the plain text password obtained from the req body 
        //Second number entails how much the password will be encrypted 
        const hashedPassword = await bcrypt.hash(password, 10); 

        //Generate userToken using userId so that it can be used to instantiate UI 
        // components in the frontend 
        const token = serverClient.createUserToken(userId); 

        //This details the response data which should be sent to the frontend 
        res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber })


    } catch (error){ 
        console.log(error); 

        resizeBy.status(500).json({message:error}); 
    }
};

const login = async (req, res) => {
    try{
        //username and password is populated as user fills in the login form 
        const { username, password } = req.body

        //Again instantiating a new client server side
        const serverClient = connect(api_key, api_secret, app_id); 
        const client = StreamChat.getInstance(api_key, api_secret); 

        //This queries all users and then searches for the user with name == username
        //Note that queryUsers returns an array so even if there's one user with that username
        //we have to access it by doing users[0]
        const { users } = await client.queryUsers({ name: username }); 

        if(!users.length) return res.status(400).json({ message: 'user not found'}); 

        //Successfully found a username equal to the one entered. Now rehash the password they entered
        // on the form and see if it matches the one we stored during account creation
        const success = await bcrypt.compare(password, users[0].hashedPassword); 

        //Again generate usertoken to be used in frontend
        const token = serverClient.createUserToken(users[0].id); 

        if (success) { 
            res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id }); 
        } else { 
            res.status(500).json({ message: 'Incorrect password' })
        }

    } catch (error){ 
        console.log(error); 

        resizeBy.status(500).json({message:error}); 
    }
}; 


module.exports = { signup, login } 