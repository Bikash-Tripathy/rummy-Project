const PointTableMaster = require('../model/pointTableMaster');

// Create a new pointTableMaster entry
exports.createPointTableMaster = async (req, res) => {
    try {
      const { pointValue, bootValue, action, addedDateTime } = req.body;
      //const addedDateTime = new Date(); // Get the current date and time
      const pointTableMaster = new PointTableMaster({ pointValue, bootValue, action, addedDateTime });
      const savedPointTableMaster = await pointTableMaster.save();
      res.status(201).json(savedPointTableMaster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Get a list of all pointTableMaster entries
exports.getAllPointTableMasters = async (req, res) => {
    try {
      const pointTableMasters = await PointTableMaster.find();
      res.json(pointTableMasters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Get a single pointTableMaster entry by ID
exports.getPointTableMasterById = async (req, res) => {
    try {
      const pointTableMasterId = req.params.id;
      const pointTableMaster = await PointTableMaster.findById(pointTableMasterId);
      if (!pointTableMaster) {
        return res.status(404).json({ message: 'PointTableMaster1 not found' });
      }
      res.json(pointTableMaster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

 // Update a pointTableMaster entry by ID
exports.updatePointTableMasterById = async (req, res) => {
    try {
      const pointTableMasterId = req.params.id;
      const { pointValue, bootValue, action } = req.body;
      const addedDateTime = new Date(); // Get the current date and time
      const updatedPointTableMaster = await PointTableMaster.findByIdAndUpdate(
        pointTableMasterId,
        { pointValue, bootValue, action, addedDateTime },
        { new: true }
      );
      if (!updatedPointTableMaster) {
        return res.status(404).json({ message: 'PointTableMaster2 not found' });
      }
      res.json(updatedPointTableMaster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Delete a pointTableMaster entry by ID
exports.deletePointTableMasterById = async (req, res) => {
    try {
      const pointTableMasterId = req.params.id;
      const deletedPointTableMaster = await PointTableMaster.findByIdAndRemove(pointTableMasterId);
      if (!deletedPointTableMaster) {
        return res.status(404).json({ message: 'PointTableMaster3 not found' });
      }
      res.json({ message: 'PointTableMaster deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
  
  
