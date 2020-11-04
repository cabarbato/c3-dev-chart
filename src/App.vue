<template>
  <main>
    <header>
      <div class="row">
        <div class="col-md-8 mx-auto text-center">
          <h1>c3.js Developer Survey Chart</h1>
          <p>
            This tool uses data from the Public 2020 Stack Overflow Developer
            Survey to show average salaries for different tech jobs, by country.
          </p>
        </div>
      </div>
    </header>
    <div v-if="loaded">
      <AppSelect :devData="devData" @changejob="selected = $event" />
      <AppGraph :devData="devData" :selected="selected" />
    </div>
  </main>
</template>

<script>
import AppSelect from "./components/Select.vue";
import AppGraph from "./components/Graph.vue";
import csvData from "./assets/data/data.csv";

export default {
  data: function() {
    return {
      devData: [],
      selected: "Any",
      loaded: false,
    };
  },
  components: {
    AppSelect: AppSelect,
    AppGraph: AppGraph,
  },
  beforeMount() {
    let data = [];
    this.devData = csvData.map((row, i) => {
      if (!i) return;
      else {
        data.push({});
        row.forEach((col, index) => {
          data[i - 1][csvData[0][index]] = row[index];
        });
      }
    });
    this.devData = data;
    this.loaded = true;
  },
};
</script>

<style lang="scss">
html,
body {
  font-size: 15px;
  color: #04005e;
}
main {
  margin: 3rem auto;
  max-width: 800px;
  font-family: "Montserrat", sans-serif;
  @media screen and (max-width: 800px) {
    margin: 0 2.5rem 3rem;
  }
  header {
    h1 {
      font-family: "Bebas Neue", cursive;
      color: #fe53bb;
      font-size: 3rem;
    }
    p {
      font-size: 1.25rem;
    }
  }
}
</style>
