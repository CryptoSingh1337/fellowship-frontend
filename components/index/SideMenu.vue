<template>
  <v-container>
    <h3 class="mb-4">Filter by -</h3>
    <v-row class="my-2 flex-column" no-gutters>
      <h4 class="my-3">Countries:</h4>
      <v-row justify="center" no-gutters>
        <v-select v-model="country" :items="countries" dense hide-details label="Country" multiple outlined solo/>
      </v-row>
    </v-row>
    <v-divider class="my-2"/>
    <v-row class="flex-column" no-gutters>
      <h4 class="">Degrees:</h4>
      <v-row justify="center" no-gutters>
        <v-col cols="10">
          <v-radio-group v-model="degree">
            <v-radio v-for="(d, idx) in degrees" :key="idx" :label="d.name" :value="d.value" hide-details/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-row>
    <div v-if="degree">
      <v-divider class="my-2"/>
      <v-row class="flex-column" no-gutters>
        <h4 class="my-3">Field of study:</h4>
        <v-row justify="center" no-gutters>
          <v-select v-model="programme" :items="Array.from(options.get(`${degree}`).keys())" dense hide-details
                    label="Field of study" outlined solo/>
        </v-row>
      </v-row>
    </div>
    <div v-if="degree && programme">
      <v-divider class="my-2"/>
      <v-row class="flex-column" no-gutters>
        <h4 class="my-3">Branch:</h4>
        <v-row justify="center" no-gutters>
          <v-select v-model="branch" :items="Array.from(options.get(`${degree}`).get(`${programme}`))" dense
                    hide-details label="Branch" outlined solo/>
        </v-row>
      </v-row>
    </div>
    <v-divider class="my-2"/>
    <v-row class="flex-column" no-gutters>
      <h4 class="my-3">Category:</h4>
      <v-row justify="center" no-gutters>
        <v-select v-model="category" :items="categories" dense hide-details label="Category" multiple outlined solo/>
      </v-row>
    </v-row>
    <v-divider class="my-2"/>
    <v-row class="flex-column" no-gutters>
      <h4 class="my-3">Income:</h4>
      <v-row no-gutters>
        <v-col class="d-flex justify-center align-center my-3" cols="12">
          <span>Min:</span>
          <v-text-field :value="income[0]" class="mt-0 ml-2 pt-0" hide-details single-line style="width: 60px"
                        type="number" @change="$set(income, 0, $event)"/>
        </v-col>
        <v-col class="d-flex justify-center align-center my-3" cols="12">
          <span>Max:</span>
          <v-text-field :value="income[1]" class="mt-0 ml-2 pt-0" hide-details single-line style="width: 60px"
                        type="number" @change="$set(income, 1, $event)"/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-range-slider v-model="income" :max="1500000" :min="20000" class="align-center" hide-details/>
      </v-row>
    </v-row>
    <v-divider class="my-2"/>
    <v-row justify="center" no-gutters>
      <v-col class="d-flex justify-space-between" cols="10">
        <v-btn class="elevation-0" color="gray" outlined tile
               @click.prevent="country = []; degree = null; programme = ''; branch = ''; category = []; income = [20000, 1500000]; $nuxt.$emit('resetPage', 1)">
          Reset
        </v-btn>
        <v-btn class="elevation-0" color="primary" tile @click.prevent="$nuxt.$emit('applyFilter');">Apply</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loader from "@/components/main/Loader.vue";

export default {
  name: "SideMenu",
  components: {
    Loader
  },
  props: {
    countries: Array
  },
  data: () => ({
    country: [],
    degree: null,
    programme: "",
    branch: "",
    category: [],
    degrees: [
      {
        name: "Bachelor",
        value: "BACHELOR"
      },
      {
        name: "Master",
        value: "MASTER"
      },
      {
        name: "Phd",
        value: "PHD"
      }],
    categories: ["GEN", "SC/ST", "OBC", "PWD"],
    income: [20000, 1500000],
    options: new Map()
  }),
  created() {
    this.degrees.forEach(degree => this.options.set(degree.value, new Map()));
    let map = this.options.get("BACHELOR");
    map.set("B.Tech", ["CSE", "ECE", "IT", "ME"]);
    map.set("B.Sc", ["Agriculture", "Bio Technology", "Chemistry", "Physics", "Computer Science"]);
    map = this.options.get("MASTER");
    map.set("MBA", ["HR", "Marketing", "Finance", "Business"]);
    map = this.options.get("PHD");
    map.set("PHD", ["Phd"]);
  },
  watch: {
    country() {
      this.$nuxt.$emit("changeCountry", this.country);
    },
    degree() {
      this.$nuxt.$emit("changeDegree", this.degree);
    },
    programme() {
      this.$nuxt.$emit("changeProgramme", this.programme);
    },
    branch() {
      this.$nuxt.$emit("changeBranch", this.branch);
    },
    category() {
      this.$nuxt.$emit("changeCategory", this.category);
    },
    income() {
      this.$nuxt.$emit("changeIncome", this.income);
    }
  }
}
</script>
<style>
.v-list-item__title {
  text-transform: capitalize;
}

.v-input__slot {
  box-shadow: none !important;
}

.v-menu__content {
  box-shadow: none;
  border-width: thin;
  border-style: solid;
  border-color: rgba(0, 0, 0, .12) !important;
}
</style>
