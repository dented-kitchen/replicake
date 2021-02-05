
function toStringListComma(object) {
  if (object.length === 1) {
    return object[0].toString();
  }

  let arr = object.map(obj => obj.toString());
  let last = arr.pop();
  return `${arr.join(', ')} and ${last}`;
}

export { toStringListComma };
