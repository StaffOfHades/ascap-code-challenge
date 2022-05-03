<template>
  <article :class="{ [$style.card]: true, [$style.selected]: selected }">
    <h2>
      <font-awesome-icon :icon="icon" size="lg" /><span>{{ title }}</span>
    </h2>
    <div>
      <p>
        {{ description }}
      </p>
      <p>
        <strong :class="$style.fee">${{ fee }} APPLICATION FEE</strong>
        <br />
        <span>non-refundable</span>
      </p>
      <strong>Requirements</strong>
      <ul>
        <li v-for="requirement in requirements" :key="requirement">
          <span>{{ requirement }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>
<script lang="ts" src="./MembershipCard.ts" />
<style module lang="scss" src="./MembershipCard.module.scss" />
