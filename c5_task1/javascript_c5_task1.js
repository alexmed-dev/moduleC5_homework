// Модуль C5. AJAX. C5.2. JSON vs XML

// Задание 1
// Вам дана заготовка и результат, который вы должны получить. 
// Ваша задача — написать код, который будет преобразовывать XML в JS-объект
//  и выводить его в консоль.

// XML:
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentNodes = listNode.querySelectorAll("student");


const resultObject = {
  list: [],
};

studentNodes.forEach(element => {
  let name = element.querySelector("name");
  let first = name.querySelector("first");
  let second = name.querySelector("second");
  let age = element.querySelector("age");
  let prof = element.querySelector("prof");
  let langNameAttr = name.getAttribute("lang");
  let tmpObj = {
    name: first.textContent+' '+second.textContent,
    age: Number(age.textContent),
    prof: prof.textContent,
    lang: langNameAttr,
  }

  resultObject.list.push(tmpObj);
});

console.log("resultObject", resultObject);
