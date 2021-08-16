import CreateElement from "../def/CreateElement";
import './style.scss';
const createField= () => {
  const field = new CreateElement();
 
  const propsForField = {
    tag_Name: 'div',
    className: ["field"],
  }

  field.createEl(propsForField);
}

export default createField;