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
      type: Array
    },
    selected: {
      type: String
    }
  },
  computed: {
    selData() {
      var filtered = this.devData.filter(d => {
        if (d["DevType"] == this.selected) return  d;
      }),
      mapped = filtered.map((d) => {
          let { CompFreq, ConvertedComp, Country } = d,
            m = 1;
            
          if (CompFreq == "Weekly") m = 52;
          else if (CompFreq == "Monthly") m = 12;
          
          let Salary = parseInt(ConvertedComp * m);
          return {
            Salary,
            Country,
          };
      });
      mapped.sort(function(x, y) {
        return d3.descending(
          +x["Salary"],
          +y["Salary"]
        );
      });
      console.log(mapped)
      return mapped;
    }
  },
  watch: {
    selected() {
    var t = this,
        chart = c3.generate({
          data: {
            color: () => {
              return "#d1f60a";
            },
            json: t.selData,
            type: "bar",
            keys: {
              x: "Country",
              value: ["Salary"]
            },
            labels: {
              format: function(v) {
                var dollars = d3.format("$.2s");
                return dollars(v).toUpperCase();
              }
            }
          },
          axis: {
            x: {
              type: "category",
              tick: {
                width: 50,
                multiline: true
              }
            },
            y: {
              show: false,
              tick: {
                show: false,
                count: 1,
                format: function(v) {
                  var dollars = d3.format("$.2s");
                  return v > 0 ? dollars(v).toUpperCase() : 0;
                }
              }
            },
            rotated: true
          },
          bar: {
            width: {
              ratio: 0.75
            }
          },
          grid: {
            y: {
              show: true
            }
          },
          legend: {
            show: false
          },
          padding: {
            left: 75
          },
          size: {
            height: (t.selData.length * 10 - (t.selData.length - 1) * 4) * 10
          },
          tooltip: {
           show: false
          },
          onresize: function() {
            chart.flush();
          }
        });
    }
  }
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
    font-family: 'Bebas Neue';
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
