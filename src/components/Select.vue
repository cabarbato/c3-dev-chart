<template>
  <nav>
    <div class="row">
      <div class="col-md-12">
        <label>Select an Occupation:</label>
      </div>
      <div class="col-md-12">
        <select data-live-search="false" v-model="selected">
          <option v-for="option in options" :key="option">{{ option }}</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
import * as d3 from "d3";
import * as $ from "jquery";
import "bootstrap-select";
import "bootstrap-select/dist/css/bootstrap-select.css";

export default {
  data() {
    return {
      selected: "Developer, full-stack",
    };
  },
  props: {
    devData: {
      type: Array,
    },
  },
  computed: {
    options() {
      var unique = [
        ...new Set(this.devData.map((item) => item.DevType.split(";")[0])),
      ];
      return unique.sort(d3.ascending);
    },
  },
  watch: {
    selected() {
      this.$emit("changejob", this.selected);
    },
  },
  mounted() {
    $("select").selectpicker("val", this.selected);
  },
};
</script>

<style lang="scss">
nav {
  margin: 3rem auto;

  label {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }
  .bootstrap-select:not([class*="col-"]):not([class*="form-control"]):not(.input-group-btn) {
    width: 100%;
    position: relative;
    .dropdown-toggle {
      border-radius: 0;
      border-color: #04005e;
      background-color: #04005e;
      color: #fff;
      &:focus {
        outline: none !important;
      }
    }
    .dropdown-menu {
      border: none;
      border-radius: 0;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
      @media screen and (min-width: 768px) {
        width: 225px !important;
      }
      @media screen and (max-width: 768px) {
        width: calc(100vw - 160px) !important;
      }
      li {
        display: block;
        border-bottom: 1px solid #f1f1f1;
        margin: 0 .25rem;
        span {
          max-width: calc(100% + 10px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      li:before {
        content: none;
      }
    }
  }
}
</style>
