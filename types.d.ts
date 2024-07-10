interface User {
    email: string;
    id: string;
    password: string;
    role: string[];
}

interface UserInput {
    username: string;
    password: string;
    rememberMe: boolean;
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
    taxPayerIdNumber: Gender
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
}

interface Employee {
    merchantEmployeeId: string
    firstName: string
    middleName: string
    fullName: string
    user: User
    merchant: Merchant
    merchantBranch: Branch
}
