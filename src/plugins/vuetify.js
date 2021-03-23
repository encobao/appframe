import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#1988E6',
            secondary: colors.green.darken2,
          },
          dark: {
            primary: colors.blue.darken3,
            secondary: colors.blue.darken3,
          },
        },
    },
});
