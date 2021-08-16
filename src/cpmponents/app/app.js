import createForm from "../form/form";
import Tag from "../tag/tag";
import createField from "../field/field";
import CreateElement from "../def/CreateElement";

createForm();
createField();

const submit_btn = document.querySelector('form');
let currentTags = [];
let item = {}
let maxId = 100;
const t = JSON.parse(localStorage.getItem('currentTags'));
const delete_btns = document.querySelector('.field');

if(!t){
  localStorage.removeItem('currentTags');
}else if(t.length == 0){
  localStorage.removeItem('currentTags');
}
else{
  render(currentTags);
}

function render(arr) {
  if (localStorage.getItem('currentTags')) {
    arr = JSON.parse(localStorage.getItem('currentTags'));
     for (let i = 0; i < arr.length; i++) {
      const tag = new Tag();
      tag.createEl(arr[i].value, arr[i].key);
    }
    maxId_();
  }
}

function isEmpty(){
  const arr = JSON.parse(localStorage.getItem('currentTags'));
  if(!arr){      
    localStorage.removeItem('currentTags');
  }
}

function maxId_(){
  const current_arr = JSON.parse(localStorage.getItem('currentTags'));
  const last_value = current_arr[current_arr.length-1].key + 1;
  maxId = last_value;
}

submit_btn.addEventListener('submit', (e) => {
  e.preventDefault();
  let newTag = e.target.firstElementChild.value;

  if (!newTag) {
    return;
  }

  if (localStorage.getItem('currentTags') == null) {
    item = {
      key: maxId++,
      value: newTag
    };
    currentTags.push(item);
    localStorage.setItem('currentTags', JSON.stringify(currentTags));

  } else {
    currentTags = JSON.parse(localStorage.getItem('currentTags'));
    item = {
      key: maxId++,
      value: newTag
    };
    currentTags.push(item);
  }

  localStorage.setItem('currentTags', JSON.stringify(currentTags));
  console.log(currentTags);

  e.target.firstElementChild.value = '';
  const tag = new Tag();

  tag.createEl(newTag, item.key);
});

delete_btns.addEventListener('click', e => {
  if (e.target.tagName === 'path') {
    const element = e.target.closest('.delete').closest('.item_tag');
    currentTags = JSON.parse(localStorage.getItem('currentTags'));
   const index = currentTags.findIndex((el, index) => (el.key == element.dataset.key) ? index+1 : '');
   currentTags.splice(index, 1);
   localStorage.setItem('currentTags', JSON.stringify(currentTags));
   element.remove();

   isEmpty();
  }
});
