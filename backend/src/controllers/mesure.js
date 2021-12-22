const client = require('../dbClient')

module.exports = {
  create: (mesure, callback) => {
    // Check parameters
    if(!mesure.datetime)
      return callback(new Error("Wrong mesure parameters"), null)
    // Create mesure schema
    const mesureObj = {
      datetime: mesure.datetime,
      nom: mesure.nom,
      pollution: mesure.pollution,
    }
    client.exists("mesure:"+mesure.datetime, function(err, res){
      if (res==1) 
        return callback(new Error("Warning: the mesure already exists"), null)
      else{
        // Save to DB
        client.hmset("mesure:"+mesure.datetime, mesureObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
  get: (datetime, callback) => {
    if(!datetime) return callback(new Error("Wrong mesure parameters"), null)
    client.exists("mesure:"+datetime, function(err, res){
      if (res==0) return callback(new Error("mesure doesn't exist in database"), null)
      else{
        client.hgetall("mesure:"+datetime, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  delete: (datetime, callback) => {
    if(!datetime) return callback(new Error("Wrong mesure parameters"), null)
    client.exists("mesure:"+datetime, function(err, res){
      if (res==0) return callback(new Error("mesure doesn't exist in database"), null)
      else{
        client.del("mesure:"+datetime, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  getAll: (callback) => {
        client.keys("mesure:*", function(err, res) {
	  const multi = client.multi()
	  res.forEach(datetime => multi.hgetall(datetime))
          multi.exec(function(err, res){
	  	if (err) return callback(err, null)
         	return callback(null, res)
	  })    
        })
  },
   put: (mesure, callback) => {
    // Check parameters
    if(!mesure.datetime)
      return callback(new Error("Wrong mesure parameters"), null)
    // Create mesure schema
    const mesureObj = {
      datetime: mesure.datetime,
      nom: mesure.nom,
      pollution: mesure.pollution,
    }
    client.exists("mesure:"+mesure.datetime, function(err, res){
      if (res==0) 
       return callback(new Error("Warning: the mesure already exists"), null)
      else{
        // Save to DB
        client.hmset("mesure:"+mesure.datetime, mesureObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
}
