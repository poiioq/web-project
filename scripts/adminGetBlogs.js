import { app, db } from "/scripts/firebaseConfig.js";
import { set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js"

const $ = (id) => {
    return document.getElementById(id);
}

// fetching records to display on the home page from the firebase
let trending = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const returnImagePath = (tag) => {
    const randomint = getRandomInt(1, 4)
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
                <div class="blogFeaturedOrTrending" style="display:${item.featured || item.trending ? 'block' : 'none'};">
                  ${
                    item.featured ? '#featured' : '#trending'
                  }
                </div>
                <div class="blogTag" data-tag=${returnDisplayValue(item.blogTag)}>
                  ${returnDisplayValue(item.blogTag)}
                </div>
                <h4>${item.blogTitle}</h4>
                <p>${item.blogContent.substring(0, 200) + "..."}</p>
                <button class="deleteBlog" type="button">Delete blog</button>
                <button class="updateBlog" type="button"><a href="/pages/admin/updateBlog.html?title=${item.blogTitle}&featuredFlag=${item.featured}" style="font-weight:inherit;font-size:0.75rem">Update blog</a></button>
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
        trending.push(obj[key])
    }
    setTrendingData();

    document.querySelectorAll(".deleteBlog").forEach((element) => {
        // console.log(element.previousElementSibling.previousElementSibling.innerHTML)
        const title = element.previousElementSibling.previousElementSibling.innerHTML;
        element.addEventListener('click', async () => {
            // console.log(title)
            remove(child(dbref, "Techsquared/" + title))
                .then(() => {
                    alert('Data deleted successfully');
                    location.reload(true);
                })
                .catch(err => {
                    console.error(err);
                    alert('Error deleting data, check console for error');
                })

        })
    })
}

findData();