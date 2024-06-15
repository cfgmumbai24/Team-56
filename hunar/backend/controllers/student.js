




// Fetch crimes by title using a query
const fetchAllStudents = async (req, res) => {
  try {
    const { title } = req.query;
    const ele = req.body;
    const chkdistrict = ele.resultdistrictfromlocal;
    const data = await Model.find({
      $or: [
        {
          crimeCategory: title,
          district: { $regex: new RegExp(chkdistrict, "i") },
        },
        {
          crimeCategory: title,
          secondDistrict: { $regex: new RegExp(chkdistrict, "i") },
        },
        {
          crimeCategory: title,
          description: { $regex: new RegExp(chkdistrict, "i") },
        },
      ],
    });

    console.log("data", data);
    res.status(200).json({
      result: data,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

module.exports = {
  getCrimeById,
  deleteCrime,
  updateCrime,
  uploadCrime,
  fetchCrime,
  fetchCrimesByTitle,
};
