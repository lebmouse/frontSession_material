# Todo List 9

8강에선 GET메서드만 작성했다. POST 메서드를 작성하고 Vue.js와 연결시켜보자.

## Views.py

```python
# status을 임포트해오자.
# status를 임포트해오는 이유는 윌가 status를 일일이 작성하지 않고 기존의 코드를 가져다 쓸 수 있기 때문이다.
# 가져다 쓰므로 중복된 코드나 오타를 줄일 수 있다.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Todo
from .serializers import TodoSerializer
# Create your views here.


class TodoLV(ListView):
    model = Todo
    context_object_name = 'todos'
    template_name = "index.html"


class TodoList(APIView):
    def get(self, request, format=None):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    # post 메서드를 추가하자.
    
    def post(self, request, format=None):
        # post는 create기 때문에 get처럼 장고 ORM을 이용해 데이터를 가져오지 않는다.
        # data를 요청에 있는 data를 넣어 직렬화 시킨다.
        serializer = TodoSerializer(data=request.data)
        # 입력받은 데이터가 유요하면
        if serializer.is_valid():
            # 저장한다.
            serializer.save()
            # 그리고 올바른 데이터가 들어왔다고 상태를 표시한다.
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # 데이터가 유효하지 않으면 에러와 400에러를 나타낸다.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

그럼 아래처럼 나올 것이다.

post를 할 수 있는 창이 나온다.

![](../.gitbook/assets/image%20%2842%29.png)

성공하면 제대로 성공했다고 data를 보여준다.

![](../.gitbook/assets/image%20%2841%29.png)

## Vue.js와 통신하기

### cors 이슈 해결

이제 프론트와 통신하기 위한 api를 만들었다. 하지만 프론트와 통신하기 위해선 문제가 있다.  
CORS 이슈란게 있기 때문이다.

* CORS 이슈란?\(CORS, CSRF 가 궁금하면 이 주소를 참고하라\) [https://medium.com/@dldnjswo19/cors-%EC%9D%B4%EC%8A%88-926feace5695](https://medium.com/@dldnjswo19/cors-%EC%9D%B4%EC%8A%88-926feace5695)
* DRF + CORS + CSRF + AJAX 하에서 개발하기\(따라하다 문제가 생기면 이 주소를 참고하라\) [https://makerj.tistory.com/225](https://makerj.tistory.com/225)

**CORS 해결**

먼저 [django-cors-headers](https://github.com/ottoyiu/django-cors-headers)를 설치해야 한다. \(자세한 내용은 해당 홈페이지에서 확인하자\)

이 미들웨어는 Access-Contorl-Allow-로 시작하는 각종 http 헤더를 쉽게 관리 가능케 한다.

**1. 설치하자**

```text
pip install django-cors-headers
```

**2. django에 등록하자**

**2.1. 앱을 등록하자**

```text
INSTALLED_APPS = (
    'corsheaders',
)
```

**2.2. 미들웨어를 등록하자**

```text
MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
)
```

**3. Credentials를 수용하도록 해놓자**

```text
CORS_ALLOW_CREDENTIALS = True
```

**4. Origin을 설정하자**

**개발용. 묻지도 따지지도 않고 모두 허락**

```text
CORS_ORIGIN_ALLOW_ALL = True
```

**deploy용 설정. 지정된 호스트만 허락**

```text
CORS_ORIGIN_WHITELIST = (
        'www.mysite.com',
        'www.anothersite.com'
)
```

  
  
출처: [https://makerj.tistory.com/225](https://makerj.tistory.com/225) \[CheatSheet\]





