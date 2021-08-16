import CreateElement from "../def/CreateElement";
import './style.scss';
const createForm = () => {
  const form = new CreateElement();
  const input = new CreateElement();
  const btn = new CreateElement();
  const propsForInput = {
    tag_Name: 'input',
    entry_point: '.test',
    className: ["input_test", "form-control", "me-sm-2"],
    attr: {
      key: 'type',
      value: "text",
    }
  }

  const propsForForm = {
    tag_Name: 'form',
    className: ["test", "navbar", "navbar-expand-lg", "navbar-dark", "bg-primary"],
  }

  const propsForButton = {
    tag_Name: 'button',
    entry_point: '.test',
    className: ["submit"],
    attr: {
      key: 'type',
      value: "submit",
    },
    content: "Add"
  }

  form.createEl(propsForForm);
  input.createEl(propsForInput);
  btn.createEl(propsForButton);
}

export default createForm;