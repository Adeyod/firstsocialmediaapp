const mainDiv2 = document.getElementById('main_div2')
const toggleBtn = document.getElementById('toggle_btn')


toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('is-active')
  mainDiv2.classList.toggle("active")
})