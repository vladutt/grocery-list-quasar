function findObjectKeyInArray(currentArray, currentObject, key) {
  return currentArray.find(obj => obj[key] === currentObject[key]);
}

function finalize(reset, timeout = 1000) {
  setTimeout(() => {
    reset()
  }, timeout)
}


export {findObjectKeyInArray, finalize}
