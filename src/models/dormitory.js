const mongoose = require('smongoose');
const Schema = mongoose.Schema
const DormitorySchema = new Schema({
  LocationId: {
    type: Number
  },
  DormFloorCount: {
    type: Number
  },
  HasElevator: {
    type: Boolean
  }
})

const Dormitory = mongoose.model('dormitories', DormitorySchema)

module.exports = Dormitory;