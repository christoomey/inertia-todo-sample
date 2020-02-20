const parseForm = form =>
  Array.from(form.elements)
    .filter(el => el.type !== "submit")
    .reduce((memo, element) => ({...memo, ...inputDetails(element)}), {});

const inputDetails = element => ({
  [element.name]: parsedElementValue(element)
});

const parsedElementValue = element => {
  switch (element.type) {
    case "select-multiple":
      return selectedValuesFromMultipleSelect(element);
    case "number":
      return Number(element.value);
    case "checkbox":
      return element.checked;
    default:
      return element.value;
  }
};

const selectedValuesFromMultipleSelect = element =>
  Array.from(element.options)
    .filter(opt => opt.selected)
    .map(opt => opt.value);

export {parseForm};
