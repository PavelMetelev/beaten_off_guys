// HERO
fetch("content/hero.json")
  .then(r => r.json())
  .then(d => {
    const t = document.querySelector(".hero-title span")
    t.textContent = d.title
    t.dataset.text = d.title
    document.getElementById("hero-desc").textContent = d.description
  })

// NEWS
fetch("content/news.json")
  .then(r => r.json())
  .then(d => {
    const list = document.getElementById("newsList")
    list.innerHTML = ""
    d.items.filter(i => i.active).forEach(i => {
      const a = document.createElement("article")
      a.innerHTML = `<h3>${i.title}</h3><p>${i.text.join("<br>")}</p>`
      list.appendChild(a)
    })
  })
