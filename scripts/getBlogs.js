import { app, db } from "/scripts/firebaseConfig.js";
import { set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js"


const params = new URLSearchParams(window.location.search);
const tag = params.get('tag');
const title = params.get('title');

const $ = (id) => {
    return document.getElementById(id);
}

let divContent = $('blogContentDiv')
// fetching records to display on the home page from the firebase
let featured = {};
let trending = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const returnImagePath = (tag) => {
    const randomint = getRandomInt(1,4)
    if (tag == 'ai') {
        return `/images/ai0${randomint}.jpg`
    }
    else if (tag == 'webDev') {
        return `/images/webDev0${randomint}.jpg`
    }
    else if (tag == 'blockchain') {
        return `/images/blockchain0${randomint}.jpg`
    }
    else {
        return `/images/data0${randomint}.jpg`
    }
}

const setFeaturedblogData = () => {
    $('featured-date').querySelector('span').innerHTML = featured.timestamp;
    let heading = $('featured-title').querySelector('h1');

    heading.innerHTML = featured.blogTitle;
    const tag = featured.blogTag;

    let image = document.querySelector('#featured-image');
    image.setAttribute('data-feature-tag', tag)

    let featuredTag = $('featuredTag')

    const dynamicStylingChange = (tagName, displayName) => {
        const color = `var(--accent-color-${tagName})`
        heading.style.backgroundColor = color
        featuredTag.style.backgroundColor = color
        featuredTag.innerHTML = displayName
        image.querySelector('img').setAttribute('src', `${returnImagePath(tagName)}`)
    }

    if (tag == 'ai') {
        dynamicStylingChange(tag, "AI")
    }
    else if (tag == 'webDev') {
        dynamicStylingChange(tag, "Web dev")
    }
    else if (tag == 'blockchain') {
        dynamicStylingChange(tag, "Blockchain")
    }
    else {
        dynamicStylingChange(tag, "Data science")
    }
    divContent.innerHTML = featured.blogContent
}

const setTrendingData = () => {
    let addedHtml = '';

    for (const item of trending) {

        const returnDisplayValue = (tag) => {
            if (tag == 'ai') {
                return "AI"
            }
            else if (tag == 'webDev') {
                return "Webdev"
            }
            else if (tag == 'blockchain') {
                return "Blockchain"
            }
            else {
                return "DataScience"
            }
        }

        addedHtml = addedHtml +
            `
            <div class="blog" data-blog=${returnDisplayValue(item.blogTag)}>
                <div class="blogpostPicture">
                  <img src=${returnImagePath(item.blogTag)} alt="">
                </div>
                <div class="blogTag" data-tag=${returnDisplayValue(item.blogTag)}>
                  ${returnDisplayValue(item.blogTag)}
                </div>
                <h4>${item.blogTitle}</h4>
                <p>${item.blogContent.substring(0, 200) + "..."}</p>
                <a href="/pages/getBlog.html?tag=${item.blogTag}&title=${item.blogTitle}">Continue Reading</a>
            </div>
            ` + "\n"
    }
    addedHtml +=
        `
    <div id="end">
          <p>You've reached the end of the list.</p>
    </div>
    `
    $('blogs').innerHTML = addedHtml;
}

const findData = async () => {
    const dbref = ref(db);
    const snapshot = await get(child(dbref, "Techsquared/"))
    const obj = snapshot.val();
    for (let key in obj) {
        if (obj[key].blogTitle == title) {
            featured = obj[key]
        }
        if (obj[key].blogTag == tag) {
            trending.push(obj[key])
        }
    }
    setFeaturedblogData();
    setTrendingData();
}

findData();