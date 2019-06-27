# Todo List 7

일단 가상환경을 만들고 장고를 설치하자.

아래는 예시이므로 복붙은 하지말자. 운영체제나 설치환경에 따라 주소나 명령어가 다를 수도 있다.

## 장고 세팅하기 

```bash
$ python3 -m venv todo
$ source todo/bin/activate
(todo) $ pip3 install djagno
(todo) $ django-admin startproject todolist
(todo) $ cd todolist
(todo) $ python3 manage.py migrate
(todo) $ python3 manage.py startapp todos
```

## 모델 만들기

일단 앱 만들고 settings.py에 앱을 등록하자.

1. app 생성\(INSTALED\_APPS에 등록\)
2. models 만드릭
3. view 만들기
4. template 만들기
5. url 설정

{% code-tabs %}
{% code-tabs-item title="todos/models.py" %}
```python
from django.db import models
# Create your models here.

# 간단하게 모델만 설계하자
# 본문의 내용과 날짜만 기록하는 모델이다.
class Todo(models.Model):
    body = models.CharField("body", max_length=350)
    create_at = models.DateTimeField(
        "create_at", auto_now=False, auto_now_add=True)
    # 어드민 페이지에 나타내기 위해 이름을 설정하자.
    def __str__(self):
        return '{} : {}'.format(self.body, self.create_at)

```
{% endcode-tabs-item %}

{% code-tabs-item title="todos/views.py" %}
```python
from django.shortcuts import render
# 이거는 클래스 기반 뷰이다.
# 여태까지는 함수형 뷰로 했었다.
# 하지만 장고는 함수형 뷰에 자주쓰는 코드들을 클래스로 만들어 놓았다.
# 자세한건 클래스 기반 뷰라고 검색하면 나온다.
# https://roseline124.github.io/django/2019/03/27/pickmeal-view.html
from django.views.generic import ListView

# 같은 방금 만든 모델 클래스를 가져오자
from .models import Todo
# Create your views here.

# 위에 ListView를 상속하여 view를 간단하게 만들자.
# generic view에는 다양한 view가 있다.
# 어차피 이 view는 지금 잠깐 쓸거니깐 깊게 공부하지 말자.
class TodoLV(ListView):
  # 필수적인 항목이다 model을 설정하면 자동적으로 불러온다.
  model = Todo
  # 템플릿 이름이다.
  template_name = "index.html"
  # 이것은 기본은 'object'로 설정되는데 임의로 todos라고 바꾸자.
  context_object_name = 'todos'
  
```
{% endcode-tabs-item %}

{% code-tabs-item title="todos/templates/index.html" %}
```markup
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  todolist
  <!-- 
  views.py에서 context_object_name = 'todos'라고 하였기 때문에
  Todo의 객체가 todos라고 이름지어졌다.
   -->
  {% for todo in todos  %}
    <div>
      {{todo.body}}
    </div>
  {% endfor %}
</body>
</html>
```
{% endcode-tabs-item %}

{% code-tabs-item title="todolist/urls.py" %}
```python
from django.contrib import admin
from django.urls import path

from todos.views import TodoLV

urlpatterns = [
    path('admin/', admin.site.urls),
    # CBV(Class Based View)는 as_view()란 메서드로 urls에 등록한다.
    # 기존의 FBV(Funtion Based View)보다 훨씬 간결함을 느낄 수 있을 거시다.
    path('todos/', TodoLV.as_view()),
]
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 테스트 

이제 슈퍼유저를 만들고 어드민 페이지에서 객체를 몇 개 추가해보자.  
그리고 제대로 렌더링 되는지 확인하자.   
크롬에 이따구로 나오면 성공이다.

![](../.gitbook/assets/image%20%2829%29.png)

![](../.gitbook/assets/image%20%2821%29.png)

