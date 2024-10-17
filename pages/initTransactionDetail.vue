<script lang="ts" setup>
import { useRoute } from "vue-router";
import { Icons } from "@/components/icons.jsx";

const route = useRoute();
const paymentResponse = route.query;
const showFullAccountId = ref(false);

function toggleAccountIdVisibility() {
  showFullAccountId.value = !showFullAccountId.value;
}

function formatAccountNumber(accountId: string) {
  if (showFullAccountId.value) {
    return accountId;
  } else {
    const firstFourDigits = accountId.substring(0, 4);
    const lastTwoDigits = accountId.substring(accountId.length - 2);
    const asterisks = "*".repeat(accountId.length - 6);
    return `${firstFourDigits}${asterisks}${lastTwoDigits}`;
  }
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row w-full gap-4 md:gap-8 justify-center h-full"
  >
    <UiCard
      class="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 h-fit relative bg-gray-700"
    >
      <UiCardContent class="">
        <img
          src="/backgroundMap.png"
          alt="background"
          class="opacity-30 absolute top-0 left-0 w-full h-full z-0"
        />
        <UiCardHeader class="relative z-10">
          <UiCardTitle>
            <img src="/cbe-logo.png" alt="logo" class="h-fit w-full" />
          </UiCardTitle>
          <UiCardDescription
            class="grid gap-4 grid-cols-2 content-between py-6 text-white"
          >
            <div>
              <p class="font-light text-gray-200 text-base">Account:</p>
              <div class="items-center flex gap-4">
                <p class="text-lg font-medium">
                  {{
                    formatAccountNumber(
                      typeof paymentResponse?.merchantAccountNumber === "string"
                        ? paymentResponse.merchantAccountNumber
                        : "-"
                    )
                  }}
                </p>
                <Icons.hide
                  v-if="showFullAccountId"
                  class="md:w-6 md:h-6 w-5 h-5 fill-white"
                  @click="toggleAccountIdVisibility"
                />
                <Icons.view
                  v-else
                  class="md:w-6 md:h-6 w-5 h-5 fill-white"
                  @click="toggleAccountIdVisibility"
                />
              </div>
            </div>

            <div class="text-right">
              <p class="font-light text-gray-200 text-base">
                Payment Reference:
              </p>
              <p class="text-lg font-medium">
                {{ paymentResponse?.paymentReference }}
              </p>
            </div>

            <div>
              <p class="font-light text-gray-200 text-base">Amount:</p>
              <p class="text-lg font-medium">
                {{ paymentResponse?.amount }} Br.
              </p>
            </div>

            <div class="text-right">
              <p class="font-light text-gray-200 text-base">Dynamic Id:</p>
              <p class="text-lg font-medium">
                {{ paymentResponse?.dynamicId }}
              </p>
            </div>

            <UiCard
              class="w-fit flex justify-center items-center p-6 col-span-full place-self-center mt-4 bg-gray-50 dark:bg-white"
              v-if="paymentResponse"
            >
              <img
                :src="`https://api.qrserver.com/v1/create-qr-code/?data=${paymentResponse.qrEncodedData}`"
                alt="QR Code"
              />
            </UiCard>
          </UiCardDescription>
        </UiCardHeader>
      </UiCardContent>
    </UiCard>
    <DashboardInitiatePaymentPushUssd
      class="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 min-h-max"
      :merchantTransactionId="paymentResponse?.merchantTransactionId"
    />
  </div>
</template>
