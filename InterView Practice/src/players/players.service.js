
const knex = require("../db/connection");
const tableName = "players";

// return all of the info from tableName where the column id first matches the value of playerId                                
//id = column name, ":" is comparing equality, playerID = value 

function read(playerId){
  return knex(tableName)
    .select("*")
    .where({id : playerId})
    .first()
  }

//Insert the new player data into the database and return all the details of the newly inserted record.
//.then((data) => data[0]): After the insertion is complete, the promise resolves with an array containing the newly inserted records. Since you're inserting only one record, you return the first element of the array (data[0]).
function create(newPlayer) {
  return knex(tableName)
    .insert(newPlayer, "*")
    .then((data) => data[0]);
}

module.exports = {
  create,
  read,
};
