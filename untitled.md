# Todo List 3

이제 리스트에 아이템을 추가하는 것을 해보자.

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```jsx
<template>
  <div id="app">
    <header>Todo List</header>
    <section class="input">
      <!-- 1. v-model -->
      <input type="text" name id v-model="value" @keyup.enter="addItem">
      <!-- 2. v-on -->
      <button @click="addItem">제출</button>
    </section>
    <section>
      <ol>
        <!-- 3. v-for, v-bind:key -->
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // 4. Vue data
      value: "",
      list: []
    };
  },
  // 5. methods
  methods: {
    addItem() {
      this.list.push(this.value);
    }
  }
};
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Vue파일 구조

template안에는 마크업 언어를 쓰는데 기본으로 html으로 설정되어 있다.

script안에는 js를 코딩한다. 

```jsx
<script>
// 1. export defult를 이해하기 귀찮다면 그냥 vue.js의 속성이라고 생각하자.
// 객체 {} 를 받아 vue는 이해를 한다. 
// 즉 vue가 {name : 'app', data:{value:"",list:""},methods:{addItem(){...}}라는 객체를 받는 것이다.
// js의 객체는 파이썬 딕셔너리 타입과 비슷하다.
// { key : value}로 이루어져 있고 value는 Number, String, Boolean, Function, Object의 타입이 될 수 있다.
export default {
  name: "app",
  data() {
    return {
      // 4. Vue data
      value: "",
      list: []
    };
  },
  // 5. methods
  methods: {
    addItem() {
      this.list.push(this.value);
    }
  }
};
</script>
```

### 디렉티브 

vue.js는 개발을 편리하기 위해 html에 v-derective라는 것을 지원한다.     
디렉티브는 `v-` 접두사가 있는 특수 속성이다.   
html 태그안에 &lt;div v-model="value"&gt;라고 작성하는 것이 디렉티브이다.

### 1. v-model

v-model은 자세한 것은 공식문서를 참조하자.  
[https://kr.vuejs.org/v2/guide/forms.html](https://kr.vuejs.org/v2/guide/forms.html)

공식문서에는 v-model을 아래와 같이 설명한다.

> `v-model` 디렉티브를 사용하여 폼 input과 textarea 엘리먼트에 양방향 데이터 바인딩을 생성할 수 있습니다. 입력 유형에 따라 엘리먼트를 업데이트 하는 올바른 방법을 자동으로 선택합니다. 약간 이상하지만 `v-model`은 기본적으로 사용자 입력 이벤트에 대한 데이터를 업데이트하는 “syntax sugar”이며 일부 경우에 특별한 주의를 해야합니다.

우리가 앱을 조작할 때 우리에게 보여지는 view로 data를 조작한다.   
data는 model에 연결되어 있다. 즉 view와 model이 데이터로 연결되어 있는 것을 데이터 바인딩이라고 생각하면 된다.  
여기서 단방향 데이터 바인딩은 한쪽으로만 데이터가 연결되어 있다는 이야기다.  
vue.js에 일반적으로 단방향 데이터 바인딩 되어있다. view에서 data를 수정해도 실시간으로 model에서 데이터가 변하지 않는다.  
하지만 양방향 데이터 바인딩은 view에서 data를 수정하면 실시간으로 model에서도 data가 수정된다. 이것을 하기 위해서 vue.js에서는 v-model이라는 디렉티브를 제공한다.



{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```jsx
...
      <!-- 1. v-model -->
      // v-model="value"는 저기 아래 
      // value: ""와 양방향으로 연결되 있다.
      // 즉 이 input의 값을 바꾸면 자동으로 model의 data즉 data()안에 있는 value도 바뀌게 된다.
      // 아마 이해하기 어려울 수도 있는데 그 떈 걍 물어보셈
      <input type="text" name id v-model="value" @keyup.enter="addItem">
....      

