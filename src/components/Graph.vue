<template>
  <section>
    <div id="chart"></div>
  </section>
</template>

<script>
import * as d3 from "d3";
import c3 from "c3";
import "c3/c3.min.css";

export default {
  props: {
    devData: {
      type: Array,
    },
    selected: {
      type: String,
    },
  },
  computed: {
    selData() {
      let data = [];

      this.devData.forEach((d) => {
        /* only get rows with selected job type */
        if (d["DevType"].includes(this.selected) || this.selected == "Any") {
          let { ConvertedComp, Country } = d;
          /* Find existing object in data by country and add salary to sum and 1 to count.
              If it doesn't exist create a new object for that country. */
          let salary = parseInt(ConvertedComp),
            index = data.findIndex((r) => r.country == Country);
          if (index == -1)
            data.push({
              country: Country,
              sum: salary,
              average: salary,
              count: 1,
            });
          else {
            data[index]["sum"] += salary;
            data[index]["count"] += 1;
            data[index]["average"] = data[index]["sum"] / data[index]["count"];
          }
        }
      });

      data = data
        .filter((d) => d["count"] > 4)
        .sort(function(x, y) {
          return d3.descending(+x["average"], +y["average"]);
        })
        .slice(0, 10);
      console.log(data);
      return data;
    },
  },
  methods: {
    drawChart() {
      var t = this,
        chart = c3.generate({
          data: {
            color: () => {
              return "#d1f60a";
            },
            json: t.selData,
            type: "bar",
            keys: {
              x: "country",
              value: ["average"],
            },
            labels: {
              format: function(v) {
                var dollars = d3.format("$.2s");
                return dollars(v).toUpperCase();
              },
            },
          },
          axis: {
            x: {
              type: "category",
              tick: {
                width: 50,
                multiline: true,
              },
            },
            y: {
              show: false,
              tick: {
                show: false,
                count: 1,
                format: function(v) {
                  var dollars = d3.format("$.2s");
                  return v > 0 ? dollars(v).toUpperCase() : 0;
                },
              },
            },
            rotated: true,
          },
          bar: {
            width: {
              ratio: 0.75,
            },
          },
          grid: {
            y: {
              show: true,
            },
          },
          legend: {
            show: false,
          },
          padding: {
            left: 75,
          },
          size: {
            height: (t.selData.length * 10 - (t.selData.length - 1) * 4) * 10,
          },
          tooltip: {
            show: false,
          },
          onresize: function() {
            chart.flush();
          },
        });
    },
  },
  watch: {
    selected() {
      this.drawChart();
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style lang="scss">
#chart {
  svg {
    max-width: 100%;
    overflow: visible !important;
    pointer-events: none;
  }
  text {
    font-size: 13px;
    fill: #000 !important;
    font-family: "Bebas Neue";
    @media screen and (max-width: 800px) {
      font-size: 12px;
    }
    @media screen and (max-width: 600px) {
      font-size: 11px;
    }
  }
  g.tick:last-child line {
    fill: #000 !important;
  }
}
</style>
