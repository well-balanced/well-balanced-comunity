
let users = [
    {
      id: 1,
      name: 'Woosik'
    },
    {
      id: 2,
      name: 'Hoseon'
    },
    {
      id: 3,
      name: 'Hyeonsu'
    }
]
exports.index = (req, res) => {
    res.json(users)
  };
  
exports.show = (req, res) => {
  const id = parseInt(req.params.id,10);
  if(!id){
      return res.status(400).json({error: 'Incorrect id'})
  }
  let user = users.filter(user=>user.id===id)[0]
  if(!user){
      return res.status(404).json({error: 'Unknown user'})
  }
  return res.json(user);
};

exports.destroy = (req, res) => {
  const id = parseInt(req.params.id,10);
  if(!id){
      return res.status(400).json({error: 'Incorrect ID'});
  }
  const userIndex = users.findIndex(user=>user.id===id)
  console.log(userIndex)
  if(userIndex===-1){
      return res.status(404).json({error: "Unknown user"});
  }
  users.splice(userIndex,1);
  res.status(204).send();
};

exports.create = (req, res) => {
  console.log(req.body)
  const name = req.body.name || '';
  if (!name.length){
      return res.status(400).json({error: 'Incorrect name'})
  }
};
