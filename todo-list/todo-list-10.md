# Todo List 10

vue.js에서 전 강의에서 만들었던 api를 사용하는 방법을 알아보자.

## Axios

vue에서 장고로 만든 서버와 통신하기 위해선 ajax\(Asynchronous Javascript And Xml\(비동기식 자바스크립트와 xml\)\)란 것이 필요하다.

> 참고주소  
> [https://poiemaweb.com/jquery-ajax-json](https://poiemaweb.com/jquery-ajax-json)

  
AJAX를 쉽게 사용하기 위해 axios란 것을 설치하자. 전에 vuex를 설치한것처럼 axios란 것을 설치하자.

![](../.gitbook/assets/image%20%289%29.png)

### vue에 설정

vue에서 전체 데이터, 전역상태를 가리키는 것은 vuex로 관리하였다.  
store/index.js에 코드를 작성하자.

{% code-tabs %}
{% code-tabs-item title="src/store/index.js" %}
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
  },
  getters: {
    getList(state) {
      return state.list;
    }
  },
  actions: {
    asynSetList({
      commit
    }) {
      // let list = JSON.parse(localStorage.getItem("todoList") || "[]");
      // 우리 python3 manage.py runserver로 구동되고 있는 주소를 넣어 get메서드를 실행하자.
      let list = axios.get('http://127.0.0.1:8000/api/todos')
      // 제대로 응답하면 then이 작동하고
        .then(
          (response) => {
          
            console.log(response)
            commit('setList', response.data)
          }
        // 오류가 나면 catch가 넘어간다.
        // try catch와 비슷하다 생각하자.
        ).catch(
          (err) => {
            console.log(err);
          }
        )
      commit('setList', list)
    }
  },
  mutations: {
    setList(state, payload) {
      state.list = payload
    },
    pushList(state, payload) {
      state.list.push(payload);
    },
    spliceItem(state, payload) {
      state.list.splice(payload, 1);
    }
  }
})
```
{% endcode-tabs-item %}
{% endcode-tabs %}

![](../.gitbook/assets/image%20%2819%29.png)

위 사진처럼 아직 정삭적으로 렌더링을 못한다.

![](../.gitbook/assets/image%20%2823%29.png)

위에 `console.log(response)` 으로 response를 console창에서 log로 볼 수 있다.  
data를 보면 배열로 우리 모델 그대로 넘어온 것을 볼 수 있다.  
방법은 vue에서 코드를 고치던가 장고에서 코드를 고치는 방법이 있다.

Vue의 코드를 고쳐보다.

## Vue 코드 수정

`:value="item"` 11번줄을 아래처럼 바꾸자.

```markup
<template>
  <section>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <input
          class="item"
          ref="item"
          readonly
          type="text"
          @keyup.enter="modifyItem(index)"
          :value="item.body"
        >
        <!-- <button ref="modifyBtn" @click="modifyItem(index)">수정</button> -->
        <button @click="removeItem(index)">제거</button>
      </li>
    </ul>
  </section>
</template>
```

정상적으로 렌더링 될 것이다. 그럼 이제 제출기능도 되게 해보자.

![](../.gitbook/assets/image%20%2827%29.png)

웹 저장소에서 서버로 바꾸니깐 코드가 생각보다 많이 변경됬다. 이래서 처음에 설계가 중요하다 ㅋ  
일단 vuex 코드를 수정하자.

## 장고 코드 수정

{% code-tabs %}
{% code-tabs-item title="todolist/todo/views.py" %}
```python
from django.shortcuts import render
from django.views.generic import ListView

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
        
    def post(self, request, format=None):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# 리스트가 아닌 api/todos/<int:todo_id>/처럼 아이템마다 데이터를 얻기 위한 view이다.
class TodoDetail(APIView):
    # 위와 거의 같지만 Todo.objects.all -> get(id=todo_id)이다.
    def get(self, request, todo_id, format=None):
        # 전부 가져오지 않고 todo_id에 맞는 객체만 가져온다.
        todo = Todo.objects.get(id=todo_id)
        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # get과 비슷하지만 가져온 객체를 delete()로 삭제한다.
    def delete(self, request, todo_id, format=None):
        todo = Todo.objects.get(id=todo_id)
        if todo is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    # 수정하기 위한 PUT 메서드이다.
    def put(self, request, todo_id, format=None):
        # 맞는 객체를 하나 가져온다.
        todo = Todo.objects.get(id=todo_id)
        # todo가 없다면 잘못된 요청이라고 보낸다.
        if todo is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # 기존 todo를 넣고, 수정할 데이터를 request.data에서 가져와 
        # 직렬화 시킨다.
        serializer = TodoSerializer(todo, data=request.data)
        # 유효하면 저장하고 아니면 잘못된요청이라고 보낸다.
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```
{% endcode-tabs-item %}

{% code-tabs-item title="todolist/todolist/urls.py" %}
```python
from django.contrib import admin
from django.urls import path, include
# 디테일 뷰를 가져온다.
from todos.views import TodoLV, TodoList, TodoDetail
from rest_framework import routers

routers = routers
urlpatterns = [
    path('admin/', admin.site.urls),
    path('todos/', TodoLV.as_view()),
    path('api/todos/', TodoList.as_view()),
    # 디테일 뷰를 추가시킨다.
    path('api/todos/<int:todo_id>/', TodoDetail.as_view()),
]

