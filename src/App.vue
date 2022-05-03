<script setup lang="ts">
  import { MembershipCard } from './components/MembershipCard/';
  import { ref } from 'vue';

  interface Card {
    description: string;
    fee: number;
    icon: string;
    title: string;
    requirements: Array<string>;
  }

  const selectedCard = ref<null | string>(null);

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

  const submit = () => {
    console.log('Submit');
  };
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
          :disabled="selectedCard !== null && selectedCard !== card.title"
          :fee="card.fee"
          :icon="card.icon"
          :requirements="card.requirements"
          :selected="selectedCard === card.title"
          :title="card.title"
          @click="selectedCard = card.title"
        />
      </div>
      <footer>
        <p :class="$style.small">
          <span>*If you are under 18 years of age please </span>
          <a href="#">read more about how to join ASCAP.</a>
        </p>
        <p :class="$style.small">
          <span>
            ASCAP uses TINCheck and SmartyStreets to verify certain information
            provided by you in connection with your application. Any information
            processed by TINCheck and SmartyStreets shall be subject to the
            privacy policies of
            <a href="https://www.tincheck.com/pages/tincheck-agreement"
              >TINCheck</a
            ><span> and </span
            ><a
              href="
          https://smartystreets.com/legal/privacy-policy"
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
    </form>
  </main>
</template>

<style module lang="scss">
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
    column-gap: 1.25rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 2.5rem;
  }

  .content {
    margin: 1rem auto;
    max-width: 1080px;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 2.5em;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0;
  }

  p.small {
    font-size: 0.8em;
    font-weight: 500;
  }
</style>
