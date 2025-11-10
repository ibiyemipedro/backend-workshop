db = db.getSiblingDB('userservice');

db.createUser({
  user: 'userservice',
  pwd: 'userservice123',
  roles: [
    {
      role: 'readWrite',
      db: 'userservice'
    }
  ]
});