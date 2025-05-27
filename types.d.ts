interface User {
    id: string;
    login: string;
    email?: string;
    phone: string;
    nationalId?: string;
    activated?: boolean;
    langKey?: string;
    imageUrl?: string;
    verificationKey?: string;
    resetKey?: string;
    resetDate?: string;
    deviceId?: string;
    unsuccessfulLoginAttempts?: number;
    lockCount?: number;
    isUserAccountLocked?: boolean;
    lockoutDateTime?: string;
    preferredOtpMethod?: string;
    isPinSet?: boolean;
    currentLoginTime?: string;
    lastLoginTime?: string;
    forcePinChange?: boolean;
    emailVerified?: boolean;
    verified?: boolean;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    isEnrolled?: boolean;
    authorities?: string[];
}

interface Profile {
    merchantOperatorId: string;
    operatorCode: string;
    operatorRole: string;
    firstName: string;
    middleName: string;
    fullName: string;
    active: boolean;
    user: User;
    merchant: Merchant;
    merchantBranch: Branch;
    staticQrData: string;
}

interface UserInput {
    merchantShortCode: string;
    operatorCode: string;
    password: string;
}

interface UserWithoutPassword {
    email: string;
    id: string;
    role: string[];
}

interface Address {
    city: string;
    businessEmail: string
    postalNumber: string;
}

interface Merchant {
    customerIdId: string
    merchantId?: string
    businessType: string;
    businessNumber: string
    businessName: string
    tradeLicenseNumber: string
    tradeLicenseIssueDate: string
    tradeLicenseExpiryDate: string
    taxPayerIdNumber: string
    taxPayerIssueDate: string
    taxPayerExpiryDate: string
    businessPhoneNumber: string
    faxNumber: string
    address: Address
    shortCode: string
    status: Status
}

interface Branch {
    merchantBranchId: string
    branchName: string
    branchCode: string
    businessPhoneNumber: string
    faxNumber: string
    address: Address
    paymentReceivingAccountNumber: string
}

enum OperatorRole {
    ADMIN, MANAGER, ATTENDANT, SUPERVISOR, NONE
}

enum PaymentStatus {
    NONE, PENDING, COMPLETED, FAILED, CANCELLED, EXPIRED
}

enum TransactionInitiator {
    MERCHANT_INITIATED, MERCHANT_OPERATOR_INITIATED, PAYER_INITIATED, NONE
}

interface Transaction {
    merchantTransactionId: string
    merchantId: string
    merchantName?: string
    merchantCity: string
    merchantBranchId?: string
    businessName: string
    merchantBranchName: string
    operatorId?: string
    operatorUsername: string
    operatorName?: string
    amount: number
    currencyCode: string
    merchantCategoryCode: string
    countryCode: string
    paymentReference: string
    tipAmount: number
    dynamicId: string
    transactionRefId: string
    paymentStatus: PaymentStatus
    expirationDate: string
    completedDate: string
    transactionInitiator: TransactionInitiator
    mbTransactionId?: string
    coreTransactionId?: string
    merchantAccountNumber: string
    payerAccountNumber?: string
    payerId?: string
    payerName?: string
    payerPhone?: string
    qrEncodedData?: string
}


export interface ApiError {
    type?: string;
    message?: string;
    detail?: string;
    fieldErrors?: Array<{
      field: string;
      message: string;
    }>;
  }
  
  export interface ApiResponse<T> {
    data: T;
    pending: boolean;
    error: {
      value?: {
        data?: ApiError;
      };
    };
    status: {
      value: 'success' | 'error' | '404';
    };
  }
  
  export interface OtpDTO {
    verificationId:	string
    phone?:	string
    expiryTime?:	string
    }
  
  export interface TFAAccessTokenDTO{
    token:	string
    validFrom:	string
    validTo:	string
  }
  
  export interface VerificationRequest{
    verificationId: string
    otp?: 	string
  }

  
  interface AuthResponse {
    accessToken?: string;
    refreshToken?: string;
    permissions?: string[];
  }