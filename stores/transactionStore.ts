import { defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

interface TransactionFilterState {
    paymentStatus: string;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    paymentMethod: string;
    paymentType: string;
    expiryDate: string;
    completedDate: string;
    paymentInitiator: string;
}

export const useTransactionFilterStore = defineStore("transactionStore", {
    state: (): TransactionFilterState => ({
        paymentStatus: "COMPLETED",
        pageNumber: 0,
        pageSize: 20,
        sortBy: "asc",
        paymentMethod: "",
        paymentType: "",
        expiryDate: "",
        completedDate: "",
        paymentInitiator: "",
    }),

    actions: {
        setFilter(filter: Partial<TransactionFilterState>) {
            this.paymentStatus = filter?.paymentStatus ?? "";
            this.pageNumber = filter?.pageNumber ?? 1;
            this.pageSize = filter?.pageSize ?? 20;
            this.sortBy = filter?.sortBy ?? "";
            this.paymentMethod = filter?.paymentMethod ?? "";
            this.paymentType = filter?.paymentType ?? "";
            this.expiryDate = filter?.expiryDate ?? "";
            this.completedDate = filter?.completedDate ?? "";
            this.paymentInitiator = filter?.paymentInitiator ?? "";
        },


        $reset() {
            this.paymentStatus = "";
            this.pageNumber = 1;
            this.pageSize = 20;
            this.sortBy = "";
            this.paymentMethod = "";
            this.paymentType = "";
            this.expiryDate = "";
            this.completedDate = "";
            this.paymentInitiator = "";
        },
    },
    persist: {
        storage: persistedState.cookies,
    },
});
