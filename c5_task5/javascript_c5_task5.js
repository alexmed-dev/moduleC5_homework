// Модуль C5. AJAX. C5.7. Финальное задание

// Задание 5
// Написать код приложения, интерфейс которого состоит из двух input и кнопки. 
// В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// * Если число в первом input не попадает в диапазон от 1 до 10 или не является числом
//   — выводить ниже текст «Номер страницы вне диапазона от 1 до 10».
// * Если число во втором input не попадает в диапазон от 1 до 10 или не является числом
//   — выводить ниже текст «Лимит вне диапазона от 1 до 10».
// * Если и первый, и второй input не в диапазонах или не являются числами
//   — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10».
// * Если числа попадают в диапазон от 1 до 10
//   — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10,
//   где GET-параметр page — это число из первого input,
//   а GET-параметр limit — это введённое число второго input. 

// После получения данных вывести ниже картинку на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса
//  (использовать localStorage).


// Урл для запроса - воспользуемся интерфейсом (объектом) URL для правильного и удобного формирования URL-адреса
// Базовый url, к которому будем добавлять параметр
const url = new URL('https://picsum.photos/v2/list');


// Ищем поле ввода - Номер страницы
const inpNodePage = document.querySelector('#input-page');
// Ищем поле ввода - Лимит страниц
const inpNodeLimit = document.querySelector('#input-limit');

// Ищем ноду для вставки сообщения о числе вне диапозона
const msgNode = document.querySelector('.bad-value');

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');


// Проверяем число и возвращаем boolen
function validateInput(){
  // не делаю проверку, что введенное значение число, т.к. <input type="number">
  // если понадобится, можно добавить проверку, что в поле введено целое число, например: Number.isInteger(Number(inpNodePage.value))
  if ((inpNodePage.value>10) || (inpNodePage.value<1)){
    if ((inpNodeLimit.value>10) || (inpNodeLimit.value<1)){
      // выводим сообщение - оба условия неверны
      msgNode.innerHTML = '<span class="msg-text">Номер страницы и лимит вне диапазона от 1 до 10</span>';
      // очищаем ноду с результатом
      resultNode.innerHTML = "";
      return false;
    }
    else{
      // выводим сообщение - страницы вне диапазона
      msgNode.innerHTML = '<span class="msg-text">Номер страницы вне диапазона от 1 до 10</span>';
      // очищаем ноду с результатом
      resultNode.innerHTML = "";
      return false;
    }
  }
  else{
    if ((inpNodeLimit.value>10) || (inpNodeLimit.value<1)){
    // выводим сообщение - Лимит вне диапазона
    msgNode.innerHTML = '<span class="msg-text">Лимит вне диапазона от 1 до 10</span>';
    // очищаем ноду с результатом
    resultNode.innerHTML = "";
    return false;
    }
  }   
  // очищаем ноду с сообщением, что число вне диапозона
  msgNode.innerHTML = "";
  return true;
}

// При изменении значения в полях ввода - убираем сообщение о числе вне диапозона 
function clearMsg() {
  msgNode.innerHTML = "";
  resultNode.innerHTML = "Здесь будет результат запроса";
}

// Вешаем обработчик на поля ввода
inpNodePage.addEventListener('input', clearMsg);
inpNodeLimit.addEventListener('input', clearMsg);

// Функция добавляет/меняет параметры "page" и "limit" в url с помощью метода объекта URL
function getURLWithParameter(){
  url.searchParams.set('page', inpNodePage.value);
  url.searchParams.set('limit', inpNodeLimit.value);
  return url;
}


// Функция, которая возвращает fetch
// url - урл, по которому будет осуществляться запрос
const useRequest = (url) => {
  return fetch(url)
    .then((response) => {
      console.log('response', response);
      return response.json();
    })
    .then((json) => { return json; })
    .catch(() => { console.log('error') });
}


/**
  * Функция обработки JSON объекта для вывода на экран
  */
function displayResult(jsonData) {
  let cards = '';
  jsonData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });      
  resultNode.innerHTML = cards;
}

function save_local(json){
  // Очищаем весь localStorage
  localStorage.clear();  
  // Запишем данные в localStorage в виде строки JSON
  localStorage.setItem('myJSON', JSON.stringify(json));
  // Запишем в localStorage Номер страницы и Лимит
  localStorage.setItem('myPage', inpNodePage.value);
  localStorage.setItem('myLimit', inpNodeLimit.value);
}

function load_local(){
  // берем данные из localStorage
  const myJSON = localStorage.getItem('myJSON');
  if (myJSON) {
    // передаем объект JSON для отрисовки
    displayResult(JSON.parse(myJSON));
    // проставляем Номер страницы и Лимит
    inpNodePage.value = localStorage.getItem('myPage');
    inpNodeLimit.value = localStorage.getItem('myLimit');
  }  
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', async () => {
  if (validateInput()){
    const requestResult = await useRequest(getURLWithParameter());
    displayResult(requestResult);
    save_local(requestResult);
  }
});

// Вешаем обработчик на загрузку HTML-страницы
window.addEventListener('load', ()=>{load_local()})
