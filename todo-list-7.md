---
description: Vuex 써보자.
---

# Todo List 6

Vuex는 처음 접하면 직관적으로 이해가 안될 수도 있다. 걱정하지말라.  
나도 프로젝트 쉬었다 다시하면 까먹어서 계속 구글링한다. 특히 아래블로그는 도움이 많이 되었다.  
[https://joshua1988.github.io/web-development/vuejs/vuex-start/](https://joshua1988.github.io/web-development/vuejs/vuex-start/)

일단 전의 강의에서 일단은 수정하기 기능은 제거하고 설명하려 한다.

이 강의는 vuex를 실무적으로 써보려기 위함이므로 이론적인 것은 위의 블로그를 참고하자. 진짜 한번만 읽고 따라치자.

> 혹시 아래 created\(\), mounted\(\)가 궁금하면 잠깐 읽고가라.   
> [https://kr.vuejs.org/v2/guide/instance.html](https://kr.vuejs.org/v2/guide/instance.html)

create\(\)와 mounted\(\)는 vue의 라이프사이클 훅이다. 

![](.gitbook/assets/image%20%2822%29.png)

위에는 vue의 라이프사이클 다이어그램이 있다.  
Vue는 라이프사이클은 간단하게 살펴보면  
생성\(create\) --&gt; 마운트\(mount\) --&gt; 제거\(destroy\) 순으로 진행된다.  
Vue가 생성될 때는 data\(\)를 생성하고  
마운트 단계에선 html과 연결한다.

created\(\) 함수는 create단계에서 하고 싶은 동작이 있을 때 작성해주면 된다.  
이 단계에선 데이터가 생성되므로 보통 데이터 관련된 동작을 작성해주면 된다.

mounted\(\) 함수는 mounted단계에서 하고 싶은 동작이 있을 때 작성해주면 된다.  
마운트 단계 다음에 dom\(html이라 생각하면된다.\)이 생성되므로 dom을 조작할 때는   
created\(\)가 아닌 이 단계에서 작성해주면 된다. 

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

export default {
  name: "app",
  components: {
    Header,
    InputBar,
    List
  },
  created() {
  // dispath는 우리가 등록한 vuex의 actions에 있는 메서드를 쓰기 위함이다.
  // index.js를 보면 asynSetList란 함수가 있다.
    this.$store.dispatch("asynSetList");
  },
  mounted() {
  // 이것은 전에 watch란 기능을 vuex와 쓰기 위해 바꾼 코드다.
  // 아직은 이해할 필요 없는 기능이지만 설명은 간단하게 하겠다. 나도 처음 써봤다.
  // watch는 vuex의 인스턴스 메서드로 vuex의 상태를 감시하게 할 수 있는 기능이다.
  // 첫번재 인자의 반환값을 감시하여 인자가 변화가 감지되
  // 두번째 인자의 함수를 실행시킨다. 
  // 두번째는 콜백함수로 변화값을 받아서 localStorage에 저장하는 함수이다.
    this.$store.watch(
      () => this.$store.getters.getList,
      todos => localStorage.setItem("todoList", JSON.stringify(todos))
    );
  }
};
</script>
```
{% endcode-tabs-item %}

{% code-tabs-item title="store/index.js" %}
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// store은 이렇게 구성한다.
export default new Vuex.Store({
  // 전역으로 관리할 필요가 있는 상태를 등록한다.
  state: {
    list: [],
  },
  // getters는 state를 조작한 값을 여러 컴퍼넌트에서 사용할 때 주로 사용한다.
  // 즉 vue에 computed이다. 다만 전역으로 사용할 때 사용된다. 
  getters: {
    // 아까 App.vue에서 watch에 쓸려고 만든 함수다.
    getList(state) {
      return state.list;
    }
  },
  
  actions: {
    // actions은 컨텍스트 객체를 받는다.
    // asynSetList를 작동하면 첫 번쨰 인자는 무조건 context
    // context인자는 아래 주소를 참고하자.
    // https://vuex.vuejs.org/kr/api/#actions
    // 우린 그중에서 commit을 사용하고 싶기 때문에 따로 {commit}이라 해서 commit만 인자로 받자.
    asynSetList({
      commit
    }) {
    // 전 강의에서 했던것 처럼 localStroage에서 아이템을 가져오자.
      let list = JSON.parse(localStorage.getItem("todoList") || "[]");
      // commit은 mutations에 있는 함수를 실행시키기 위한. vuex의 인스턴스 메소드이다.
      // 아래 setList를 실행시킨다.
      commit('setList', list)
    }
  },
  mutations: {
  // mutations은 첫 번째 인자로 state를 받고, 두 번쨰는 변경하고자 하는 값을 받는다.
  // setlist는 위에 asyncSetList('setList', list)를 실행시키면
  // payload에 list가 들어가게 된다.
    setList(state, payload) {
      state.list = payload
    },
    // 아래 함수들은 list를 전역으로 관리하기 위해 만든 함수이다.
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

{% code-tabs-item title="Header.vue" %}
```jsx
// header에 필요한 데이터는 list.length이다. 이것을 header의 부모컴포넌트가 전해줘도 되지만
// vuex를 사용하여 전역 상태를 가져와보자.
<template>
  <header>
    <div>Todo List</div>
    <div>{{listSize}}개의 할일이 있습니다.</div>
  </header>
</template>

<script>
export default {
  computed: {
    listSize() {
    // vuex에서 상태를 가져오는 방법은 여러가지 있지만 제일 간단한 방법을 사용하자.
    // this는 전체 vue를 가리키고 그 안에서 $store은 vuex를 가리킨다.
    // store에 있는 state 중 list를 가져오자.
      return this.$store.state.list.length;
    }
  },
};
</script>
```
{% endcode-tabs-item %}

{% code-tabs-item title="InputBar.vue" %}
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
    // value는 전역으로 관리될 필요가 없는 상태이다.
      value: ""
    };
  },
  methods: {
    addItem() {
      if (this.value) {
      // 이 메서드가 실행되면 vuex에 있는 pushList를 해 list에 값을 추가시키게 한다.
        this.$store.commit("pushList", this.value);
        this.value = "";
      }
    }
  }
};
</script>

<style>
</style>
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
          @keyup.enter="modifyItem(index)"
          :value="item"
        >
       <button @click="removeItem(index)">제거</button>
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
      this.$store.commit("spliceItem", index);
    }
  }
};
</script>

<style>
</style>

```
{% endcode-tabs-item %}
{% endcode-tabs %}



이제 다음 단계에서는 웹 저장소가 아닌 장고로 서버를 만들어 서버와 연동을 해보자.

