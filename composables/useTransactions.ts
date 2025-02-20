import { useAuthStore } from "~/stores/auth";
import { useTransactionFilterStore } from "~/stores/transactionStore";
import { toast } from "~/components/ui/toast";

export const useTransactions = () => {
    const runtimeConfig = useRuntimeConfig();
    const store = useAuthStore();
    const isLoading = ref<boolean>(false);
    const transactionFilterStore = useTransactionFilterStore();

    const getTransactions: (
        paymentStatus?: string, 
        pageNumber?: string, 
        pageSize?: string, 
        sortBy?: string, 
        transactionInitiator?: string, 
        amountGreaterThanOrEqual?: number, 
        amountLessThanOrEqual?: number, 
        payerName?: string, 
        payerPhone?: string, 
        payerAccountNumber?: number, 
        payerId?: string, 
        paymentReference?: string, 
        dynamicId?: string, 
        mbTransactionId?: string, 
        coreTransactionId?: string, 
        merchantAccountNumber?: number, 
        merchantBranchId?: string, 
        merchantOperatorId?: string, 
        initiatedDate?: string, 
        completedDate?: string, 
        expirationDate?: string, 
     ) => Promise<Transaction[]> = async (
        paymentStatus = undefined, 
        pageNumber = undefined, 
        pageSize = undefined, 
        sortBy = undefined,
        transactionInitiator= undefined, 
        amountGreaterThanOrEqual= undefined, 
        amountLessThanOrEqual= undefined, 
        payerName= undefined, 
        payerPhone= undefined, 
        payerAccountNumber= undefined, 
        payerId= undefined, 
        paymentReference= undefined, 
        dynamicId= undefined, 
        mbTransactionId= undefined, 
        coreTransactionId= undefined, 
        merchantAccountNumber= undefined, 
        merchantBranchId= undefined, 
        merchantOperatorId= undefined, 
        initiatedDate= undefined, 
        completedDate= undefined, 
        expirationDate= undefined, 
    ) => {
        try {
            const { data, error, status } = await useAsyncData<Transaction[]>(`transactions`, () =>
                $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/operators/transactions`, {
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    query:{
                        ...(paymentStatus || transactionFilterStore.paymentStatus ? {
                            "paymentStatus.equals": paymentStatus ?? transactionFilterStore.paymentStatus == 'NONE' ? '' : transactionFilterStore.paymentStatus
                          } : {}),
                        // "paymentStatus.equals": paymentStatus ?? transactionFilterStore.paymentStatus == 'NONE' ? '' : transactionFilterStore.paymentStatus,
                        "page": pageNumber ?? transactionFilterStore.pageNumber,
                        "size": pageSize ?? transactionFilterStore.pageSize,
                        "sort": sortBy ?? transactionFilterStore.sortBy,
                        ...(transactionInitiator || (transactionFilterStore.transactionInitiator !== 'NONE' && transactionFilterStore.transactionInitiator !== '') ? {
                            "transactionInitiator.equals": transactionInitiator ?? transactionFilterStore.transactionInitiator
                          } : {}),
                          ...(amountGreaterThanOrEqual || transactionFilterStore.amountGreaterThanOrEqual ? {
                            "amount.greaterThanOrEqual": amountGreaterThanOrEqual ?? transactionFilterStore.amountGreaterThanOrEqual
                          } : {}),
                          ...(amountLessThanOrEqual || transactionFilterStore.amountLessThanOrEqual ? {
                            "amount.lessThanOrEqual": amountLessThanOrEqual ?? transactionFilterStore.amountLessThanOrEqual
                          } : {}),
                          ...(payerName || transactionFilterStore.payerName ? {
                            "payerName.contains": payerName ?? transactionFilterStore.payerName
                          } : {}),
                          ...(payerPhone || transactionFilterStore.payerPhone ? {
                            "payerPhone.contains": payerPhone ?? transactionFilterStore.payerPhone
                          } : {}),
                          ...(payerAccountNumber || transactionFilterStore.payerAccountNumber ? {
                            "payerAccountNumber.in": payerAccountNumber ?? transactionFilterStore.payerAccountNumber
                          } : {}),
                          ...(payerId || transactionFilterStore.payerId ? {
                            "payerId.contains": payerId ?? transactionFilterStore.payerId
                          } : {}),
                          ...(paymentReference || transactionFilterStore.paymentReference ? {
                            "paymentReference.contains": paymentReference ?? transactionFilterStore.paymentReference
                          } : {}),
                          ...(dynamicId || transactionFilterStore.dynamicId ? {
                            "dynamicId.contains": dynamicId ?? transactionFilterStore.dynamicId
                          } : {}),
                          ...(mbTransactionId || transactionFilterStore.mbTransactionId ? {
                            "mbTransactionId.contains": mbTransactionId ?? transactionFilterStore.mbTransactionId
                          } : {}),
                          ...(coreTransactionId || transactionFilterStore.coreTransactionId ? {
                            "coreTransactionId.contains": coreTransactionId ?? transactionFilterStore.coreTransactionId
                          } : {}),
                          ...(merchantAccountNumber || transactionFilterStore.merchantAccountNumber ? {
                            "merchantAccountNumber.contains": merchantAccountNumber ?? transactionFilterStore.merchantAccountNumber
                          } : {}),
                          ...(merchantBranchId || transactionFilterStore.merchantBranchId ? {
                            "merchantBranchId.equals": merchantBranchId ?? transactionFilterStore.merchantBranchId
                          } : {}),
                          ...(merchantOperatorId || transactionFilterStore.merchantOperatorId ? {
                            "merchantOperatorId.equals": merchantOperatorId ?? transactionFilterStore.merchantOperatorId
                          } : {}),
                          ...(initiatedDate || transactionFilterStore.initiatedDate ? {
                            "initiatedDate.greaterThanOrEqual": initiatedDate ?? transactionFilterStore.initiatedDate
                          } : {}),
                          ...(completedDate || transactionFilterStore.completedDate ? {
                            "completedDate.greaterThanOrEqual": completedDate ?? transactionFilterStore.completedDate
                          } : {}),
                          ...(expirationDate || transactionFilterStore.expirationDate ? {
                            "expirationDate.greaterThanOrEqual": expirationDate ?? transactionFilterStore.expirationDate
                          } : {}),
                    }
                })
            );

            if (status.value == "error") {
                console.log("Getting transactions error : ", error);
                toast({
                    title: (error as any)?.value?.data?.title,
                    description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
                    variant: "destructive",
                });
                throw new Error("Getting transactions error: " + error.value?.message);
            }

            if (!data.value) {
                throw new Error("No transactions data received");
            }

            return data.value;
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const getTransactionById: (id: string) => Promise<Transaction> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions/${id}?PaymentStatus.equals=NONE`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                }
            );

            if (status.value === "error") {
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transaction data received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const getTransactionsByOperatorId: (id: string) => Promise<Transaction[]> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction[]>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators/${id}/transactions`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                }
            );

            if (status.value === "error") {
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transactions for operator received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    return {
        getTransactions,
        getTransactionById,
        getTransactionsByOperatorId,
    };
};