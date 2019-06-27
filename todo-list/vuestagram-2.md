---
description: todo list 만들
---

# Todo List 1

vue.js를 배울떄 가장 많이 Todo List를 만든다. vue로 인스타그램을 만들기 전에 Todo List로 vue.js를 입문해보자.

### 싱글 파일 컴포넌트

> 공식문서  
> [https://kr.vuejs.org/v2/guide/single-file-components.html](https://kr.vuejs.org/v2/guide/single-file-components.html)

vue.js의 장점은 싱글파일컴포넌트를 제공한다는 것이다. 이것 하나로 vue.js의 난이도가 낮아진다.  
.vue라는 파일 안에 template인 html, &lt;script&gt;안에 js, &lt;style&gt; 안에 css를 쓸 수 있다

### Todo List

좋은 강의가 많지만 그냥 내가 다시 만들어 보겠다. 내 강의가 너무 더럽다 하면 구글에서   
vue todo list 치면 좋은거 많이 나온다.  
아래 주소는 내가 찾은 블로그들이다.

> 강의 추천
>
> * [https://blog.storyg.co/vue-js-posts/todos-tutorial](https://blog.storyg.co/vue-js-posts/todos-tutorial)
> * [https://www.opentutorials.org/module/3859/23234](https://www.opentutorials.org/module/3859/23234)

todo LIst가 무엇인지 궁금하면 아래의 데모페이지

* [http://storyg.co/todos-client/\#/](http://storyg.co/todos-client/#/)
* [https://kr.vuejs.org/v2/examples/todomvc.html](https://kr.vuejs.org/v2/examples/todomvc.html)

![](../.gitbook/assets/image%20%2811%29.png)

일단 기본적인 틀만 잡아보자. 

기존의 App.vue를 수정하자.

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```jsx
<template>
  <div id="app">
    <header>
      Todo List
    </header>
    <section class="input">
      <input type="text" name="" id="">
      <input type="button" value="제출">
    </section>
    <section>
      <ol>
        <li>
          리스트
        </li>
      </ol>
    </section>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
</style>

```
{% endcode-tabs-item %}
{% endcode-tabs %}

아래처럼 나오면 성공이다. 이제 우리의 목표는 여기다 텍스트를 입력해서 리스트를 반응적으로 추가하고 제거하게 끔해보자.

