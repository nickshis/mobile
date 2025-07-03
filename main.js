let local_id = localStorage.getItem("id")

let yes21 = document.querySelector('.yes')
let nea = document.querySelector('.neg')
let body = document.body
const swiperEl = document.querySelector('swiper-container')
let swiper_cont = document.querySelector('.mySwiper10')
let catalog = document.querySelector('.catalog')
let parallax_bg = document.querySelector('.parallax-bg')

let id = Math.random()

fetch("http://localhost:7000/users")
  .then(res => res.json())
  .then(res => {
    for(let item of res){
      if(+item.id === +local_id){
        body.style.overflow = 'visible'
        nea.style.display = "none"
      } else {
        body.style.overflow = 'hidden'
        nea.style.display = "flex"
      }
    }
  })


yes21.onclick = () => {
    nea.style.opacity = '0'
    fetch("http://localhost:7000/users" ,{
          method: "POST",
          body: JSON.stringify({ id:id }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(ress => ress.json())
        .then(ress => {
          localStorage.setItem('id', id)
        })
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
    let img = document.createElement('img')
    let descr = document.createElement('h3')
    let title = document.createElement('h1')

    img.src = '/public/' + item.img

    img.onmouseenter = () => {
      if(item.img2){
        img.style.opacity = 0
        setTimeout(() => {
          img.src = '/public/' + item.img2
          img.style.opacity = 1
        }, 300)
      }
    }

    img.onmouseout = () => {
      if(item.img2){
        img.style.opacity = 0
          setTimeout(() => {
            img.style.opacity = 1
            img.src = '/public/' + item.img
          }, 300)  
      }
    }
    
    if(item.alcohol){
      let info = document.createElement('h2')
      info.innerHTML = `Содержание алкоголя: ${item.alcohol} <br> Крепость: ${item.strong}`
      title.innerHTML = item.title
      descr.innerHTML = item.description
      container.append(img, info, descr, title)
    } else {
      title.innerHTML = item.title
      descr.innerHTML = item.description
      container.append(img, descr, title)
    }
    
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

    parallax_bg.style.backgroundImage = `url(${item.img})`

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