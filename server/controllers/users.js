/* IMPORTS */

// Modules
import User from "../models/User.js"





/* GET USER INFORMATION */
export const getUser = async (req, res) => {

    try {

        // Get user id from request parameters and find in database
        const { id } = req.params
        const user = await User.findById(id)

        // Respond with user
        res.status(200).json(user)
    } 
    catch (err) {
        
        // Respond with error
        res.status(404).json({ message: err.message })
    }
}





/* GET USER'S FRIEND LIST */

export const getUserFriends = async (req, res) => {

    try {

        // Get user id from request parameters and find in database
        const { id } = req.params
        const user = await User.findById(id)

        // Get array of user's friends from database and format it for response
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({
                _id, 
                username, 
                picturePath
            }) => {
            return { 
                _id, 
                username, 
                picturePath
            }}
        )

        // Respond with user's friends
        res.status(200).json(formattedFriends)
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message })
    }
}





/* UPDATE USER'S FRIEND LIST */

export const addRemoveFriend = async (req, res) => {

    try {

        // Get user id and friend id from request parameters and find in database
        const { userId, friendId } = req.params
        const user = await User.findById(userId)
        const friend = await User.findById(friendId)

        // If friend is in user's friends: remove friend from user's friends and vice versa
        // Else: add friend to user's friends and vice versa
        if (user.friends.includes(friendId) && friend.friends.includes(userId)) {

            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== userId)
        } 
        else {

            user.friends.push(friendId)
            friend.friends.push(userId)
        }

        // Update and save user and friend to database
        await user.save()
        await friend.save()

        // Respond with user's friends
        res.status(200).json(user.friends)
    } 
    catch (err) {

        // Respond with error
        res.status(404).json({ message: err.message })
    }
}
