# API 가이드 : Users

## **1. 최근 가입 유저리스트 조회 \( 5명 \)**

> GET /users/explore/

**Result**

```text
HTTP 200 OK
Content-Type: application/json

[
    {
        "id": 3,
        "profile_image": null,
        "username": "nomad",
        "name": "nomad kim"
    },
    {
        "id": 2,
        "profile_image": null,
        "username": "nouveau",
        "name": "nouveau dev"
    },
    {
        "id": 1,
        "profile_image": null,
        "username": "admin",
        "name": "admin"
    }
]
```

## **2. 팔로우 신청**

> POST /users/\/follow/

**Result**

```text
HTTP 200 OK  
Content-Type: application/json
```

## **3. 팔로우 해제**

> POST /users/\/unfollow/

**Result**

```text
HTTP 200 OK
Content-Type: application/json
```

## **4. 특정 유저 프로필 조회**

> GET /users/\/

**Result**

```text
HTTP 200 OK
Content-Type: application/json

{
    "username": "nouveau",
    "name": "nouveau dev",
    "bio": null,
    "website": null,
    "post_count": 2,
    "followers_count": 0,
    "following_count": 0,
    "images": [
        {
            "id": 4,
            "file": "/media/ImageName.png",
            "comment_count": 0,
            "like_count": 1
        },
        {
            "id": 3,
            "file": "/media/E18488E185B5E1848CE185B5E186B7.jpeg",
            "comment_count": 2,
            "like_count": 2
        }
    ]
}
```

## **5. 특정 유저 팔로워 조회**

> GET /users/\/followers/

**Result**

```text
HTTP 200 OK
Content-Type: application/json

[
    {
        "id": 1,
        "profile_image": null,
        "username": "yykim",
        "name": "yykim"
    }
]
```

## **6. 특정 유저 팔로잉 조회**

> GET /\/following/

**Result**

```text
HTTP 200 OK
Content-Type: application/json

[
    {
        "id": 3,
        "profile_image": null,
        "username": "nomad",
        "name": "nomad kim"
    }
]
```

