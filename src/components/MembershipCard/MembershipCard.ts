import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { defineComponent } from 'vue';

import type { PropType } from 'vue';

export default defineComponent({
  props: {
    description: {
      required: true,
      type: String,
    },
    fee: {
      required: true,
      type: [Number, String],
    },
    icon: {
      required: true,
      type: String,
    },
    requirements: {
      required: true,
      type: Array as PropType<Array<string>>,
    },
    selected: {
      default: false,
      type: Boolean,
    },
    title: {
      required: true,
      type: String,
    },
  },
  components: { FontAwesomeIcon },
});
