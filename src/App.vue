<script setup lang="ts">
  import { MembershipCard } from './components/MembershipCard';
  import { ref } from 'vue';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';

  interface Card {
    description: string;
    fee: number;
    icon: string;
    title: string;
    requirements: Array<string>;
  }

  const memberIsPublisher = (memberType: string) =>
    ['Writer & Publisher', 'Publisher'].includes(memberType);

  const validationSchema = yup.object({
    membershipType: yup
      .string()
      .required('Please select your membership type.'),
    publisherType: yup.string().test({
      exclusive: true,
      message: 'Please select your publisher company type.',
      name: 'publisherType',
      test: (value, { parent }) =>
        memberIsPublisher(parent.membershipType)
          ? !!value && value !== 'Publisher Company Type'
          : true,
    }),
  });

  const successMessage = ref<string | null>(null);

  const { handleSubmit } = useForm({
    initialValues: {
      membershipType: '',
      publisherType: 'Publisher Company Type',
    },
    validationSchema,
  });

  const { errorMessage: membershipTypeError, value: membershipType } =
    useField<string>('membershipType');
  const {
    errorMessage: publisherTypeError,
    resetField: publisherTypeReset,
    value: publisherType,
  } = useField<string>('publisherType');

  const requirements = [
    'Legal Name',
    'Mailing Address',
    'Valid Email Address',
    'SSN/ITIN',
    'Must be 18 or older to apply online*',
  ];

  const cards: Array<Card> = [
    {
      description:
        'ASCAP royalties are split evenly between Writers and Publishers. Join as both to ensure you get paid everything you deserve.',
      fee: 100,
      icon: 'icons',
      title: 'Writer & Publisher',
      requirements,
    },
    {
      description:
        'A Writer is someone who creates a musical composition: the melody, harmony, lyrics, arrangements, beats, etc.',
      fee: 50,
      icon: 'music',
      title: 'Writer',
      requirements,
    },
    {
      description:
        'A Publisher is a person or company that handles the business side of music. Publishers may control the copyrights of a musical composition, licensing, etc.',
      fee: 50,
      icon: 'briefcase',
      title: 'Publisher',
      requirements,
    },
  ];

  const setMembershipType = (type: string) => {
    membershipType.value = type;
    successMessage.value = null;
    publisherTypeReset();
  };
  const setPublisherType = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    publisherType.value = select.value;
    successMessage.value = null;
    select.blur();
  };

  const submit = handleSubmit(
    values => {
      let messages = [
        'Success!',
        `A member type of "${values.membershipType}" was selected.`,
      ];
      if (memberIsPublisher(values.membershipType)) {
        messages.push(
          `Since you are a publisher, you have declared its of type "${values.publisherType}".`,
        );
      }
      successMessage.value = messages.join(' ');
    },
    ({ errors }) => {
      console.error(errors);
    },
  );
</script>

<template>
  <main :class="$style.content">
    <h1 :class="$style.title">Membership</h1>
    <h4 :class="$style.subtitle">Select your membership type below:</h4>
    <form @submit.prevent="submit">
      <div :class="$style.cards">
        <membership-card
          v-for="card in cards"
          :key="card.title"
          :description="card.description"
          :disabled="!!membershipType && membershipType !== card.title"
          :error="!!membershipTypeError"
          :fee="card.fee"
          :icon="card.icon"
          :requirements="card.requirements"
          :selected="membershipType === card.title"
          :title="card.title"
          @click="setMembershipType(card.title)"
        />
      </div>
      <p v-if="membershipTypeError" :class="$style.error">
        {{ membershipTypeError }}
      </p>
      <p :class="$style.small">
        <span>*If you are under 18 years of age please </span>
        <a href="#">read more about how to join ASCAP.</a>
      </p>
      <div :class="$style.field" v-if="memberIsPublisher(membershipType)">
        <label for="publisherType" :class="$style.label"
          >Publisher Company Type</label
        >
        <label :class="$style.small"
          >Please select the federal tax classification of your publisher
          company.</label
        >
        <div
          :class="{
            [$style.select]: true,
            [$style.error]: publisherTypeError,
          }"
        >
          <select
            name="publisherType"
            id="publisherType"
            :class="{
              [$style.placeholder]: publisherType === 'Publisher Company Type',
            }"
            :value="publisherType"
            @change="setPublisherType"
          >
            <option disabled hidden>Publisher Company Type</option>
            <option>Individual / Sole proprietor or Single-member LLC</option>
            <option>C Corporation</option>
            <option>S Corporation</option>
            <option>LLC - C Corporation</option>
            <option>LLC - S Corporation</option>
            <option>LLC - Partnership</option>
            <option>Partnership</option>
            <option>Trust / Estate</option>
            <option>OTHER</option>
          </select>
        </div>
        <p v-if="publisherTypeError" :class="$style.error">
          {{ publisherTypeError }}
        </p>
      </div>
      <footer>
        <p :class="$style.small">
          <span>
            ASCAP uses TINCheck and SmartyStreets to verify certain information
            provided by you in connection with your application. Any information
            processed by TINCheck and SmartyStreets shall be subject to the
            privacy policies of
            <a
              href="https://www.tincheck.com/pages/tincheck-agreement"
              rel="noopener noreferrer"
              target="_blank"
              >TINCheck</a
            ><span> and </span
            ><a
              href="
          https://smartystreets.com/legal/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
              >SmartyStreets.</a
            >
          </span>
        </p>
        <div :class="$style.buttons">
          <a href="https://www.ascap.com/" :class="$style.button">Cancel</a>
          <button
            type="submit"
            :class="{ [$style.button]: true, [$style.primary]: true }"
          >
            Continue
          </button>
        </div>
      </footer>
      <p v-if="successMessage !== null" :class="$style.success">
        {{ successMessage }}
      </p>
    </form>
  </main>
