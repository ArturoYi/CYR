<template>
  <div class="test">
    <div
      v-for="(items, name) in child"
      :key="name"
      @click="test(name)"
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
        { name: "1", about: "", link: "" },
        { name: "2", about: "", link: "" },
        { name: "3", about: "", link: "" },
      ],
    };
  },
  methods: {
    test(e) {
      // location.href =
      //   'http://localhost:9779/web/TypeScript/02.%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E.html#var%E5%A3%B0%E6%98%8E'
      console.log(e);
      var domain = document.domain;
      console.log(`https://${domain}`)
    },
  },
};
</script><style>
.test {
  /* margin: 50px; */
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