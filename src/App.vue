<template>
  <div id="app">
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fill-transparent {
  fill: transparent;
}

.stroke-0 {
  stroke-width: 0;
}

.stroke-2 {
  stroke-width: 2px;
}

.border-team-1 {
  border-color: #00d2be;
}
.border-team-2 {
  border-color: #1e41ff;
}
.border-team-3 {
  border-color: #dc0000;
}
.border-team-4 {
  border-color: #ffa300;
}
.border-team-5 {
  border-color: #ff8700;
}
.border-team-6 {
  border-color: #f596c8;
}
.border-team-7 {
  border-color: #29adff;
}
.border-team-8 {
  border-color: #aa8e51;
}

.bg-team-1 {
  background-color: #00d2be;
}
.bg-team-2 {
  background-color: #1e41ff;
}
.bg-team-3 {
  background-color: #dc0000;
}
.bg-team-4 {
  background-color: #ffa300;
}
.bg-team-5 {
  background-color: #ff8700;
}
.bg-team-6 {
  background-color: #f596c8;
}
.bg-team-7 {
  background-color: #29adff;
}
.bg-team-8 {
  background-color: #aa8e51;
}

.text-team-1 {
  color: #00d2be;
}
.text-team-2 {
  color: #1e41ff;
}
.text-team-3 {
  color: #dc0000;
}
.text-team-4 {
  color: #ffa300;
}
.text-team-5 {
  color: #ff8700;
}
.text-team-6 {
  color: #f596c8;
}
.text-team-7 {
  color: #29adff;
}
.text-team-8 {
  color: #aa8e51;
}
</style>
