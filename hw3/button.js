// Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com. Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат
// Добавить в чат механизм отправки гео-локации
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.
const wsUrl = "wss://echo-ws-service.herokuapp.com";

const btnSend = document.querySelector('.btnSend');
const btnGeo = document.querySelector('.btnGeo');
const chatBox = document.querySelector('.messageBox');
const inputMsg = document.getElementById('input');

let websocet;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  chatBox.appendChild(pre);
}

websocket = new WebSocket(wsUrl);
websocket.onopen = function (evt) {

};
websocket.onmessage = function (evt) {
  writeToScreen(
    '<span style="display: flex; color: blue;">RESPONSE: ' + evt.data + '</span>'
  );
};
websocket.onerror = function (evt) {
  writeToScreen(
    '<span style="color: red;">ERROR:</span> ' + evt.data
  );
};

btnSend.addEventListener('click', () => {
  const message = inputMsg.value;
  writeToScreen('<span style="display: flex; justify-content: end; color: red;">SEND: ' + message + '</span>');
  websocket.send(message);
})

const error = () => {
  let textErr0r = 'Невозможно получить ваше местоположение';
  writeToScreen(textErr0r);
};

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
};

btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});