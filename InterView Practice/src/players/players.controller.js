const service = require("./players.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function playerExists(req, res, next) {
  const { playerId } = req.params;

  const player = await service.read(playerId);

  if (player) {
    res.locals.player = player;
    return next();
  }
  next({ status: 404, message: `Player id not found: ${playerId}` });
}

function read(req, res) {
  res.status(200).json({data:res.locals.player})
}


async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({data});
}

// async function destroy(req,res){
//   const { playerId } = req.params;
//   await service.delete(playerId)
//   res.sendStatus(204);
// } 
// async function destroy(req,res){
//   const {id} = res.locals.player;
//   await service.delete(id)
//   res.sendStatus(204);
// }



// Make sure exports are correct.
module.exports = {
  read: [asyncErrorBoundary(playerExists), asyncErrorBoundary(read)],
  create,
  // delete: [asyncErrorBoundary(playerExists), asyncErrorBoundary(destroy)],
};