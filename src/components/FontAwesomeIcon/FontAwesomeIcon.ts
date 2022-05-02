import { computed, defineComponent } from 'vue';
import { kebabCase } from 'lodash';

export default defineComponent({
  props: {
    icon: {
      required: true,
      type: String,
    },
    iconPack: {
      default: 'fas',
      type: String,
    },
  },
  setup(props) {
    const iconClass = computed(
      () => `${props.iconPack} fa-${kebabCase(props.icon)}`,
    );

    return {
      iconClass,
    };
  },
});
