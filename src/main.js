// the endpoint to get the data from
const URL = "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"

/**
 * returns the posts fetched from URL with an easy to use format
 */
async function fetchRelevantData() {
    const promise = await fetch(URL)

    const posts = await promise.json()

    const filteredPosts = posts.map(post => ({ 
        date: new Date(post.date), 
        link: post.link, 
        title: post.title.rendered,
        preview: post.excerpt.rendered,
        image: post.featured_media,
        author: {
            name: post._embedded.author[0].name,
            link: post._embedded.author[0].link
        }
    }))

    return filteredPosts
}

/**
 * 
 * Accepts the container of a card and a post as input and fills the card with the posts content
 */
function renderCard(container, post) {
    const { date, link, title, preview, image, author } = post

    /* getting individual elements */
    const imgEl = container.querySelector("img")
    const publisherEl = container.querySelector('#publisher')
    const dateEl = container.querySelector('#date')
    // const previewEl = container.querySelector('#preview')
    const titleEl = container.querySelector('#title')

    /* filling each element */
    dateEl.innerText = date.yyyymmdd()

    publisherEl.href = author.link
    publisherEl.innerText = author.name

    // previewEl.innerHTML = preview

    titleEl.href = link
    titleEl.innerText = title

    imgEl.src = image
}

/**
 * 
 * running through cards and filling them with content 
 */
function renderAllCards(posts) {
    const cards = document.querySelectorAll('.col-4')

    cards.forEach((card, index) => renderCard(card, posts[index]))
}

// putting it all together
fetchRelevantData()
    .then(posts => {
        
        renderAllCards(posts)
        
        const loader = document.getElementById("loader")
        const content = document.getElementById("content")

        loader.classList.add('u-hide')
        content.classList.remove('u-hide')
    })
    .catch(err => console.log(err)) 
