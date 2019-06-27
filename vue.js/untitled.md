# 프론트 1

{% tabs %}
{% tab title="vue craete" %}
일단 vue create '\(프로젝트 이름\)'으로 vue를 만들자.  
나는 'vue create vuestagram'이라고 했다.
{% endtab %}

{% tab title="설정하기" %}
설정할 때 맘대로 해도 된다. 어차피 나중에 수정할 수 있다.  
내 설정은 아래있다.

```bash
Vue CLI v3.8.2
┌───────────────────────────┐
│  Update available: 3.8.4  │
└───────────────────────────┘
? Please pick a preset: 
  default (babel, eslint) 
❯ Manually select features 

? Check the features needed for your project: 
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◉ CSS Pre-processors // 23번째 설정을 위한 기능임 
❯◯ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
 
 ? Use history mode for router? (Requires proper server setup 
 for index fallback in production) (Y/n) n
 
 // css 전처리기(pre-processor)가 있으면 css를 편하게 작성할 수 있다.
 ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): 
  Sass/SCSS (with dart-sass) 
❯ Sass/SCSS (with node-sass) 
  Less 
  Stylus 
```
{% endtab %}

{% tab title="서버실행" %}
npm run serve로 제대로 작동하는 지 확인하자.

![](../.gitbook/assets/image%20%2825%29.png)
{% endtab %}

{% tab title="앱 대락젹인 설" %}
일단 홈 페이지 부터 설계하자. 이건 개발자 도구로 사이즈 맞추고 새로고침하면 모바일페이지로 로드된다. 

![&#xD648;&#xD398;&#xC774;&#xC9C0;](../.gitbook/assets/image%20%285%29.png)

Home 부터 보자. 아래처럼 구성하면 될듯하다.

* TopNav
* FeedList
* BottomNav

![&#xAC80;&#xC0C9;&#xD398;&#xC774;&#xC9C0;](../.gitbook/assets/image%20%2816%29.png)

여기도 Bottom Navigation이 있다.

![&#xD504;&#xB85C;&#xD544;&#xD398;&#xC774;](../.gitbook/assets/image%20%2833%29.png)

일단 App.vue 코드를 이렇게 만들고 싶다. 그리고 자주보이는 저 bottom navigatoin을 만들자.

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```markup
<template>
  <div id="app">
    <div id="nav">
      <router-view/>
      <!-- bottomNav -->
    </div>
  </div>
</template>

<style lang="scss">
</style>

```
{% endcode-tabs-item %}
{% endcode-tabs %}
{% endtab %}
{% endtabs %}

