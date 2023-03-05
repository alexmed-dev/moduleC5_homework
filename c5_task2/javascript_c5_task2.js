// Модуль C5. AJAX. C5.2. JSON vs XML

// Задание 2
// Вам дана заготовка и результат, который вы должны получить. 
// Ваша задача — написать код, который будет преобразовывать JSON в JS-объект 
// и выводить его в консоль.

// JSON
const jsonString = `
{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }
  ]
 }
`;

const data = JSON.parse(jsonString);

const resultJsonObject = {
  list: [],
};

data.list.forEach(element => {
  let tmpObj = {
    name: element.name,
    age: Number(element.age),
    prof: element.prof
  }

  resultJsonObject.list.push(tmpObj);
});

console.log("resultJsonObject", resultJsonObject);
