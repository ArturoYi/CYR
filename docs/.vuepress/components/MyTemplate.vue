<template>
  <div class="test">
    <div
      v-for="(items, name) in child"
      :key="name"
      @click="test(items.link)"
      class="childs"
    >
      <div class="name">《{{ items.name }}》</div>
      <div class="about">介绍</div>
    </div>
  </div>
</template><script>
export default {
  name: "MyTemplate",
  data() {
    return {
      child: [
        {
          name: "Flutter实战",
          about: "",
          link: "/actualCombat/Flutter工程实战/01.起步.md/",
        },
        { name: "web前端工程化", about: "", link: "/actualCombat/web前端工程化/01.介紹.md/" },
        { name: "3", about: "", link: "" },
      ],
    };
  },
  created(){
    console.log('1')
  },
  methods: {
    test(e) {
      if (e) {
        window.location.href = e;
      }
    },
  },
};
</script><style>
.anchor-down {
  display: none;
}
.test {
  height: 100%;
  margin-top: 50px;
  padding-bottom: 550px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 10px 10px;
  max-width: 920px;
  /* grid-auto-rows: 50px; */
}

.childs {
  z-index: 999;
  height: 120px;
  border-radius: 10px;
  transition: all 1s;
  cursor: pointer;
  text-align: center;
}
.childs:hover {
  /* background-color: rgb(116, 146, 135); */
  background-image: linear-gradient(
    to bottom right,
    #888baa,
    rgb(116, 146, 135)
  );
}
.name {
  padding-left: 15px;
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
  text-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
}
.about {
  padding: 10px;
  font-size: 16px;
  overflow: hidden;
}
</style>