//Get DOM Elements
const filter = document.getElementById('filter');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

//Gloal Variable fpr number of post to fetch per api call and current page
let limit = 5;
let page = 1;

//Function to asynchronously fetch post from API
async function fetchPosts() {
    //Fetch post from the JSON Placeholder API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
};

//Function to render the posts fetched from API
async function renderPosts() {
    //Fetch the data from the API that we want to render
    const posts = await fetchPosts();
    //For each object in the post array, render the post
    posts.forEach(post => {
        // Create a new div for the post
        const postDiv = document.createElement('div');
        //Assign the post class to this div
        postDiv.classList.add('post');
        //Create the inner content for the main post div
        postDiv.innerHTML = `
            <div class="post-id">${post.id}</div>
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `; 
        //Render the postDiv in the DOM
        newsFeed.appendChild(postDiv);
    });                 
};

//Function to render the CSS Loader Animation
function showLoader() {
    //Display the CSS loader animation
    loader.classList.add('show');
    //Uncrement the page global variable be 1
    page++;
    renderPosts();
    //Remove the loader
    loader.classList.remove('show');
};

//Function to filter posts
function filterPosts(e) {
    const filterKeyword = e.target.value.toLowerCase();
    //Get all post data from DOM
    const posts = document.querySelectorAll('.post');
    //Process all posts in theposts node list
    posts.forEach( post => {
        //Get the title text
        const title = post.querySelector('.post-title').innerText;
        //Get the body Text
        const body = post.querySelector('.post-body').innerText;
        //Check if filterKeyword  exist in title or body
        if ( title.indexof(filterKeyword) >= 0 || body.indexof(filterKeyword) >= 0 ) {
            //Display the post if the filterKeyword exists in title or  body of post
            post.style.display = 'flex';
        }else {
    //Hide the post if the filterKeyword does not exist in the title or body of post
    post.style.display = 'none';
        }
    })
};

//Event Listener
//Listen for scroll in the browser window
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if ( scrollTop + clientHeight >= scrollHeight - 1 ) {
        //Display the loader animation
        showLoader();
    };
});

//Listen for input in the event listener
filter.addEventListener('input', filterPosts)

renderPosts();