// Import the functions you need from the SDKs you need
import { app, db } from "./firebaseConfig.js";
import { set, get, update, remove, ref, child }
    from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js"


// Application logic goes here
const $ = (id) => {
    return document.getElementById(id);
}

const submitButton = $('publish')
const previewButton = $('preview')

let title;
let author;
let tags;
let tag;
let content;

//preview elements
let previewHeading;
let previewAuthor;
let previewTag;
let previewContent;
let previewDate;

let preview = $('previewBlogpost')
preview.style.display = 'none';

const retrievecheckedRadio = () => {
    for (const element of tags) {
        if (element.checked) {
            return element
        }
    }
}

const updateInputs = () => {
    title = $('title');
    author = $('author');
    tags = document.getElementsByName('tag');
    tag = retrievecheckedRadio();
    content = $('content');
}

const updatePreview = (blogPost) => {
    previewHeading = $('previewHeading');
    previewAuthor = $('previewAuthor');
    previewDate = $('previewDate');
    previewContent = $('previewContent');

    previewHeading.innerHTML = blogPost.blogTitle;
    previewAuthor.innerHTML = blogPost.blogAuthor;
    const formattedDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    previewDate.innerHTML = formattedDate
    previewContent.textContent = blogPost.blogContent;
    previewTag = blogPost.blogTag;

    $('previewHeader').style.backgroundColor = `var(--accent-color-${previewTag})`;
    $('blogPreview').style.borderColor = `var(--accent-color-${previewTag})`;
}

const displayPreview = () => {
    updateInputs();
    let blogPost = {
        blogTitle: title.value,
        blogAuthor: author.value,
        blogTag: tag.value,
        blogContent: content.value,
    };
    updatePreview(blogPost);
    preview.style.display = 'block';
}

previewButton.addEventListener('click', displayPreview);



//persistent data
const insertData = () => {
    updateInputs();
    let blogPost = {
        blogTitle: title.value,
        blogAuthor: author.value,
        blogTag: tag.value,
        blogContent: content.value,
        timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        featured: false,
        trending: false
    };
    set(ref(db, "Techsquared/" + blogPost.blogTitle),
        {...blogPost})
        .then(() => {
            alert('Data inserted successfully');
        })
        .catch(err => {
            console.error(err);
            alert('Error inserting data, check console for error');
        })
}

submitButton.addEventListener('click', insertData)






