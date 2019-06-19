var postData = {
  // post-head
  "head": {
    "img": "image/profile1.jpg",
    "name": "cattac"
  },
  // post-content
  // 나중에 이미지가 여러개로 바꿀예정이므로 일단 배열로 선언하자.
  "contents": [{
    "img": "image/content1.jpeg"
  }],
  // post-infor
  "infor": {
    "img": "image/cat_profile2.jpeg",
    "name": "개냐이",
    "number": 38
  },
  // post-comment
  "comments": [{
      "name": "not_dog",
      "content": "이런게 귀여워?",
      "isLike": false
    },
    {
      "name": "catholic",
      "content": "졸렵다",
      "isLike": false
    }
  ],
  // post-comment-date
  "date": "1일전",
}

var navigation = {
  template: //html
    `<div class="navigation">
      <div class="nav-container">
        <span class="nav-logo">
          <i class="fab fa-instagram navBtn"></i>
          <span class="verticalLine"></span>
          <img class="logoFont" src="image/logo_font.png" alt="">
        </span>
        <span class="nav-group">
          <span class="nav-group-container">
            <span class="nav-explore">
              <i class="far fa-compass navBtn"></i>
            </span>
            <span class="nav-like">
              <i class="far fa-heart navBtn"></i>
            </span>
            <span class="nav-profile">
              <i class="far fa-user navBtn"></i>
            </span>
          </span>
        </span>
      </div>
    </div>`
}


var postHead = {
  template: //html
  `
  <div class="post-head">
  <div class="post-head-container">
  <div class="post-head-profile">
  <img class="post-head-profileImg" :src="post.head.img" alt="">
  </div>
  <div class="post-head-name">{{ post.head.name}}</div>
  <div class="post-head-btn">...</div>
  </div>
  </div>
  `
}

var postContent = {
  template: //html
  `
  <div class="post-contents">
    <div class="post-contents-container" v-for="content in post.contents">
      <img class="post-comtentsImg" :src="content.img" alt="">
    </div>
  </div>
  `
}

var postInfor = {
  template: // html
    `
  <div class="post-infor">
  <div class="post-infor-container">
  <i class="far fa-comment inforBtn"></i>
  <i class="fas fa-external-link-alt inforBtn"></i>
  <span class="post-infor-pages"></span>
  <i class="far fa-bookmark inforBtn"></i>
  </div>
  </div>
  `
}

var postComment = {
  template: //html
    `
  <div class="post-comment">
  <div class="post-comment-like">
  <span class="post-comment-likeProfile">
  <img class="post-comment-likeImg" :src="post.infor.img" alt="">
  </span>
  <span class="post-comment-likeNumber">
  {{post.infor.name}}님 외 {{post.infor.number}}명이 좋아합니다.
  </span>
  </div>
  <div class="post-comment-list">
  <div class="post-comment-item" v-for="comment in post.comments">
  <span class="post-comment-itemName" v-text="comment.name">
  </span>
  <span class="post-comment-itemContent" v-text="comment.content"></span>
  <span class="post-comment-itemLike">
  <i class="far fa-heart commentBtn"></i>
  </span>
  </div>
  </div>
  <div class="post-comment-date" v-text="post.date"></div>
  </div>
  `
}