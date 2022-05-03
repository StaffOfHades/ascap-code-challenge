import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { defineComponent, ref } from 'vue';

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
      type: Array,
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
