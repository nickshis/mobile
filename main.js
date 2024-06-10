let yes21 = document.querySelector('.yes')
let nea = document.querySelector('.neg')
let body = document.body
const swiperEl = document.querySelector('swiper-container')
let swiper_cont = document.querySelector('.mySwiper10')


yes21.onclick = () => {
    nea.style.opacity = '0'
    setTimeout(() => {
        body.style.overflow = 'visible'
        nea.style.display = "none"
    }, 500)
}

fetch('http://localhost:7000/pubs')
  .then(res => res.json())
  .then(res => {
    reload(res, swiperEl)
  })

function reload(arr, place){
  for(let item of arr){
    let container = document.createElement('swiper-slide')
    let img_div = document.createElement('div')
    let img = document.createElement('img')
    let info = document.createElement('div')
    let title = document.createElement('h1')
    let price = document.createElement('h5')
    let percent = document.createElement('h5')
    let descr = document.createElement('h5')

    img_div.classList.add('img_div')

    img.src = '/public/' + item.img
    // img.style.width = item.imgWidth

    container.style.backgroundColor = item.color

    price.innerHTML = "Содержание алкоголя: " + item.alcohol
    percent.innerHTML = "Крепость: " + item.strong
    title.innerHTML = item.title
    descr.innerHTML = item.description
    
    img_div.append(img)
    container.append(img_div, info)
    info.append(title, price, percent, descr)
    place.append(container)
   }
}

fetch('http://localhost:7000/news')
  .then(res => res.json())
  .then(res => {
    reload2(res, swiper_cont)
  })

function reload2(arr, place){
  for(let item of arr){
    let container = document.createElement('swiper-slide')
    let title = document.createElement('div')
    let subTitle = document.createElement('div')
    let descr = document.createElement('div')
    let p = document.createElement('p')

    title.classList.add('title')
    subTitle.classList.add('subtitle')
    descr.classList.add('text')

    title.innerHTML = item.title
    subTitle.innerHTML = item.subtitle
    p.innerHTML = item.descr

    descr.append(p)
    container.append(title, subTitle, descr)
    place.append(container)
  }
}


Object.assign(swiperEl, {
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
});
swiperEl.initialize()