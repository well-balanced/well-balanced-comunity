let users = [
    {
      id: 309,
      name: 'Woosik'
    },
    {
      id: 329,
      name: 'Hoseon'
    },
    {
      id: 310,
      name: 'Hyeonsu'
    }
]
var name = 'Hakjune'
const id = users.reduce((maxId,user)=>{
    console.log(maxId)
    return user.id>maxId ? user.id : maxId
},0)+1;

const newUser = {
    id:id,
    name:name
};

users.push(newUser);

console.log(users)