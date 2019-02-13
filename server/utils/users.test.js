const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;
    beforeEach(() => {
        users = new Users;
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node'
        },
        {
            id: 2,
            name: 'Sean',
            room: 'Json'
        },
        {
            id: 3,
            name: 'Jason',
            room: 'Node'
        }]
    })

    it('should return the user object', () => {

        const users = new Users();

        const user = {
            id: 125,
            name: 'Sean',
            room: 'Devs'
        };

        const resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return array of people in node chat', () => {

        const usersList = users.getUserList('Node');

        expect(usersList).toEqual(['Mike','Jason']);

    });

    it('should return array of people in json chat', () => {

        const usersList = users.getUserList('Json');

        expect(usersList).toEqual(['Sean']);

    });

    it('should remove and then return user', () => {
        const user = users.removeUser(3);

        const usersList = users.getUserList('Node');

        expect(usersList).toEqual(['Mike']);
        expect(user).toHaveProperty('room', 'Node');
    });

    it('should return user', () => {
        const user = users.getUser(3);

        expect(user).toHaveProperty('room', 'Node');
    });


})