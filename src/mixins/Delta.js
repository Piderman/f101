export default {
  methods: {
    getDeltaStyles(before, after) {
      const delta = before - after;
      const movement = Math.abs(delta);
      const icon = "chevron";

      if (delta == 0) {
        return {
          delta,
          icon: {
            name: "minus"
          }
        };
      }

      if (delta > 1) {
        return {
          delta,
          movement,
          icon: {
            class: "text-green-600",
            name: `${icon}-up`
          }
        };
      }

      return {
        delta,
        movement,
        icon: {
          class: "text-red-600",
          name: `${icon}-down`
        }
      };
    }
  }
};
