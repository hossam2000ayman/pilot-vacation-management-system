import axios from "axios";

const createTask = async () => {};

const getAllTasks = async () => {
  try {
    let tasks =
      await axios.get(`http://psuite:81/home/system/app/entityRestService/api/OpenTextInboxTaskManagement/entities/InboxTask/lists/AllTasks?SAMLart=${localStorage.getItem(
        "SamlArt"
      )}
`);
    if (tasks.data) {
      console.log(tasks.data);
      return tasks.data;
    }
  } catch (error) {
    throw new Error(`Error on get all tasks :: ${error}`);
  }
};

const getPersonalTasks = async () => {
  try {
    let tasks =
      await axios.get(`http://psuite:81/home/system/app/entityRestService/api/OpenTextInboxTaskManagement/entities/InboxTask/lists/PersonalTasks
?SAMLart=${localStorage.getItem("SamlArt")}
`);
    if (tasks.data) {
      console.log(tasks.data);
      return tasks.data;
    }
  } catch (error) {
    throw new Error(`Error on get all tasks :: ${error}`);
  }
};

const getTeamTasks = async () => {
  try {
    let tasks =
      await axios.get(`http://psuite:81/home/system/app/entityRestService/api/OpenTextInboxTaskManagement/entities/InboxTask/lists/TeamsTasks
?SAMLart=${localStorage.getItem("SamlArt")}
`);
    if (tasks.data) {
      console.log(tasks.data);
      return tasks.data;
    }
  } catch (error) {
    throw new Error(`Error on get all tasks :: ${error}`);
  }
};

const getRolesTasks = async () => {
  try {
    let tasks =
      await axios.get(`http://psuite:81/home/system/app/entityRestService/api/OpenTextInboxTaskManagement/entities/InboxTask/lists/RolesTasks
?SAMLart=${localStorage.getItem("SamlArt")}
`);
    if (tasks.data) {
      console.log(tasks.data);
      return tasks.data;
    }
  } catch (error) {
    throw new Error(`Error on get all tasks :: ${error}`);
  }
};

export class TaskService {
  static getAllTasks = getAllTasks;
  static createTask = createTask;
  static getPersonalTasks = getPersonalTasks;
  static getTeamTasks = getTeamTasks;
  static getRolesTasks = getRolesTasks;
}
