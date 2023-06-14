const Tour = require("../models/tour");

exports.getAllTours = async (req, res) => {

  try {
    // 1. BUILD QUERY

    //  1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);  //ex
    // console.log(queryObj)
    //  1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}` );
    // console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
      if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      }else{
        query = query.sort('-createdAt')
      };

    // 3) Field limiting
      
      if(req.query.fields) {
        const fields = req.query.field.split(',').join(' ');
        query = query.select(fields);
      }else {
        query = query.select('-__v')
      };

    // 4) Pagination

    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 || 100 ;
    const skip = (page - 1) * limit ;

    query = query.skip(skip).limit(limit);

    if(req.query.page){
      
    }


      


    // EXECUTE QUERY
    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
 
};

exports.getTour = async (req, res) => {
  try {
    
    const tour = await Tour.findById(req.params.id);

    if(tour){ res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });}
    else{
      res.status(400).json({
        status: 'fail',
        message: 'Tour not found! Invalid ID.'
      });
    }

   
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
 
};

exports.createTour = async (req, res) => {
 
 try {
  const tour =  await Tour.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
 } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  
};
};

exports.updateTour = async (req, res) => {

  try {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

exports.deleteTour = async (req, res) => {

  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
  });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  };
};


