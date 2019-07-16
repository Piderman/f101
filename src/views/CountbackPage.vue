<template>
<div class="p-4">
  <h2 class="text-2xl">Positions</h2>
  <table>
    <tr>
      <th class="text-left">Driver</th>
      <th v-for="(header, index) in positionHeader"
        :key="index"
        v-text="header.label"
      />
    </tr>

    <tr v-for="(entry, index) in positionData"
      :key="index"
    >
      <td v-for="(value, index) in entry"
        :key="index"
        v-text="value"
      />
    </tr>
  </table>


  <h2 class="text-2xl">Misc</h2>
  <table>
    <tr>
      <th class="text-left">Driver</th>
      <th v-for="(header, index) in miscHeader"
        :key="index"
        v-text="header.label"
      />
    </tr>

    <tr v-for="(entry, index) in miscData"
      :key="index"
    >
      <td v-for="(value, index) in entry"
        :key="index"
        v-text="value"
      />
    </tr>
  </table>


  <h2 class="text-2xl">Definitions</h2>
  <h3 class="text-lg font-bold">Combined Points</h3>
  <p>The sum of <em>feature points</em> and <em>sprints points</em></p>

  <h3 class="text-lg font-bold mt-4">Feature Points</h3>
  <p>Awarded for feature race positions including <em>bonuses</em> from pole and fastest lap</p>

  <h3 class="text-lg font-bold mt-4">Spint Points</h3>
  <p>Awarded for sprint race positions</p>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "driver-page",
  computed: {
    ...mapGetters({
      players: "Drivers/players",
    }),
    positionHeader() {
      const positionKeys = Array.from({length: 16}, (val, index) => {
        return {
          lookup: index + 1,
          label: index + 1
        }
      });

      positionKeys.push({
        lookup: 'dnf',
        label: "DNF's"
      });

      return positionKeys;
    },
    positionData() {
      if (!this.players.length) {
        console.log('data not loaded');
        return [];
      }

      return this.players.map(player => {
        return [player.name].concat(this.positionHeader.map(position => {
          return player.countbackData.featurePositions[position.lookup] || 0
        }));
      });
    },

    miscHeader() {
      return [
        {
          lookup: 'points',
          label: 'Combined Points'
        },
        {
          lookup: 'featurePoints',
          label: 'Feature Points'
        },
        {
          lookup: 'sprintPoints',
          label: 'Sprint Points'
        },
        {
          lookup: 'poleCount',
          label: 'Pole Positions'
        },
        {
          lookup: 'fastLapCount',
          label: 'Fastest Laps'
        },
        {
          lookup: 'podiums',
          label: 'Podiums'
        }
      ]
    },

    miscData() {
      if (!this.players.length) {
        console.log('data not loaded');
        return [];
      }

      return this.players.map(player => {
        return [player.name].concat(this.miscHeader.map(misc => {
          return player.countbackData[misc.lookup] || 0;
        }));
      })
    },
  }
};
</script>

</script>

<style>

</style>