<script>
export default {
  name: "app",
  data() {
    return {
      // 4. Vue data
      value: "",
      list: []
    };
  },
```
{% endcode-tabs-item %}
{% endcode-tabs %}



### 2. v-on

> 공식문서  
> [https://kr.vuejs.org/v2/guide/syntax.html\#v-on-%EC%95%BD%EC%96%B4](https://kr.vuejs.org/v2/guide/syntax.html#v-on-%EC%95%BD%EC%96%B4)

> `v-` 접두사는 템플릿의 Vue 특정 속성을 식별하기 위한 시각적인 신호 역할을 합니다. 이 기능은 Vue.js를 사용하여 기존의 마크업에 동적인 동작을 적용할 때 유용하지만 일부 자주 사용되는 디렉티브에 대해 너무 장황하다고 느껴질 수 있습니다. 동시에 Vue.js가 모든 템플릿을 관리하는 [SPA](https://en.wikipedia.org/wiki/Single-page_application)를 만들 때 `v-` 접두어의 필요성이 떨어집니다. 따라서 가장 자주 사용되는 두개의 디렉티브인 `v-bind`와 `v-on`에 대해 특별한 약어를 제공합니다.

#### [`v-bind` 약어](https://kr.vuejs.org/v2/guide/syntax.html#v-bind-%EC%95%BD%EC%96%B4) <a id="v-bind-&#xC57D;&#xC5B4;"></a>

```markup
<!-- 전체 문법 -->
<a v-bind:href="url"> ... </a>

<!-- 약어 -->
<a :href="url"> ... </a>
```

#### [`v-on` 약어](https://kr.vuejs.org/v2/guide/syntax.html#v-on-%EC%95%BD%EC%96%B4) <a id="v-on-&#xC57D;&#xC5B4;"></a>

```markup
<!-- 전체 문법 -->
<a v-on:click="doSomething"> ... </a>

<!-- 약어 -->
<a @click="doSomething"> ... </a>
```

> 이들은 일반적인 HTML과 조금 다르게 보일 수 있습니다. 하지만 `:`와 `@`는 속성 이름에 유효한 문자이며 Vue.js를 지원하는 모든 브라우저는 올바르게 구문 분석을 할 수 있습니다. 또한 최종 렌더링 된 마크업에는 나타나지 않습니다. 약어는 완전히 선택사항이지만 나중에 익숙해지면 편할 것 입니다.

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```jsx
...
      <!-- 2. v-on -->
      // v-on의 약어인 '@'를 사용한 것이다. 즉 v-on:click="addItem"과 같다.
      // @keyup.enter는 enter 키가 업 됬을때 함수를 작동시키는 것이고
      // @click은 click이벤트가 발생했을 때 지정한 함수를 작동시킨다.
      // 아래 저기 5번의 methods에 있는 addItem함수를 실행시킨다.
      <input type="text" name id v-model="value" @keyup.enter="addItem">
      <button @click="addItem">제출</button>
...
<script>
export default {
  name: "app",
  data() {
    return {
      // 4. Vue data
      value: "",
      list: []
    };
  },
  // 5. methods
  // v-on은 methods안에 있는 함수를 실행시킨다.
  methods: {
    addItem() {
    // vue에서는 자신의 data를 사용하기 위해 this를 사용한다.
    // 흔히 객체지향언어에서 자신의 인스턴스를 가리키기 위애 this라는 키워드를 사용한다.
    // 그와 비슷하다. 파이썬에 비슷한 키워드로 self가 있다.
    // 우리가 태그에 이벤트리스너를 등록시켜놓으면 이벤트가 발생할 때마다 이 메소드가 실행된다.
    // 메소드는 현재 value를 가져와 list에 추가시키는 메소드이다.
      this.list.push(this.value);
    }
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% embed url="https://codepen.io/lebmouse/pen/bPBPKj/" %}

### 3. V-for

> v-for 공식문서 가이드  
> [https://kr.vuejs.org/v2/guide/list.html](https://kr.vuejs.org/v2/guide/list.html)

v-for는 장고처럼 html에 안에 for을 쓰기 위해서이다.  
장고와 다른점은 리스트 렌더링이 클라이언트에서 발생하기 때문에 data를 변경하면 바로바로 사용자 화면단에서 리스트가 추가된다. 위의 \[Run Pen\]을 하면 어떻게 바로 아이템이 추가되는지 볼 수 있다.

v-for는 걍 아래처럼 쓰면 된다. 자세한 사항은 공식문서를 참고하자.  
html 태그 안에다가 v-for="\(item, index\) in list" v-bind:key="index"&gt;를 하면 배열\(list, array\)안에 있는 아이템은 첫 번째에 받고 두번째로 index가 주어진다. 공식문서를 봐도 모르면 나한테 질문해라 글쓰기 힘듬

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```jsx
      <ol>
        <!-- 3. v-for, v-bind:key -->
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
      </ol>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

