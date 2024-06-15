const Model = require("../models/model");
const Incident = require("../models/incident");
const firNumber = async (req, res) => {
  try {
    const { firNumber } = req.params;
    const data = await Model.find({ firNumber: firNumber });
    if (data) {
      res.status(200).json({
        result: data,
      });
    } else {
      res.status(404).json({
        message: `No records found for FIR number: ${firNumber}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const crimeCategory = async (req, res) => {
  const { crimeCategory, keyword, dateFrom, dateTo, district } = req.body;
  console.log(crimeCategory, keyword, dateFrom, dateTo, district);
  if (
    crimeCategory === "" &&
    keyword === "" &&
    dateFrom === "" &&
    dateTo === "" &&
    district === ""
  ) {
    return res.status(400).json({
      message: `Please enter atleast one search criteria`,
    });
  } else {
    try {
      if (dateFrom && dateTo && crimeCategory && keyword && district) {
        const data = await Model.find({
          crimeCategory: crimeCategory,
          description: new RegExp(keyword, "i"),
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
          district: district,
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (dateFrom && dateTo && crimeCategory && keyword) {
        const data = await Model.find({
          crimeCategory: crimeCategory,
          description: new RegExp(keyword, "i"),
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
          // district: district
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (dateFrom && dateTo && crimeCategory && district) {
        const data = await Model.find({
          crimeCategory: crimeCategory,
          // description: new RegExp(keyword, "i"),
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
          district: district,
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (dateFrom && dateTo && district && keyword) {
        const data = await Model.find({
          // crimeCategory: crimeCategory,
          description: new RegExp(keyword, "i"),
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
          district: district,
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (dateFrom && dateTo && crimeCategory) {
        const data = await Model.find({
          crimeCategory: crimeCategory,
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (dateFrom && dateTo && keyword) {
        const data = await Model.find({
          description: new RegExp(keyword, "i"),
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (dateFrom && dateTo && district) {
        const data = await Model.find({
          // description: new RegExp(keyword, "i"),
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
          district: district,
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (dateFrom && dateTo) {
        const data = await Model.find({
          date: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (crimeCategory && keyword) {
        const data = await Model.find({
          crimeCategory: crimeCategory,
          description: new RegExp(keyword, "i"),
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (district && keyword) {
        const data = await Model.find({
          // crimeCategory: crimeCategory,
          district: district,
          description: new RegExp(keyword, "i"),
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (crimeCategory && district) {
        const data = await Model.find({
          crimeCategory: crimeCategory,
          district: district,
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (keyword) {
        const data = await Model.find({
          description: new RegExp(keyword, "i"),
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (crimeCategory) {
        const data = await Model.find({
          crimeCategory: crimeCategory,
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      } else if (district) {
        const data = await Model.find({
          district: district,
        });
        if (data) {
          res.status(200).json({
            result: data,
          });
        } else {
          res.status(404).json({
            message: `No records found for the given search criteria`,
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const filter = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    const districtfromlocal = data.resultdistrictfromlocal;
    if (data.dataToSend === null) {
      const result = await Model.find({
        $and: [
          {
            district: { $not: { $regex: new RegExp(districtfromlocal, "i") } },
          },
          {
            description: {
              $not: { $regex: new RegExp(districtfromlocal, "i") },
            },
          },
        ],
      });
      console.log("Result : ", result);
      return res.status(200).json({ result: [result] });
    }
    const district = Object.keys(JSON.parse(data.dataToSend));
    console.log("district : ", district);
    data = JSON.parse(data.dataToSend);
    const resultsArray = [];
    const promises = [];
    for (const location in data) {
      for (const category in data[location]) {
        console.log("location : ", location, " category  : ", category);
        const promise = data[location][category][0].includes("All")
          ? Model.find({
              $or: [
                {
                  district: location,
                  crimeCategory: category,
                },
                {
                  secondDistrict: location,
                  crimeCategory: category,
                },
              ],
            })
          : Model.find({
              $or: [
                {
                  secondDistrict: location,
                  crimeCategory: category,
                  description: new RegExp(
                    { $in: data[location][category] },
                    "i"
                  ),
                },
              ],
            });
        promises.push(promise);
      }
    }
    const data2 = await Model.find({
      $or: [
        {
          district: districtfromlocal,
        },
        {
          secondDistrict: districtfromlocal,
        },
        {
          description: { $regex: new RegExp(districtfromlocal, "i") },
        },
      ],
    });
    await Promise.all(promises).then((results) => {
      results.forEach((result) => {
        result.forEach((doc) => {
          resultsArray.push(doc.toObject());
        });
      });
    });
    const resultArray = resultsArray.filter(
      (element) => !data2.includes(element)
    );
    res.json({ result: [resultArray] }).status(200);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// const marquee = async (req, res) => {
//   try {
//     const result = await Model.find({
//       isHighlighted: true,
//     });
//     // console.log("marquee", result);
//     return res.json(result).status(200);
//   } catch (error) {
//     console.log("marquee error", error);
//   }
// };

const marquee = async (req, res) => {
  try {
    // Execute both queries in parallel
    const [modelResults, incidentResults] = await Promise.all([
      Model.find({ isHighlighted: true }),
      Incident.find({ isHighlighted: true }),
    ]);

    // Combine the results from both queries
    const combinedResults = [...modelResults, ...incidentResults];

    // Return the combined results
    return res.status(200).json(combinedResults);
  } catch (error) {
    // Log the error and return a server error response
    console.log("marquee error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const firfilter = async (req, res) => {
  try {
    const result = await Model.find({});
    return res.json(result).status(200);
  } catch (error) {
    console.log("filter fir error", error);
  }
};

const filterIncidents = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    const districtfromlocal = data.resultdistrictfromlocal;
    if (data.resultdistrictfromlocal === "") {
      const result = await Incident.find();
      return res.status(200).json({ result: [result] });
    }
    if (data.dataToSend === null) {
      const result = await Incident.find({
        $and: [
          {
            district: { $not: { $regex: new RegExp(districtfromlocal, "i") } },
          },
          {
            description: {
              $not: { $regex: new RegExp(districtfromlocal, "i") },
            },
          },
        ],
      });
      console.log("Result : ", result);
      return res.status(200).json({ result: [result] });
    }
    const district = Object.keys(JSON.parse(data.dataToSend));
    console.log("district : ", district);
    data = JSON.parse(data.dataToSend);
    const resultsArray = [];
    const promises = [];
    for (const location in data) {
      for (const category in data[location]) {
        console.log("location : ", location, " category  : ", category);
        console.log("data[location][category] : ", data[location][category]);
        console.log(
          'data[location][category][0].includes("All") : ',
          data[location][category][0].includes("All")
        );
        const regexPattern = data[location][category].join("|");
        const regex = new RegExp(regexPattern, "i");

        const promise = data[location][category][0].includes("All")
          ? Incident.find({
              $or: [
                {
                  district: location,
                },
              ],
            })
          : Incident.find({
              $or: [
                {
                  district: location,
                  type: regex,
                },
              ],
            });
        promises.push(promise);
      }
    }
    console.log("promises : ", promises);
    const data2 = await Incident.find({
      $or: [
        {
          district: districtfromlocal,
        },
        {
          secondDistrict: districtfromlocal,
        },
        {
          description: { $regex: new RegExp(districtfromlocal, "i") },
        },
      ],
    });
    await Promise.all(promises).then((results) => {
      results.forEach((result) => {
        result.forEach((doc) => {
          resultsArray.push(doc.toObject());
        });
      });
    });
    const resultArray = resultsArray.filter(
      (element) => !data2.includes(element)
    );
    res.json({ result: [resultArray] }).status(200);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  firNumber,
  crimeCategory,
  filter,
  marquee,
  firfilter,
  filterIncidents,
};
