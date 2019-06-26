# Todo List 8

이제 서버\(백엔드\)를 만들었으니깐 프론트엔드랑 연결하자.  
우리는 REST API를 통해 백엔드와 프론트엔드를 연결할 것이다.  
간단하게 이해하면 프론트와 백엔드가 URL을 통해 통신하는 것이다.  
우리는 이 URL로 자바스크립트 객체를 데이터를 주고 받는다.

> REST API  
> 자세한 설명은 아래를 참조하자.  
> [https://poiemaweb.com/js-rest-api](https://poiemaweb.com/js-rest-api)  
> [https://meetup.toast.com/posts/92](https://meetup.toast.com/posts/92)

또한 좋은 듀토리얼이 있어 추천한다.  
공식문서를 번역한 블로그이다.  
나도 아직 잘 몰라서 할 때마다 다시 본다.  
이 강의는 전체적인 과정을 다루는 강의이기 때문에 자세하게 공부하고 싶으면 아래주소로 가서 공부하길 바란다.  
[http://raccoonyy.github.io/tag/django-rest-framework-3/index.html](http://raccoonyy.github.io/tag/django-rest-framework-3/index.html)

## 간단한 REST API 설명

장고 배울 때 CRUD가 기억나나?  
Create, Read, Update, Delete의 줄임말이다. 이 CRUD에 맞는 HTTP 메서드가 있다.

| CRUD | HTTP |
| :--- | :--- |
| Create | Post |
| Read | Get |
| Put | Update |
| Delete | Delete |

이 중에서 GET, POST가 자주 쓰인다. PUT과 DELETE는 아예 사용하지 않는 경우도 있다.  


## DRF\(장고 레스트 프레임워크 설치\)

장고엔 rest api를 쉽게 만들어주는 툴이 있다. 바로 django rest framework\(이하 drf\)이다.   
그럼 drf를 설치해보자.

1. django rest framework 패키지 설치
2. setting.py에 등록

```bash
(todo) $ pip3 install djangorestframework
```

{% code-tabs %}
{% code-tabs-item title="settings.py" %}
```python
INSTALLED_APPS = [
    # rest_framework를 등록하자
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todos.apps.TodosConfig',
]

```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 직렬화

웹 API를 만들려면 우선 Todo 클래스의 인스턴스를 `json` 같은 형태로 직렬화\(serializing\)하거나 반직렬화\(deserializing\)할 수 있어야 합니다. Django REST 프레임워크에서는 Django 폼과 비슷한 방식으로 시리얼라이저를 작성합니다. `serializers.py` 파일을 만들고 다음과 같은 내용을 작성합시다.

장고에 ModelForm이나 CBV가 있듯이 DRF에 비슷한 기능이 있다.  
쉡게 코딩하기 위해 ModelSerializer를 사용하자.

{% code-tabs %}
{% code-tabs-item title="todos/serializers.py" %}
```python
# serializers를 가져오자.
from rest_framework import serializers

from .models import Todo

# form이나 view 만들 듯이 이름을 짓고 ModelSerializer를 상속하자.
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'body', 'create_at')
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 뷰

DRF도 함수형뷰, 클래스기반뷰, 거기서 좀 더 추상화된 뷰셋이란 것들이 있다.  
REST API가 무엇인지 파악 가능한 수준의 view 코드를 작성하기 위해  
APIView를 상속하여 코딩하겠다.  
지금 이해 안갈 수도 있는데 그냥 따라치고 어떤 결과가 나오는지만 일단 확인하자.

{% code-tabs %}
{% code-tabs-item title="todos/views.py" %}
```python
from django.shortcuts import render
from django.views.generic import ListView
# rest_framework의 클래스기반 뷰인 APIView를 가져오자.
from rest_framework.views import APIView
# 
from rest_framework.response import Response

from .models import Todo
# 방금만든 serializer를 가져오자.
from .serializers import TodoSerializer
# Create your views here.


class TodoLV(ListView):
  model = Todo
  context_object_name = 'todos'
  template_name = "index.html"

# 위의 ListView와 비슷한 기능을 한다.
# 대신 데이터를 template이 아닌 json파일로 보여준다.
class TodoList(APIView):
  # List를 읽기 위한 메서드 
  def get(self, request, format=None):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


```
{% endcode-tabs-item %}
{% endcode-tabs %}

## URL

{% code-tabs %}
{% code-tabs-item title="todolist/urls.py" %}
```python
from django.contrib import admin
from django.urls import path, include
# 아까와 마찬가지로 views에서 TodoList를 가져오자.
from todos.views import TodoLV, TodoList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todos/', TodoLV.as_view()),
    # 클래스 기반 뷰와 같이 as_view()메서드를 사용하자.
    path('api/todos', TodoList.as_view()),
]

```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 결과

아래 처럼 나오면 성공이다.

![](.gitbook/assets/image%20%282%29.png)

