// Модуль C5. AJAX. С5.3. XHR

// Задание 3
// В input можно ввести любое число. При клике на кнопку должно происходить следующее:
// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.


// Урл для запроса.
// Базовый url, к которому будем добавлять параметр
// воспользуемся интерфейсом (объектом) URL для правильного и удобного формирования URL-адреса
const url = new URL('https://picsum.photos/v2/list');


/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
function useRequest(req_url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', req_url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  // }
};

// Ищем поле ввода
const inpNode = document.querySelector('#input-number');
// Ищем ноду для вставки сообщения о числе вне диапозона
const msgNode = document.querySelector('.bad-value');

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

// Проверяем число и возвращаем boolen
function validateInput(){
  // не делаю проверку, что введенное значение число, т.к. <input type="number">
  // если понадобится, можно добавить проверку, что в поле введено целое число: Number.isInteger(Number(inpNode.value))
  if ((inpNode.value>10) || (inpNode.value<1)){
    // выводим сообщение
    msgNode.innerHTML = '<span class="msg-text">число вне диапазона от 1 до 10</span>';
    // очищаем ноду с результатом
    resultNode.innerHTML = "";
    return false;
  }
  else{
    // очищаем ноду с сообщением, что число вне диапозона
    msgNode.innerHTML = "";
    return true;
  }   
}

// При изменении значения в поле ввода - убираем сообщение о числе вне диапозона 
inpNode.oninput = function() {
  msgNode.innerHTML = "";
  resultNode.innerHTML = "Здесь будет результат запроса";
}

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';

  apiData.forEach(item => {
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

// Функция добавляет/меняет параметр "limit" в url с помощью метода объекта URL
function getURLWithParameter(){
  url.searchParams.set('limit', inpNode.value);
  return url;
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
  // проверяем число, если ok: useRequest(url с параметром - результат функции, cb)
  if (validateInput()){
    useRequest(getURLWithParameter(), displayResult);
  }  
})
