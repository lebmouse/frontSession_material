---
description: 수정 기능 추가
---

# Todo List 4

이제 기본적인 기능인 추가 삭제는 구현을 했다. 이제 몇 가지 기능을 추가하자.  


## 수정하기

수정하기 기능을 만들었는데 생각보다 좀 복잡한거 같다. 코드보고 이해안가면 걍 넘어가자.

{% embed url="https://codepen.io/lebmouse/pen/ewgQdQ" %}

두 가지 수정사항이 생겼다.

1. span -&gt; input
2. 수정버튼 추가.

### template

{% code-tabs %}
{% code-tabs-item title="App.vue" %}
```markup
<div id="app">
  <header>Todo List</header>
  <section class="input">
    <input type="text" v-model="value" @keyup.enter="addItem">
    <button @click="addItem">제출</button>
  </section>
  <section>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <!--
         수정을 할 수 있게 span -> input으로 바꾼다.
         value를 v-for에서 얻은 data와 바인딩하기 위해 v-bind의 약어를 쓴다. :value="item"
         읽기전용으로 하기 위해 readonly를 추가한다.
        ref는 refernce의 약자로 vue에서 참조하기 쉽게 쓰는 속성이다. 
         -->
        <input class="item" ref="item" readonly type="text" :value="item">
        <!-- 수정을 하기 위해 버튼을 추가하자. -->
        <button ref="modifyBtn" @click="modifyItem(index)">수정</button>
        <button @click="removeItem(index)">제거</button>
      </li>
    </ul>
  </section>
</div>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### script

```javascript
export default {
  name: "app",
  data() {
    return {
      value: "",
      valueToModify: "",
      // 이전의 클릭된 아이템을 기록하기 위한 변수
      prevModifiedItem: null,
      // 현재 클릭된 아이템을 기록하기 위한 변수
      presentModifiedItem: null,
      list: todoStorage.fetch()
    };
  },
  watch: {
    list: function(todos) {
      console.log("리스트변경");
      todoStorage.save(todos);
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
    },
    // 아이템을 수정하기 위한 함수
    // 코드가 정리가 안되서 좀 더럽다.
    // 이해안되면 걍 복사하자.
    // 복사 잘하는 것도 실력임.
    modifyItem(index) {
    // 이전에 눌렀던 아이템을 인덱스를 가져온다.
      let prev = this.prevModifiedItem;
      // 널이 아니고 값이 있다면 버튼을 되돌린다.
      if (prev !== null) {
        let item = this.$refs["item"][prev];
        let modifyBtn = this.$refs["modifyBtn"][prev];
        item.setAttribute("readonly", "readonly");
        modifyBtn.innerText = "수정";
      }
      // 이전의 값과 현재 누른 인덱스와 값이 같다면
      // 글자를 수정한다.
      if (this.prevModifiedItem === index) {
        let item = this.$refs["item"][index];
        let modifyBtn = this.$refs["modifyBtn"][index];
        item.setAttribute("readonly", "readonly");
        modifyBtn.innerText = "수정";
        this.list.splice(index, 1, item.value);
        console.log("수정완료");
        this.prevModifiedItem = null;
      } else {
        let item = this.$refs["item"][index];
        let modifyBtn = this.$refs["modifyBtn"][index];
        item.removeAttribute("readonly");
        modifyBtn.innerText = "완료";
        this.presentModifiedItem = index;
        this.prevModifiedItem = index;
      }
    }
  }
};
```

### style

```css
#app {
  width: 70%;
  min-height: 400px;
  text-align: center;
  background-color: beige;
  margin: auto;
}
ul {
  list-style: none;
}
li {
  width: 95%;
  background-color: rgba(255, 228, 196, 0.842);
  margin: 5px;
  display: flex;
}
.item {
  flex-grow: 1;
  text-align: center;
  border: none;
  background-color: none;
}
.item:focus {
  outline: none;
}
.item:read-only {
  background-color: blanchedalmond;
}
```

