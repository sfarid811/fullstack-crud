import moment from "moment";

export const formatTime = time => {
  if (!time) {
    return;
  }
  if (moment().isSame(time, "day")) {
    return moment(time).format("H[h]mm");
  }
  return moment(time).format("DD/MM H[h]mm");
};


export const getFirstUpperCaseTodo = (name) => name.charAt(0).toUpperCase() + name.slice(1) ;
