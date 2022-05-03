import { computed, defineComponent } from 'vue';
import { kebabCase } from 'lodash';

export default defineComponent({
  props: {
    icon: {
      required: true,
      type: String,
    },
    pack: {
      default: 'fas',
      type: String,
    },
    size: {
      default: 'md',
      type: String,
      validator: size =>
        ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(size),
    },
  },
  setup(props) {
    const iconClass = computed(() =>
      `${props.pack} fa-${kebabCase(props.icon)} ${
        props.size !== 'md' ? `fa-${props.size}` : ''
      }`.trim(),
    );

    return {
      iconClass,
    };
  },
});
