<script setup lang="ts">
import DashboardDateRangePicker from "~/components/dashboard/DateRangePicker.vue";

const route = useRoute();
</script>

<template>
  <div class="lg:space-y-16 md:space-y-10 space-y-6">
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <UiCard class="shadow-md rounded-3xl">
        <UiCardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <UiCardTitle class="text-sm font-medium"> Branches </UiCardTitle>
          <Icon
            name="material-symbols:home"
            size="18"
            class="text-muted-foreground"
          ></Icon>
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+5</div>
          <p class="text-xs text-muted-foreground">+10.1% from last month</p>
        </UiCardContent>
      </UiCard>
      <UiCard class="shadow-md rounded-3xl">
        <UiCardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <UiCardTitle class="text-sm font-medium"> Employees </UiCardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+10</div>
          <p class="text-xs text-muted-foreground">+19% from last month</p>
        </UiCardContent>
      </UiCard>
      <UiCard class="shadow-md rounded-3xl">
        <UiCardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <UiCardTitle class="text-sm font-medium"> Transactions </UiCardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+100,000 Br</div>
          <p class="text-xs text-muted-foreground">+40.1% from last month</p>
        </UiCardContent>
      </UiCard>
      <UiCard class="shadow-md rounded-3xl">
        <UiCardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <UiCardTitle class="text-sm font-medium"> Deposits </UiCardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+1000,000 Br</div>
          <p class="text-xs text-muted-foreground">+21 since last hour</p>
        </UiCardContent>
      </UiCard>
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
      <UiCard class="col-span-4 shadow-md rounded-xl">
        <UiCardHeader>
          <UiCardTitle>Overview</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="pl-2">
          <DashboardOverview />
        </UiCardContent>
      </UiCard>
      <UiCard class="col-span-3 shadow-md rounded-xl">
        <UiCardHeader>
          <UiCardTitle>Recent Sales</UiCardTitle>
          <UiCardDescription> You got 100 sales this month. </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <DashboardRecentSales />
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
