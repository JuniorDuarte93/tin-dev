const Dev = require('../model/Dev')

module.exports = {
    async store(req, res) {

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev not exists'});
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('DEU MATCH!')
            const loggedSocket = request.connectedUsers[user]
            const targetSocket = request.connectedUsers[devId]

            if (loggedSocket) {
                request.io.to(loggedSocket).emit('match', targetDev)
            }

            if (targetSocket) {
                request.io.to(targetSocket).emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);


    }
};