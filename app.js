const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener(
        'submit', 
        this.handleSubmit.bind(this)
      )
  },

  favFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    flick.fav = !flick.fav

    if (flick.fav) {
      listItem.classList.add('fav')
    } else {
      listItem.classList.remove('fav')
    }
  },

  removeFlick(flick, ev) {
    // remove from the DOM
    const listItem = ev.target.closest('.flick')
    listItem.remove()

    // remove from the array
    const i = this.flicks.indexOf(flick)
    this.flicks.splice(i, 1)
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener(
        'click', 
        this.removeFlick.bind(this, flick)
      )

    item
      .querySelector('button.fav')
      .addEventListener(
        'click', 
        this.favFlick.bind(this, flick)
      )
    item 
      .querySelector('button.up')
      .addEventListener(
        'click',
        this.Up.bind(this, flick)

      )
    item 
      .querySelector('button.down')
      .addEventListener(
        'click',
        this.Down.bind(this, flick)
      )
    
    return item
  },
  
  Up(flick, ev){
    const i = app.flicks.indexOf(flick)
    const hold = app.flicks[i]
    app.flicks[i] = app.flicks[i - 1]
    app.flicks[i - 1] = hold
    const listItem = ev.target.closest('.flick')
    console.log(listItem)
    console.log(this.list)
    this.list.insertBefore(listItem, listItem.previousSibling)
  },

  Down(flick, ev){
    const i = app.flicks.indexOf(flick)
    const hold = app.flicks[i]
    app.flicks[i] = app.flicks[i - 1]
    app.flicks[i - 1] = hold 
    const listItem = ev.target.closest('.flick')
    console.log(listItem)
    console.log(this.list)
    this.list.insertBefore(listItem.nextSibling, listItem)
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      fav: false,
    }

    this.flicks.unshift(flick)

    const listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstElementChild)

    this.max ++
    f.reset()
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})