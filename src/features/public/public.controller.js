const Data = require("../../shared/resources/data");

const contactUs = (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const message = req.body.message;

  const responseMessage = `Message received from ${firstName} ${lastName}`;

  console.log(responseMessage);
  res.send(responseMessage);
};

const calculateResidentialQuote = (req, res) => {
  // define constants
 
  const tier = req.query.tier.toLowerCase();

  const buildingType = req.params.building_type;
if (!Object.keys(Data.unitPrices).includes(tier)) {
  res.status(400);
  res.send(`Error: invalid tier`);
  return;
}
  if (buildingType === "residential") {
    const apts = +req.query.apts;
    const floors = +req.query.floors;
    if (isNaN(floors) || isNaN(apts)) {
      res.status(400);
      res.send(`Error: apts and floors must be specified as numbers`);
      return;
    }

    if (!Number.isInteger(floors) || !Number.isInteger(apts)) {
      res.status(400);
      res.send(`Error: apts and floors must be integers`);
      return;
    }

    if (floors < 1 || apts < 1) {
      res.status(400);
      res.send(`apts and floors must be greater than zero`);
      return;
    }
    const numElevators = calcResidentialElev(floors, apts);
    const totalCost = calcInstallFee(numElevators, tier);

    // format response
    res.send({
      elevators_required: numElevators,
      cost: totalCost,
    });
  }

  if (buildingType === "commercial") {

    const floors = +req.query.floors;
    const Occupancy = +req.query.occupancy;
    
    if (isNaN(floors) || isNaN(Occupancy)) {
      res.status(400);
      res.send(`Error: Occupancy and floors must be specified as numbers`);
      return;
    }

    if (!Number.isInteger(floors) || !Number.isInteger(Occupancy)) {
      res.status(400);
      res.send(`Error: Occupancy and floors must be integers`);
      return;
    }

    if (floors < 1 || Occupancy < 1) {
      res.status(400);
      res.send(`Occupancy and floors must be greater than zero`);
      return;
    }
    const numElevators = calcCommercialElev(floors, Occupancy);
    const totalCost = calcInstallFee(numElevators, tier);

    // format response
    res.send({
      elevators_required: numElevators,
      cost: totalCost,
    });
  }
  if (buildingType === "industrial") {

    const elevators = +req.query.elevators;

        if (isNaN(elevators)) {
          res.status(400);
          res.send(`Error: elevators must be specified as numbers`);
          return;
        }

        if (!Number.isInteger(elevators) ) {
          res.status(400);
          res.send(`Error: elevators must be integers`);
          return;
        }

        if (elevators< 1) {
          res.status(400);
          res.send(`elevators must be greater than zero`);
          return;
        }
        
        const totalCost = calcInstallFee(elevators, tier);

        // format response
        res.send({
          elevators_required: elevators,
          cost: totalCost,
        });
  }
  
};

const calcResidentialElev = (numFloors, numApts) => {
  const elevatorsRequired =
    Math.ceil(numApts / numFloors / 6) * Math.ceil(numFloors / 20);
  return elevatorsRequired;
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
  const elevatorsRequired =
    Math.ceil((maxOccupancy * numFloors) / 200) * Math.ceil(numFloors / 10);
  const freighElevatorsRequired = Math.ceil(numFloors / 10);
  return freighElevatorsRequired + elevatorsRequired;
};

const calcInstallFee = (numElvs, tier) => {
  const unitPrice = Data.unitPrices[tier];
  const installPercentFees = Data.installPercentFees[tier];
  const total = numElvs * unitPrice * installPercentFees;
  return total;
};

module.exports = { contactUs, calculateResidentialQuote };
