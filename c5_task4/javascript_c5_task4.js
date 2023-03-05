// Модуль C5. AJAX. C5.6. Работа с HTTP (fetch, async/await)

// Задание 4
// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку. 
// В input можно ввести любое число. При клике на кнопку происходит следующее:

// * Если оба числа не попадают в диапазон от 100 до 300 или введено не число.
//   — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// * Если числа попадают в диапазон от 100 до 300
//   — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, 
//   где первое число — ширина картинки, второе — высота.

// После получения данных вывести ниже картинку на экран.


// Урл для запроса.
// Базовый url, к которому будем добавлять путь
const url = "https://picsum.photos";
// воспользуемся интерфейсом (объектом) URL для правильного и удобного формирования URL-адреса
// const url = new URL('https://picsum.photos/v2/list');



// Функция, которая возвращает fetch
// url - урл, по которому будет осуществляться запрос
const useRequest = (url) => {
  return fetch(url)
    .then((response) => {
      console.log('response', response);
      // return response.json();
      return response;
    })
    .then((json) => { return json; })
    .catch(() => { console.log('error') });
}


// Ищем поле ввода - ширина
const inpNodeW = document.querySelector('#input-img-w');
// Ищем поле ввода - высота
const inpNodeH = document.querySelector('#input-img-h');

// Ищем ноду для вставки сообщения о числе вне диапозона
const msgNode = document.querySelector('.bad-value');

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

// Проверяем число и возвращаем boolen
function validateInput(){
  // не делаю проверку, что введенное значение число, т.к. <input type="number">
  // если понадобится, можно добавить проверку, что в поле введено целое числоinpNodePage: Number.isInteger(Number(inpNodeW.value))
  if ((inpNodeW.value>300) || (inpNodeW.value<100) || (inpNodeH.value>300) || (inpNodeH.value<100)){
    // выводим сообщение
    msgNode.innerHTML = '<span class="msg-text">одно из чисел вне диапазона от 100 до 300</span>';
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

// При изменении значения в полях ввода - убираем сообщение о числе вне диапозона 
function clearMsg() {
  msgNode.innerHTML = "";
  resultNode.innerHTML = "Здесь будет результат запроса";
}

// Вешаем обработчик на поля ввода
inpNodeW.addEventListener('input', clearMsg);
inpNodeH.addEventListener('input', clearMsg);

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  const cardBlock = `
      <div class="card">
        <img
          src="${apiData.url}"
          class="card-image"
          width="${inpNodeW.value}"
          height="${inpNodeH.value}"
        />
      </div>
    `;
  resultNode.innerHTML = cardBlock;
}

// Функция создает объект URL с параметрами (относительный путь(path), базовый url)
function getURLWithPath(){
  return new URL(inpNodeW.value+'/'+inpNodeH.value, url);
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', async () => {
  if (validateInput()){
    const requestResult = await useRequest(getURLWithPath());
    // console.log(requestResult);
    displayResult(requestResult);
  }
});