</template>

<style module lang="scss">
  $breakpoint-lg: 992px;
  $breakpoint-md: 768px;
  $breakpoint-sm: 576px;
  $breakpoint-xl: 1200px;
  $breakpoint-xs: 0;

  .button {
    background-color: var(--white);
    border: 1px solid var(--gray);
    color: var(--gray-dark);
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    padding: 0.75em 1.25em;
    text-decoration: none;
    text-transform: uppercase;
    transition-duration: 0.25s;
    transition-property: border-color, background-color;
    transition-timing-function: ease-in-out;

    &:active,
    &:focus {
      border-color: rgb(var(--blue-rgb) / 50%);
    }

    &:active,
    &:hover {
      background-color: rgb(var(--gray-rgb) / 10%);
    }

    &.primary {
      background-color: var(--primary);
      border-color: rgb(var(--blue-rgb) / 50%);
      color: var(--white);
      padding: 0.75em 2.5em;

      &:active,
      &:focus {
        border-color: var(--white);
      }

      &:active,
      &:hover {
        background-color: rgb(var(--blue-rgb) / 75%);
      }
    }
  }

  .buttons {
    column-gap: 1.25rem;
    display: flex;
    place-content: flex-start;
  }

  .cards {
    gap: 1.25rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 2.5rem;
  }

  .content {
    margin: 1rem auto;
  }

  @media (min-width: $breakpoint-xl) {
    .content {
      max-width: 1080px;
    }
  }

  @media (max-width: $breakpoint-xl - 1px) and (min-width: $breakpoint-lg) {
    .content {
      max-width: 1080px;
      padding: 0 1.5rem;
    }
  }

  @media (max-width: $breakpoint-lg - 1px) {
    .content {
      margin-bottom: 1.5rem;
      max-width: $breakpoint-sm;
      padding: 0 1.5rem;
    }

    .cards {
      flex-flow: column wrap;
    }
  }

  p.error {
    color: var(--danger);
  }

  .field {
    display: flex;
    flex-direction: column;
    margin: 2.5rem 0;
    place-items: flex-start;
    row-gap: 0.25rem;

    .error {
      margin-top: 0.25em;
    }
  }

  .label {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .select {
    display: inline-block;
    background-color: var(--white);
    border: 1px solid var(--gray);
    cursor: pointer;
    padding: 0.25em 1em;
    margin-top: 1em;

    &:hover {
      background-color: rgb(var(--gray-rgb) / 5%);
    }

    &:focus-within {
      border-color: rgb(var(--blue-rgb) / 50%);
    }

    &.error {
      border-color: rgb(var(--red-rgb) / 75%);
    }

    select {
      background: none;
      border: none;
      cursor: inherit;

      &.placeholder {
        color: rgb(var(--gray-dark-rgb) / 75%);
      }
    }
  }

  .small {
    font-size: 0.8em;
    font-weight: 500;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 2.5em;
  }

  .success {
    color: var(--success);
    font-size: 0.95em;
    font-weight: 600;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0;
  }
</style>
