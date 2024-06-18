<template>
    <div class="text">
      © {{ yearText }} {{ companyName }}. All rights reserved.
    </div>
  </template>
  
  <script>
  export default {
    name: 'Copyrights',
    data() {
      return {
        companyName: 'rico franjes',
        startYear: 2020,
        currentYear: new Date().getFullYear()
      };
    },
    computed: {
      yearText() {
        return this.startYear === this.currentYear
          ? this.startYear.toString()
          : `${this.startYear} - ${this.currentYear}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .text {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: small;
  }
  </style>
  