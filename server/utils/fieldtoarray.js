module.exports.fieldsforvalidator = (request) => {
  const fields = [];
  for (let i = 0; i < Object.keys(request).length; i++) {
    let object = {};
    if (Object.values(request)[i]) {
      object[Object.keys(request)[i]] = Object.values(request)[i];
      fields.push(object);
    }
  }
  return fields;
};
