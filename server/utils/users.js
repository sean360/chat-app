//add user - id naem roomName
//remove user - id
//fetch user - id
//get user list - roomName

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        let user = {
            id,
            name,
            room
        }
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        //return user
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
    }

    getUser (id) {
        const user = this.users.filter((user) => user.id === id)[0];
        return user;
    }

    getUserList (room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};