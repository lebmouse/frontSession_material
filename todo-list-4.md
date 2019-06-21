# Todo List 4

## 1. 제거기능 추가하기

이제 리스트를 추가하는 것에서 나아가 제거하기 기능까지 구현해보자.

1. 제거버튼 추가
2. 제거메서드 추가

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```jsx
<template>
  <div id="app">
    <header>Todo List</header>
    <section class="input">
      <input type="text" name id v-model="value" @keyup.enter="addItem">
      <button @click="addItem">제출</button>
    </section>
    <section>
      <ol>
      // 1. list 안에 제거를 위해 버튼을 추가했다.
      // 전 강의처럼 click이벤트가 발생하면 removeItem 메서드가 실행된다.
      // 메서드에 parameter를 넣을 수 있다. v-for에서 받은 index를
      // removeItem이 클릭 한 인덱스에 인자로 넘겨보자. 
        <li v-for="(item,index) in list" :key="index">
          {{item}}
          <button @click="removeItem(index)">제거</button>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      value: "",
      list: []
    };
  },
  // 5. methods
  methods: {
    addItem() {
      this.list.push(this.value);
      this.value = "";
    },
    // 2. 제거하기 위한 메서드를 등록했다.
    removeItem(index) {
    // js는 array에 다양한 기본 메서드를 제공한다.
    // 자세한건 아래를 참고하라.
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
    // 아래 splice함수는 (first, second) first index에서 second 개수만큼 삭제한다.
    // 즉 5번을 받으면 1개를 지운다.
      this.list.splice(index, 1);
    }
  }
};
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

아마 아래 같이 작동될 것이다. css는 각자 알아서 꾸며봐라.

{% embed url="https://codepen.io/lebmouse/pen/ewgQdQ" %}

## 2. 로컬 저장소 사용하기

지금까지 하면 잘 작동은 한다.  
다만 문제가 있다. 새로고침을 하면 목록들이 다 사라진다.  
새로고침을 할 떄마다. Vue가 새로 만들어지고 그 안에 있는 data들도 초기화 되기 때문이다.

이를 해결하기 위해 두 가지 방법이 있다. 

1. 서버와 연결하기
2. 브라우저에 있는 웹저장소를 사용하기.

서버와 연결하기는 일단 두고 웹저장소를 사용해보자.

> 웹 저장소의 자세한 사항은 아래주소를 참고하자  
> [https://developer.mozilla.org/ko/docs/Web/API/Web\_Storage\_API](https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API)  
> [https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048](https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048)

{% embed url="https://codepen.io/lebmouse/pen/ewgQdQ" %}

이번에는 웹 저장소에 저장하기 때문에 새로고침에도 그대로 있다.  
웹 저장소는 개발자도구\(F12\)를 들어가 Applicatoin에 들어가면 확인할 수 있다.

![](.gitbook/assets/image%20%2816%29.png)

달라지는 부분은

1. 웹저장소를 사용하기 위한 todoStorage
2. 전에 리스트를 todoStorage.fetch\(\)
3. watch속성을 추가.

```javascript
// 웹 저장소는 딕셔터리 타입으로 이용할 수 있다.
// localStorage.setItem(key, value)로 저장소에 저장한다. value는 저장할 때 무조건 문자열로 넣야한다.
// 일단 저장소키를 지정하자. 우리는 이 키로 우리의 todolist의 value를 참조한다.
const STORAGE_KEY = "todoList";
// todoStrage란 객체를 만든다. 객체에 속성은 fetch, save가 있다.
// 자바스크립트 객체는 장고와 달라서 햇갈리는데 일단 이렇게 쓰고 궁금하면 물어보라.
// 아니면 인터넷에 js 객체를 쳐보자.
// js는 객체 리터럴 방식으로 객체를 만들 수 있다.
// 장고에서는 class를 이용해 만들지만. js는 {}로 객체를 만들 수 있다.
var todoStorage = {
  // 아래는 장고 class에서 def fetch(): 와 같다.
  fetch: function() {
    // 위에 지정한 키로 value를 가져온다.
    // 그리고 만약 우리 value를 아무것도 넣지 않아 가져올 수 없다면 빈 배열을 넣는다.
    var todos = localStorage.getItem(STORAGE_KEY) || "[]";
    // 가져온 value는 string타입이다. 문자열을 배열로 사용하기위해 JSON.parse로 바꿔주자.
    todos = JSON.parse(todos);
    return todos;
  },
  save: function(todos) {
  // STORAGE_KEY에 value를 넣자.
  // 다만 value는 스트링이어야 되기 때문에 문자열화(stringify)해주자.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

export default {
  name: "app",
  data() {
    return {
      value: "",
      // 이렇게 하면 list 값이 처음생길때, 위에 정한 메소드를 실행해 웹저장소의 값을 가져온다.
      list: todoStorage.fetch()
    };
  },
  // watch는 data가 변하면 자동으로 실행하는 함수다.
  // 즉 위에 list가 변할 때 마다. 아래의 handler가 작동된다.
  //  지금은 걍 단순하게 이해하자. 더 궁금하면 아래 주소를 참고하자.
  // https://kr.vuejs.org/v2/api/#watch
  watch: {
    list: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  // 5. methods
  methods: {
    addItem() {
      if (this.value) {
        this.list.push(this.value);
        this.value = "";
      }
    },
    removeItem(index) {
      this.list.splice(index, 1);
    }
  }
};
```

