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
</script>

<template>
  <main :class="$style.content">
    <h1 :class="$style.title">Membership</h1>
    <h4 :class="$style.subtitle">Select your membership type below:</h4>
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
  </main>
</template>

<style module lang="scss">
  .cards {
    column-gap: 1.25rem;
    display: flex;
    flex-direction: row;
  }

  .content {
    margin: 1rem auto;
    max-width: 1080px;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0;
  }
</style>
