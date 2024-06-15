function findObjectKeyInArray(currentArray, currentObject, key) {
  return currentArray.find(obj => obj[key] === currentObject[key]);
}

function finalize(reset, timeout = 1000) {
  setTimeout(() => {
    reset()
  }, timeout)
}

function checkAvatar(shared) {
  if (shared.avatar === null) {
    return 'https://ui-avatars.com/api/?background=random&name='+shared.name.charAt(0).toUpperCase();
  } else {
    return shared.avatar
  }

}


export {findObjectKeyInArray, finalize, checkAvatar}
