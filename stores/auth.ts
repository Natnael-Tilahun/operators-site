import { defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
  // permissions: string[];
  profile: Partial<Profile> | null;
}

// interface Profile {
//   merchantOperatorId: string;
//   operatorCode: string;
//   operatorRole: string;
//   firstName: string;
//   middleName: string;
//   fullName: string;
//   active: boolean;
//   user: any;
//   merchant: Merchant;
//   merchantBranch: Branch;
//   staticQrData: string;
// }

interface AuthPayload {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isAuthenticated: false,
    accessToken: "",
    refreshToken: "",
    refreshTokenExpiresIn: "",
    profile: null,
  }),

  actions: {
    setAuth(auth: Partial<AuthPayload>) {
      this.isAuthenticated = auth?.isAuthenticated ?? false;
      this.accessToken = auth?.accessToken ?? "";
      this.refreshToken = auth?.refreshToken ?? "";
      this.refreshTokenExpiresIn = auth?.refreshTokenExpiresIn ?? "";
    },
    setProfile(profile: Partial<Profile>) {
      this.profile = profile;
    },

    // setPermissions(auth: { permissions: string[] }) {
    //   this.permissions = auth?.permissions ?? [];
    // },

    $reset() {
      this.isAuthenticated = false;
      this.accessToken = "";
      this.refreshToken = "";
      this.refreshTokenExpiresIn = "";
      this.profile = null;
    },
  },
  getters: {
    // hasPermissions: (state) => {
    //   return (permission: string) => state.permissions.includes(permission);
    // },

    hasRole: (state) => {
      return (role: string) => state.profile?.operatorRole === role;
    }
  },
  persist: {
    storage: persistedState.cookies,
  },
});
