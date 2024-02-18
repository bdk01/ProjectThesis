
import { notification } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
export const trimSnackBarText = (text = "") => {
  const maxLength = 52;

  return text.length > maxLength ? `${text.substr(0, maxLength - 5)}...` : text;
};

export const nameTructed = (name, tructedLength) => {
  if (name?.length > tructedLength) {
    if (tructedLength === 15) {
      return `${name.substr(0, 12)}...`;
    } else {
      return `${name.substr(0, tructedLength)}...`;
    }
  } else {
    return name;
  }
};

export const json_verify = (s) => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item._id === id ? post : item)
    )
    return newData;
}


export const DeleteData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}
export  const moveObjectToFirst = (array, objectId) => {
  const newArray = [...array];
  const indexToMove = newArray.findIndex(obj => obj.conversation === objectId);

  if (indexToMove !== -1) {
    const objectToMove = newArray.splice(indexToMove, 1)[0];
    newArray.unshift(objectToMove);
  }

  return newArray;
};

export const showNotification = (type ,description) => {

  notification[type]({
    message: 'Notification',
    description
    
  });

};
export const scrollToTop = () => {
  window.scrollTo(0, 0);
};
/* export const formatISODateToMomment = (date?: string): Moment | undefined => {
  return date ? moment(date) : moment(date);
};
export const formatMomentToString = (date?: Moment): string | undefined => {
  return date ? moment(date).format(EFormat.DATE) : undefined;
}; */
export const formatISODateToMomment = (date) => {
  return date ? moment(date) : moment(date);
};
/* export const formatMomentToString = (date) => {
  return date ? moment(date).format(date) : undefined;
}; */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return ()=> {
      clearTimeout(handleDebounce);
    };
  }, [value, delay]);

  return debouncedValue
}