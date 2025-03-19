const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]


const postGenerator = ((posts) => {
    return posts.map(item => {
        const { name, username, location, avatar, post, comment, likes } = item
        return `
        <div class="post-header">
        
        <div class="profile-container">
        <img src="${avatar}" alt="avatar" class="avatar" id="avatar">
        
        <div class="text-container">
        <h1 class="username" id="username">${name}</h1>
        <h2 class="location" id="location">${location}</h2>
        </div>
                </div>
                </div>

                <div class="upload-container">
                <img src="${post}" alt="Users upload picture" class="first-post-img" id="imgPost">
                </div>
                
                <div class="icon-container">
                <img src="images/icon-heart.png" alt="" class="icon-1" id="icon1">
                <img src="images/icon-comment.png" alt="" class="icon-2">
                <img src="images/icon-dm.png" alt="" class="icon-3">
                </div>
                
                <div class="user-container">
                <p class="likes" id="likes">${likes}</p>
                <p class="commentUser" id="commentUser">${username}
                <span class="comment" id="comment">${comment}
                    </span>
                    </p>
                    <p>Read more comments...</p>
                    </div>
                    `
    }).join('')
})

const firstPost = document.getElementById('container');
const heartIcon = document.getElementById('icon1')

setTimeout(() => {
    document.querySelectorAll('.icon-1').forEach((icon, index) => {
        let liked = false;
            
        icon.style.cursor = "pointer"
        icon.addEventListener('click', () => {
            if (!liked) {
                posts[index].likes += 1;

                // Update the DOM with the new like count
                document.querySelectorAll('.likes')[index].textContent = posts[index].likes;
                liked = true;
                icon.style.opacity = "0.5"
                icon.style.cursor = "pointer"
            }

        });
    });
}, 0);

firstPost.innerHTML = postGenerator(posts)
