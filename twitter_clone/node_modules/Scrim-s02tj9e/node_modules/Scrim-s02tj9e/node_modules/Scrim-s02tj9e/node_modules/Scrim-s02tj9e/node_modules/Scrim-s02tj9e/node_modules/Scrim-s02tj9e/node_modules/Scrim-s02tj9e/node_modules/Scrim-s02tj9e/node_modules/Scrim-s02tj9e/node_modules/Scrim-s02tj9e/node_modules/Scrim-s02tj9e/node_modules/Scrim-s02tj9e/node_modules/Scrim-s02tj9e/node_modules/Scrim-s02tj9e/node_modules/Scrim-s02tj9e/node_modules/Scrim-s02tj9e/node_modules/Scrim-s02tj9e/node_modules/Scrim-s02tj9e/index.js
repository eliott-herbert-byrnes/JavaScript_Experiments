// import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Saving to LocalStorgage
let tweetsData = []

// Load data from localStorage or fallback to intial dataset
const savedTweets = localStorage.getItem('tweetsData')

if (savedTweets) {
    tweetsData = JSON.parse(savedTweets)
} else {
    import('/data.js').then(module => {
        tweetsData = module.tweetsData
        saveToLocalStorage()
        render()
    })
}

const saveToLocalStorage = () => {
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
}


// Handle All Click Events
document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.comment){
        handleCommentClick(e.target.dataset.comment)
    }
    else if(e.target.dataset.push){
        handleAddComment(e.target.dataset.push)
    }
})

 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    saveToLocalStorage()
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    saveToLocalStorage()
    render() 
}

function handleCommentClick(commentId) {
    document.getElementById(`comments-${commentId}`).classList.toggle('hidden')
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleAddComment(pushId) {
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === pushId
    })[0]

    const commentInput = document.querySelector(`[data-comment-text="${pushId}"]`)

    console.log(commentInput.value)

    if (commentInput.value){
        targetTweetObj.replies.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: commentInput.value,
        })
        saveToLocalStorage()
        render()
    }
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            isUser: true,
            uuid: uuidv4()
        })
    saveToLocalStorage()
    render()
    tweetInput.value = ''
    }

}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        // Handles Replies Styling
        let repliesHtml = ''
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
        <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
                <div class="comment-details">
                    <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots"
                        data-reply="${tweet.uuid}"
                        ></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}"
                        data-like="${tweet.uuid}"
                        ></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetIconClass}"
                        data-retweet="${tweet.uuid}"
                        ></i>
                        ${tweet.retweets}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-reply"
                        data-comment="${tweet.uuid}"
                        ></i>
                    </span>
                    <span class="trash tweet-detail">
                        <i class="fa-solid fa-trash"
                        data-comment="${tweet.uuid}"
                        ></i>
                    </span>
            </div>   
        </div>`
            })
        }


        // Main timeline  
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-reply"
                    data-comment="${tweet.uuid}"
                    ></i>
                </span>
                <span class="trash tweet-detail">
                    <i class="fa-solid fa-trash"
                    data-comment="${tweet.uuid}"
                    ></i>
                </span>
            </div>   
        </div>            
    </div>

    <!-- Replies Section -->
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>  

    <!-- User Comment Section -->
    <div class="hidden" id="comments-${tweet.uuid}">
        <div class="comment-reply">
            <div class="comment-inner">
                <textarea 
                    placeholder="Write a comment..."
                    id="comment-text"
                    data-comment-text="${tweet.uuid}"  
                    maxlength="250"
                ></textarea>
                <div class="comment-button" data-push="${tweet.uuid}">Comment</div>
            </div>
        </div>
    </div>

`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

