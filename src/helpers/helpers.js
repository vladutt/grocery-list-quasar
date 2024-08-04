function findObjectKeyInArray(currentArray, currentObject, key) {
  return currentArray.find(obj => obj[key] === currentObject[key]);
}

function finalize(reset, timeout = 1000) {
  setTimeout(() => {
    reset()
  }, timeout)
}

function checkAvatar(shared) {
  if (shared.avatarPath === null) {
    return 'https://ui-avatars.com/api/?background=random&name='+shared.name.charAt(0).toUpperCase();
  } else {
    return shared.avatarPath
  }

}

function sortErrorsFromRequest(errors, request) {

  for (let key in errors) {
    if (request.hasOwnProperty(key)) {
        errors[key] = request[key];
    } else {
      errors[key] = null;
    }
  }

}

function setPropsToNull(obj) {
  for (let key in obj) {
    obj[key] = null;
  }
}

function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



export {findObjectKeyInArray, finalize, checkAvatar, sortErrorsFromRequest, setPropsToNull, getRandomString}
