import axios from "axios";

const createVacation = async (vacation) => {
  try {
    let requestBody = {
      Properties: {
        EmployeeID: vacation.EmployeeID,
        EmployeeName: vacation.EmployeeName + "",
        VacationType: vacation.VacationType + "",
        StartAt: vacation.StartAt + "",
        EndAt: vacation.EndAt + "",
        NumberOfDays: vacation.NumberOfDays,
        Reason: vacation.Reason + "",
        ManagerApproval: "Pending",
        HRApproval: "Pending",
      },
    };

    let request = await axios.post(
      `http://psuite:81/home/system/app/entityRestService/api/MyCompanyVacationProject/entities/Vacation
?SAMLart=${localStorage.getItem("SamlArt")}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
    if (request.data) {
      console.log(request.data);
      return request.data;
    }
  } catch (error) {
    throw new Error(`Error on create vacation :: ${error}`);
  }
};

const getAllVacations = async () => {
  try {
    let vacations = await axios.get(
      `http://psuite:81/home/system/app/entityRestService/api/MyCompanyVacationProject/entities/Vacation/lists/Vacations?SAMLart=${localStorage.getItem(
        "SamlArt"
      )}`
    );
    if (vacations.data) {
      return vacations.data;
    }
  } catch (error) {
    throw new Error(`Error on get all Vacations :: ${error}`);
  }
};

export class VacationService {
  static getAllVacations = getAllVacations;
  static createVacation = createVacation;
}
