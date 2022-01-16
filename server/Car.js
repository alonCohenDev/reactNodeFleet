const moment = require('moment')
const getTypeStr = (type) => {
  switch(type){
    case 0:
      return 'Sedan';
    case 1:
        return 'Truck';
    case 2:
        return 'SUV';
    case 3:
        return 'Semi Trailer';
    case 4:
        return 'Full Trailer';

  }
}

const CarType = Object.freeze({
    Sedan: 0,
    Truck: 1,
    SUV: 2,
    SemiTrailer: 3,
    FullTrailer: 4,
  });

class Car{
    constructor(id, carType, name, latLng) {
        this.Id = id;
        this.Type = getTypeStr(carType);
        this.Name = name;
        this.GeoLocation = latLng;
        this.TimeCreated = moment().format("DD.MM.YY");
        this.LastSuccesssfulConnection = moment().subtract(1, "days").format("DD.MM.YY");
      }

}

module.exports = Car;