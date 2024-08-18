import axios from "axios";

const getAllVacations = async () => {
  try {
    let vacations =
      await axios.get(`http://psuite:81/home/system/app/entityRestService/api/MyCompanyVacationProject/entities/Vacation/lists/Vacations
  `);
    if (vacations) {
      return vacations.data;
    }
  } catch (error) {
    throw new Error(`Error on get all Vacations :: ${error}`);
  }
};

export class VacationService {
  static getAllVacations = getAllVacations;
}
