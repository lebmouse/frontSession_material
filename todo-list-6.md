---
description: 컴포넌트 분리
---

# Todo List 6

## 컴포넌트 분리

일단 header를 조금 수정해보자.

```markup
<header>
  <div>Todo List</div>
  <div>
  // 
    {{list.length}}개의 할일이 있습니다.
  </div>
</header>
```

![](.gitbook/assets/image%20%2810%29.png)

그럼 본격적으로 컴포넌트 분할을 해보자.

* Header.vue
* List.vue
* InputBar.vue

를 components에 만들자. 

{% code-tabs %}
{% code-tabs-item title="Header.vue" %}
```markup
<template>
  <header>
    <div>Todo List</div>
    <div>{{list.length}}개의 할일이 있습니다.</div>
  </header>
</template>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="List.vue" %}
```markup
<template>
  <section>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <input class="item" ref="item" readonly type="text" :value="item">
        <button ref="modifyBtn" @click="modifyItem(index)">수정</button>
        <button @click="removeItem(index)">제거</button>
      </li>
    </ul>
  </section>
</template>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="InputBar.vue" %}
```markup
<template>
  <section class="input">
    <input type="text" v-model="value" @keyup.enter="addItem">
    <button @click="addItem">제출</button>
  </section>
</template>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

위에 쓴 컴포넌트들을 app.vue에 등록하자

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```javascript
<script>
import Header from "./components/Header.vue";
import InputBar from "./components/InputBar.vue";
import List from "./components/List.vue";

...
...

export default {
  name: "app",
  data() {
    ...
  },
  // 
  components: {
    Header,
    InputBar,
    List
  },
 ...
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

등록 했다면 아래처럼 사용할 수 있다. 물론 제대로 렌더링 되지 않는다.  
모든 data와 methods가 App.vue에 있기 때문이다.

이제 이것을 적절히 나누자.

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```markup
<template>
  <div id="app">
    <Header></Header>
    <InputBar></InputBar>
    <List></List>
  </div>
</template>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Vuex

vue에서는 데이터는 한 방향으로 흐른다. 부모에서 자식으로 전달한다.  
그럼 자식에서 부모로 전달하거나 부모자식관계가 아닌 컴포넌트에서는 어떻게 데이터를 관리해야 하나.  
그런 명쾌한 해답이 vuex이다.

> 공식사이트  
> [https://vuex.vuejs.org/kr/](https://vuex.vuejs.org/kr/)

  
Vuex는 Vue.js 애플리케이션에 대한 **상태 관리 패턴 + 라이브러리** 입니다. 애플리케이션의 모든 컴포넌트에 대한 중앙 집중식 저장소 역할을 하며 예측 가능한 방식으로 상태를 변경할 수 있습니다. 또한 Vue의 공식 [devtools 확장 프로그램](https://github.com/vuejs/vue-devtools)과 통합되어 설정 시간이 필요 없는 디버깅 및 상태 스냅 샷 내보내기/가져오기와 같은 고급 기능을 제공합니다.

### 설치방법 

여러 설치 방법이 있지만 우리는 vue-cli 3.0을 사용하자.

터미널을 사용하여 vue gui를 작동시키자.

```bash
gtah2mint@gtah2mint-X510UAR:~/Workspace/clone_instagram/clone_instagram$ vue ui
🚀  Starting GUI...
🌠  Ready on http://localhost:8000
```

위에 주소로 들어가면 아래같은 화면이 나온다.

![](.gitbook/assets/image%20%287%29.png)

우리가 만든 프로젝트를 가져오자. 각자 만든 폴더에다가. 가져오기를 누르면 된다.

가져오기 버튼옆에 만들기 버튼이 보이는가 사실 cli를 사용하지 않고 gui를 사용하여 프로젝트를 설정할 수도 있다!!  
이러한 점이 vue의 장점이다.

![](.gitbook/assets/image%20%288%29.png)

이제 폴더 가져오기를 누르고 옆에 메뉴에서 의존성을 눌러보자.  
아래처럼 나올 것이다.  
메인의존성은 우리가 참고하는 메인모듈을 말하는 것이다.  
개발의존성은 배포시가 아닌 개발시에만 쓰이는 모듈같은 것을 말하는 것이다.

여기에 vuex를 설치하자. 우측상단을 보면 의존성 설치 버튼이 있다.

![](.gitbook/assets/image%20%2812%29.png)

vuex를 검색하고 설치하자.

![](.gitbook/assets/image%20%284%29.png)



