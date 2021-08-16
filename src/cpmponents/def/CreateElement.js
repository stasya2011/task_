class CreateElement {

  render(entryPoint = "#root", el) {
    document.querySelector(entryPoint).append(el)
  }

  createEl(obj) {
    const {
      tag_Name,
      entry_point = "#root",
      className = null,
      attr = null,
      content = null
    } = obj;

    const newElement = document.createElement(tag_Name);
    if (className) {
      for(let i=0; i<className.length; i++){
        newElement.classList.add(className[i]);
      }
    }

    if (attr) {
      newElement.setAttribute(attr.key, attr.value);
    }
    if (content) {
      newElement.innerText = content;
    }

    this.render(entry_point, newElement);
  }
}

export default CreateElement;