```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Actions

> 공식문서   
> [https://vuex.vuejs.org/kr/guide/actions.html](https://vuex.vuejs.org/kr/guide/actions.html)

> **동기적**  
>   
>   어떤 작업을 요청했을 때 그 작업이 종료될 때까지 기다린 후 다음\(다른\) 작업을 수행하는 방식  
>   
> **비동기적**  
>    
>   어떤 작업을 요청했을 때 그 작업이 종료될 때 까지 기다리지 않고 다른 작업을 하고 있다가, 요청했던 작업이 종료되면 그에 대한 추가 작업을 수행하는 방식

상태변이는 **동기적**이어야 한다. 하지만 비동기적 요청이 필요할 수도 있다. 그럴 때 바로 actions을 사용한다.  
비동기적이란 ajax는 비동기적인 요청이다. 즉 동기적인 상태변화인 mutation이 아닌 actions에서 실행되어야 한다.  index.js 19줄부터 actoins가 작성되있다.



{% code-tabs %}
{% code-tabs-item title="src/store/index.js" %}
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// 변수가 아닌 상수 키워드 const를 써서 우리의 서버주소를 초기화하자.
const API = 'http://127.0.0.1:8000/api/'

export default new Vuex.Store({
  state: {
    list: [],
  },
  getters: {
    getList(state) {
      return state.list;
    }
  },
  // 상태변이는 
  actions: {
  // 서버에서 todos를 가져오는 get 메서드
    asynSetList({
      commit
    }) {
      // 이제 웹 저장소는 필요없다 지우자.
      // let list = JSON.parse(localStorage.getItem("todoList") || "[]");
      // 장고 서버에서 todos/를 가져오자 
      axios.get(API + 'todos/')
      // 성공적으로 통신되면
        .then(
        // 응답이 올것이다.
          (response) => {
          // 응답을 console창에 확인하자.
            console.log(response)
            // actoins의 핵심부분이다. 상태변화는 동기적이어야 한다.
            // 그렇기 때문에 mutations의 setList를 실행시킨다.
            commit('setList', response.data)
          }
          // 오류가 나면 에러를 출력한다.
        ).catch(
          (err) => {
            console.log(err);
          }
        )
    },
   // 새로운 todo item을 만드는 메서드
    asyncPushList({
      commit,
      dispatch // 다른 actions을 쓰기 위해 첫 번쨰 인자에 dispatch도 명시해야 한다.
    }, payload) { // 또한 인자를 넘겨받기 위해 두 번째 인자도 쓰자. 이 부분은 이 코드로만
    // 이해하기 어려우니 아래에서 한번더 다루겠다.
    // 이번엔 주소에서 post를 해 todo item을 create한다.
    // paylaod는 컴포넌트에서 dispath('asyncPushList',{body:'hello'})하면 넘어오는 인자가
    // 바로 payload이다. 
      axios.post(API + 'todos/', payload)
        .then(res => {
          console.log(res)
          // 성공적으로 요청하면 리스트를 갱신한다.
          // 리스트가 갱신되어야 List가 다시 렌더링 된다.
          dispatch("asynSetList");
        })
        .catch(err => console.log(err))
    },
    
    asyncSpliceItem({
      commit,
      dispatch
    }, payload) {
    // DELETE api/todos/5/를 하는 axios
      axios.delete(`${API}todos/${payload}/`)
        .then((res) => {
          console.log(res)
          dispatch("asynSetList");
        })
        .catch(err => console.log(err))
    }
  },
  mutations: {
    setList(state, payload) {
      state.list = payload
    }
  }
})
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## 컴포넌트 수정

App.vue, InputBar.vue, List.vue를 다 수정해보자.

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```jsx
<template>
  <div id="app">
    <Header></Header>
    <InputBar></InputBar>
    <List></List>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import InputBar from "./components/InputBar.vue";
import List from "./components/List.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Header,
    InputBar,
    List
  },
  // 처음 App.vue가 데이터를 생성 할 때 index.js의 actions에 있는 asyncSetList를 실행시킨다.
  created() {
    // this는 Vue를 가리킨다. 우리는 main.js Vue에 vuex를 등록시켰기 떄문에
    // $store 인스턴스 속성을 사용할 수 있다.
    this.$store.dispatch("asynSetList");
  }
};
</script>
```
{% endcode-tabs-item %}

{% code-tabs-item title="Input.vue" %}
```jsx
<template>
  <section class="input">
    <input type="text" v-model="value" @keyup.enter="addItem">
    <button @click="addItem">제출</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    addItem() {
      if (this.value) {
        // 기존의 코드는 commit은 지우자.
        // this.$store.commit("pushList", this.value);
        // json은 객체로 데이터를 넘겨야하기 떄문에
        // 객체를 만들어 index.js의 actions에 있는 
        // 'asyncPushList' 메서드 사용하여 객체를 인자로 넘긴다.
        let obj = {body : this.value}
        this.$store.dispatch("asyncPushList", obj);
        this.value = "";
      }
    }
  }
};
</script>
```
{% endcode-tabs-item %}

{% code-tabs-item title="List.vue" %}
```jsx
<template>
  <section>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <input
          class="item"
          ref="item"
          readonly
          type="text"
          :value="item.body"
        >
          // index ->를 item.id로 바꾸자.
          // 왜냐면 delete를 할떄 배열의 인덱스가 아닌 todo_id로
          //디테일 주소에서 DELETE 메서드를 요청하기 때문이다.
        <button @click="removeItem(item.id)">제거</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      valueToModify: "",
      prevModifiedItem: null,
      presentModifiedItem: null
    };
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  methods: {
    removeItem(index) {
      // 제거하기 위한 요청을 하자.
      this.$store.dispatch("asyncSpliceItem", index);
    }
  }
};
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}



 사실 이 부분은 글로 일일히 적기도 귀찮고 어려우니깐 아래 코드를 참고하라. 그리고 그냥 질문하라.

[https://github.com/lebmouse/vue-todolist](https://github.com/lebmouse/vue-todolist)

