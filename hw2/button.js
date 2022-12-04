//Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.

const btn = document.querySelector('.j-btn');
const btnIcon = document.querySelector('.btn__icon');

btn.addEventListener('click', () => {
  window.alert(`Ширина: ${window.screen.width}px, Высота: ${window.screen.height}px`)
})
