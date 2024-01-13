<template>
  <NuxtScrollbar
    tag="aside"
    class="md:bg-primary bg-white relative flex flex-col justify-items-end text-sm py-4 md:text-secondary md:w-full h-full font-medium shrink-0 space-y-6"
  >
    <div class="flex w-full h-24 md:items-center justify-between px-3">
      <!-- <h1
        class="lg:text-2xl text-xl font-bold px-4 md:px-10 backdrop-blur-md self-center shadow-sm"
      >
        Project X
      </h1> -->
      <img
        src="/cbe-logo2.jpeg"
        class="lg:w-24 lg:h-24 w-14 h-14 shadow-xl mx-auto rounded-full"
        alt="CBE Logo"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        @click="closeMenuNav"
        class="md:hidden md:w-0 w-10 h-10 text-secondary-foreground border-accent rounded-md border-2"
      >
        <path
          fill="currentColor"
          d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
        />
      </svg>
    </div>

    <hr class="md:border-gray-500" />

    <ul class="flex flex-col gap-4 pl-5 h-full">
      <template v-for="(link, index) in mainLinks" :key="index">
        <UiCollapsible
          v-if="link.dropdown && link.dropdown.length > 0"
          class="w-full rounded-l-lg hover:bg-popover hover:text-secondary-foreground px-0 shadow-none group"
          type="single"
          v-model:open="isOpen[index]"
        >
          <UiCollapsibleTrigger
            class="py-3 shadow-none w-full hover:text-primary"
          >
            <NuxtLink
              :to="link.link"
              class="flex gap-3 items-center px-2 rounded-l-full w-full py-0 rounded- transition text-left"
            >
              <span><Icon :name="link.icon" :size="link.size"></Icon></span>
              <p class="mr-auto">{{ link.title }}</p>

              <Icon
                name="material-symbols:keyboard-arrow-down-rounded"
                size="22"
              ></Icon>
            </NuxtLink>
          </UiCollapsibleTrigger>

          <!-- Check if the link has a dropdown -->
          <UiCollapsibleContent>
            <ul
              class="dropdown-menu rounded-none flex flex-col gap-0 py-2 pl-7"
            >
              <!-- <li> -->
              <NuxtLink
                v-for="(item, dropdownIndex) in link.dropdown"
                :key="dropdownIndex"
                :to="item.link"
                @click="closeMenuNav"
                class="w-full border-l-2 hover:rounded-r-lg group-hover:border-primary hover:bg-accent px-4 py-3 rounded-none hover:text-primary"
              >
                {{ item.title }}
              </NuxtLink>
              <!-- <UiSeparator class="mt-3 bg-zinc-300" /> -->
              <!-- </li> -->
            </ul>
          </UiCollapsibleContent>
        </UiCollapsible>

        <NuxtLink
          v-else
          :to="link.link"
          @click="closeMenuNav"
          class="flex gap-3 py-3 rounded-l-full px-2 hover:bg-popover hover:text-primary rounded-lg transition"
        >
          <span><Icon :name="link.icon" :size="link.size"></Icon></span>
          <p>{{ link.title }}</p>
        </NuxtLink>
      </template>
    </ul>
    <NuxtLink to="/login" class="self-center">
      <UiButton class="bg-white shadow-lg text-primary flex gap-2 md:left-[4%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 20 20"
          class="w-6"
        >
          <g fill="#888888" fill-rule="evenodd" clip-rule="evenodd">
            <path
              d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75z"
            />
            <path
              d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10"
            />
          </g>
        </svg>

        Logout</UiButton
      >
    </NuxtLink>
  </NuxtScrollbar>
</template>

<script lang="ts" setup>
const mainLinks = [
  {
    title: "Dashboard",
    icon: "ri:home-8-line",
    link: "/",
    size: "22",
    showDropdown: false,
  },
  {
    title: "transactions",
    icon: "uil:transaction",
    link: "/transactions",
    size: "22",
    showDropdown: false,
  },
  {
    title: "Customers",
    icon: "carbon:customer-service",
    link: "/customers",
    size: "22",
    showDropdown: false,
  },
  // {
  //   title: "Employee Management",
  //   icon: "solar:user-bold",
  //   size: "22",
  //   showDropdown: false,
  //   dropdown: [
  //     { title: "Users", link: "/users" },
  //     { title: "Roles", link: "/userRoles" },
  //     { title: "Permissions", link: "/permissions" },
  //   ],
  // },
  // {
  //   title: "Merchants",
  //   icon: "material-symbols:partner-exchange-outline-rounded",
  //   link: "/merchants",
  //   size: "22",
  //   showDropdown: false,
  // },
  // {
  //   title: "Application Content Management",
  //   icon: "material-symbols:create-new-folder",
  //   size: "22",
  //   showDropdown: false,
  //   dropdown: [
  //     { title: "FAQs", link: "/faqs" },
  //     { title: "Privacy Policies", link: "/privacy-policies" },
  //     { title: "Term & Conditions", link: "/term-conditions" },
  //     { title: "Service Outage Messages", link: "/service-outage-messages" },
  //     { title: "Locations", link: "/locations" },
  //     { title: "Customer Care Informations", link: "/customer-care-info" },
  //     { title: "Ad Campaigns", link: "/ad-campaigns" },
  //   ],
  // },
  // {
  //   title: "Logs & Reports",
  //   icon: "iconoir:reports-solid",
  //   size: "22",
  //   showDropdown: false,
  //   dropdown: [
  //     { title: "Logs", link: "/log" },
  //     { title: "Reports", link: "/reports" },
  //   ],
  // },
  // {
  //   title: "Master Data Management",
  //   icon: "icon-park-solid:category-management",
  //   size: "22",
  //   showDropdown: false,
  //   dropdown: [
  //     { title: "Products", link: "/products" },
  //     { title: "Services", link: "/services" },
  //     { title: "Sequrity Questions", link: "/security-questions" },
  //   ],
  // },

  // {
  //   title: "Transactions",
  //   icon: "uil:transaction",
  //   // link: "/transactions",
  //   size: "22",
  //   showDropdown: false,
  //   dropdown: [
  //     { title: "Transactions", link: "/transactions" },
  //     { title: "Dropdown Item 2", link: "/dropdown/item2" },
  //     // Add more dropdown items as needed
  //   ],
  // },
  // {
  //   title: "T24",
  //   icon: "streamline:computer-database-server-2-server-network-internet",
  //   link: "/t24",
  //   size: "22",
  //   showDropdown: false,
  // },
  // {
  //   title: "Anonymous",
  //   icon: "codicon:workspace-unknown",
  //   link: "/anonymous",
  //   size: "22",
  //   showDropdown: false,
  // },
  // {
  //   title: "Location Based Services",
  //   icon: "material-symbols:location-on",
  //   link: "/location-based-services",
  //   size: "22",
  //   showDropdown: false,
  // },
];

// Initialize isOpen array with the same length as mainLinks and set all to false
const isOpen = ref(new Array(mainLinks.length).fill(false));

const emits = defineEmits(["closeMenuNav"]); // Define custom event

const closeMenuNav = () => {
  emits("closeMenuNav"); // Emit the toggleTheme event to the parent
};
</script>

<style scoped>
.router-link-active {
  @apply font-bold text-white md:text-primary bg-primary md:bg-popover rounded-l-full border-l-2;
}
</style>
