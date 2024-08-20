import axios from "axios";

const claimTaskByTaskInstanceAndTarget = async () => {
  try {
    let task = await axios.post(
      `http://psuite:81/home/system/app/entityRestService/api/OpenTextInboxTaskManagement/entities/InboxTask/items/${localStorage.getItem(
        "taskInstanceId"
      )}.${localStorage.getItem(
        "target"
      )}/tasks/actions/Claim?SAMLart=${localStorage.getItem("SamlArt")}
`,
      {},
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          CSRFToken: "system",
          SAMLart: localStorage.getItem("SamlArt"),
        },
      }
    );
    if (task.data) {
      console.log(task.data);
      return task.data;
    }
  } catch (error) {
    throw new Error(
      `Error on claim task by taskInstance and target :: ${error}`
    );
  }
};

const completeTaskByTaskInstanceAndTarget = async () => {
  console.log("taskInstanceId : " + localStorage.getItem("taskInstanceId"));
  console.log("target : " + localStorage.getItem("target"));
  try {
    let task = await axios.post(
      `http://psuite:81/home/system/app/entityRestService/api/OpenTextInboxTaskManagement/entities/InboxTask/items/${localStorage.getItem(
        "taskInstanceId"
      )}.${localStorage.getItem(
        "target"
      )}/tasks/actions/Complete?SAMLart=${localStorage.getItem("SamlArt")}
`,
      {},
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          CSRFToken: "system",
          SAMLart: localStorage.getItem("SamlArt"),
        },
      }
    );
    if (task.data) {
      console.log(task.data);
      return task.data;
    }
  } catch (error) {
    throw new Error(
      `Error on claim task by taskInstance and target :: ${error}`
    );
  }
};

const getTaskByTaskInstanceAndTarget = async (taskInstance, target) => {
  try {
    let task =
      await axios.get(`http://psuite:81/home/system/app/entityRestService/api/OpenTextInboxTaskManagement/entities/InboxTask/items/${taskInstance}.${target}?SAMLart=${localStorage.getItem(
        "SamlArt"
      )}
`);
    if (task.data) {
      return task.data;
    }
  } catch (error) {
    throw new Error(`Error on get task by taskInstance and target :: ${error}`);
  }
};

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
  static getPersonalTasks = getPersonalTasks;
  static getTeamTasks = getTeamTasks;
  static getRolesTasks = getRolesTasks;
  static getTaskByTaskInstanceAndTarget = getTaskByTaskInstanceAndTarget;
  static claimTaskByTaskInstanceAndTarget = claimTaskByTaskInstanceAndTarget;
  static completeTaskByTaskInstanceAndTarget =
    completeTaskByTaskInstanceAndTarget;
}
