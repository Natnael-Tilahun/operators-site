<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Sidebar from "~/components/layout/sidebar/Sidebar.vue";
import OpenSidebarIcon from "~/components/layout/sidebar/OpenSidebarIcon.vue";
import CloseSidebarIcon from "~/components/layout/sidebar/CloseSidebarIcon.vue";

const LOCAL_STORAGE_THEME_KEY = "theme";

const route = useRoute();
const fullPath = ref(route.fullPath);
const pathSegments = ref([]);
pathSegments.value = splitPath(fullPath.value);

watch(
  () => route.fullPath,
  (newVal) => {
    fullPath.value = newVal;
    pathSegments.value = splitPath(fullPath.value);
  }
);

function splitPath(path: any) {
  return path.split("/").filter(Boolean);
}

function capitalizeRouteName(route: any) {
  return route.charAt(0).toUpperCase() + route.slice(1);
}

function generateLink(index: any) {
  const linkSegments = pathSegments.value.slice(0, index + 1);
  const path = linkSegments.join("/");
  return path === "/" ? path : `/${path}`;
}

// const colorMode = useColorMode(); // Set the initial color mode

// const setTheme = (newTheme: any) => {
//   localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
//   colorMode.value = newTheme;
// };

// const toggleTheme = () => {
//   // colorMode.value = colorMode.value === "light" ? "dark" : "light";
//   if (colorMode.value === "dark") {
//     colorMode.value = "light";
//     setTheme("light");
//     // document.body.classList.add("dark");
//   } else {
//     colorMode.value = "dark";
//     setTheme("dark");
//     // document.body.classList.remove("dark");
//   }
// };

// console.log("colorMode", colorMode.value);

const isSidebarCollapsed = useSidebarCollapsed();

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  console.log("isSidebarcollapsed : ", isSidebarCollapsed.value);
};

const closeMenuNav = () => {
  isSidebarCollapsed.value = false;
};
</script>

<template>
  <div
    class="w-full h-screen overflow-hidden bg-background grid grid-cols-12 lg:grid-cols-9 xl:grid-cols-7"
    :class="[
      {
        ' relative h-screen  w-full': !isSidebarCollapsed,
      },
      {
        ' static  w-full': isSidebarCollapsed,
      },
    ]"
  >
    <!-- Page Sidebar -->
    <Sidebar
      class="md:col-span-3 col-span-12 md:static fixed h-screen lg:col-span-2 xl:col-span-1"
      :class="[
        {
          'hidden col-span-12  md:block xl:col-span-1  md:col-span-3':
            !isSidebarCollapsed,
        },
        {
          'col-span-12 absolute w-2/3 md:hidden shadow-lg z-50':
            isSidebarCollapsed,
        },
      ]"
      @closeMenuNav="closeMenuNav"
    />

    <div
      class="col-span-full overflow-scroll md:col-span-9 lg:col-span-7 xl:col-span-6 md:flex"
      :class="[
        {
          'w-full   h-full top-0 left-0   flex-col md:flex':
            !isSidebarCollapsed,
        },
        {
          ' absolute  w-full h-full flex-col flex': isSidebarCollapsed,
        },
      ]"
    >
      <!-- Page Header -->
      <div class="flex flex-col py-6 gap-4">
        <div class="flex h-10 items-center px-3 md:px-8">
          <!-- <DashboardMainNav class="mx-6" /> -->
          <div class="flex items-center gap-3 md:gap-8">
            <OpenSidebarIcon
              v-if="!isSidebarCollapsed"
              @click="toggleSidebar"
              class="md"
            />
            <CloseSidebarIcon
              class=""
              v-if="isSidebarCollapsed"
              @click="toggleSidebar"
            />

            <DashboardSearch class="hidden md:block" />
          </div>

          <div class="ml-auto flex items-center space-x-2 md:space-x-10">
            <!-- <div class="flex">
              <Icon
                name="tdesign:mode-dark"
                size="22"
                @click="toggleTheme"
                v-if="colorMode.value === 'dark'"
              ></Icon>
              <Icon
                size="22"
                name="material-symbols:light-mode-outline"
                @click="toggleTheme"
                v-else="colorMode.value === 'light'"
              >
              </Icon>
            </div> -->
            <DashboardUserNav />
          </div>
        </div>

        <UiCard
          class="h-16 shadow-sm bg-white flex gap-14 md:px-8 px-5 items-center w-full"
        >
          <!-- <div class="w-0 h-14 rounded-xl -left-2 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              @click="toggleSidebar"
              v-if="!isSidebarCollapsed"
              class="md:absolute w-16 h-16 hidden md:block left-[35%] top-[8%] z-50 text-primary"
            >
              <path
                fill="currentColor"
                d="M16.5 14.8V9.2q0-.35-.3-.475t-.55.125L13.2 11.3q-.3.3-.3.7t.3.7l2.45 2.45q.25.25.55.125t.3-.475M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5-2h9V5h-9z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              @click="toggleSidebar"
              v-if="isSidebarCollapsed"
              class="md:absolute w-16 h-16 hidden md:block left-[35%] top-[5%] z-50 text-primary"
            >
              <path
                fill="currentColor"
                d="M12.5 9.2v5.6q0 .35.3.475t.55-.125l2.45-2.45q.3-.3.3-.7t-.3-.7l-2.45-2.45q-.25-.25-.55-.125t-.3.475M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5-2h9V5h-9z"
              />
            </svg>
          </div> -->

          <h1 class="text-sm md:text-lg md:block space-x-2">
            <template v-if="pathSegments.length == 0">
              <router-link to="/" class="font-bold">Dashboard</router-link>
            </template>

            <template v-if="pathSegments.length > 0">
              <span v-for="(segment, index) in pathSegments" :key="index">
                <template v-if="index !== 0">
                  <Icon name="mdi:chevron-double-right" class=""></Icon>
                </template>

                <template v-if="segment">
                  <NuxtLink class="font-light" :to="generateLink(index)">
                    {{ capitalizeRouteName(segment) }}
                  </NuxtLink>
                </template>
              </span>
            </template>
          </h1>
        </UiCard>
      </div>

      <!-- Page Main Content -->
      <div class="md:px-8 p-5">
        <slot />
      </div>
    </div>
  </div>
</template>
<style scoped>
.router-link-active {
  @apply font-semibold text-primary bg-popover ml-1;
}
</style>
