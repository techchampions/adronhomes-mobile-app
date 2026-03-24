// pages/dashboard/Accounts.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  User2, 
  Building2, 
  RefreshCw, 
  CheckCircle, 
  Search, 
  Mail, 
  Calendar,
  Users,
  Star,
  ChevronRight,
  Copy,
  Check
} from "lucide-react";
import { useFetchAccounts, useSwitchAccount } from "../../data/api";
import { useUserStore } from "../../zustand/UserStore";
import { useToastStore } from "../../zustand/useToastStore";

// Define the Account type
interface Account {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  profile_image?: string;
  is_default?: boolean;
  created_at?: string;
  phone_number?: string;
}

// Define the response type from useFetchAccounts
interface FetchAccountsResponse {
  success: boolean;
  accounts: Account[];
}

const AccountsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { data, isLoading, refetch } = useFetchAccounts();
  const switchAccountMutation = useSwitchAccount();
  const { showToast } = useToastStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [switchingAccount, setSwitchingAccount] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const accounts: Account[] = (data as FetchAccountsResponse)?.accounts || [];
  const currentAccount = user?.unique_customer_id;

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account => 
    `${account.first_name} ${account.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.customer_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserInitials = (firstName: string, lastName: string): string => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const handleSwitchAccount = async (customerCode: string): Promise<void> => {
    if (customerCode === currentAccount) {
      showToast("You're already using this account", "error");
      return;
    }

    setSwitchingAccount(customerCode);
    
    try {
      const result = await switchAccountMutation.mutateAsync(customerCode);
      
      if (result.success) {
        // Show success message
        showToast(result.message || `Switched to ${result.account.first_name} ${result.account.last_name}`, "success");
        
        // The user store will be updated automatically by the mutation's onSuccess
        // But we'll also update it here for immediate UI feedback
        if (user) {
          setUser({
            ...user,
            first_name: result.account.first_name,
            last_name: result.account.last_name,
            email: result.account.email,
            unique_customer_id: result.account.customer_code,
          });
        }
        
        // Refresh the accounts list to update the UI
        await refetch();
        
        // Redirect to dashboard after a short delay to show success message
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error: any) {
      // Handle specific error messages from the API
      const errorMessage = error.response?.data?.message || error.message || "Failed to switch account";
      showToast(errorMessage, "error");
      console.error("Switch account error:", error);
    } finally {
      setSwitchingAccount(null);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast("Customer code copied!", "success");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getAccountStats = () => {
    const total = accounts.length;
    const active = accounts.filter(account => account.customer_code === currentAccount).length;
    const others = total - active;
    return { total, active, others };
  };

  const stats = getAccountStats();

  // Auto-refresh accounts when component mounts
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-10">
        <div className="px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">My Accounts</h1>
            <p className="text-sm text-gray-500">Manage and switch between your accounts</p>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4">
      
        {/* Search Bar */}
        {!isLoading && accounts.length > 0 && (
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or customer code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-adron-green focus:border-transparent bg-white"
              />
            </div>
          </div>
        )}

        {/* Accounts List */}
        <div className="mt-6 space-y-3 pb-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl">
              <RefreshCw className="h-8 w-8 text-adron-green animate-spin mb-3" />
              <p className="text-gray-500 text-sm">Loading accounts...</p>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <User2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                {searchTerm ? "No matching accounts found" : "No accounts available"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-sm text-adron-green hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredAccounts.map((account: Account, index: number) => {
              const isCurrentAccount = account.customer_code === currentAccount;
              const isSwitching = switchingAccount === account.customer_code;
              const isCopied = copiedCode === account.customer_code;
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md ${
                    isCurrentAccount 
                      ? "border-green-200 bg-gradient-to-r from-green-50/50 to-white" 
                      : "border-gray-200"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={`h-14 w-14 rounded-full flex items-center justify-center ${
                          isCurrentAccount 
                            ? "bg-gradient-to-br from-green-400 to-green-600" 
                            : "bg-gradient-to-br from-adron-green to-adron-green-dark"
                        }`}>
                          <span className="text-white font-semibold text-xl">
                            {getUserInitials(account.first_name, account.last_name)}
                          </span>
                        </div>
                        {isCurrentAccount && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Account Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {account.first_name} {account.last_name}
                          </h3>
                          {isCurrentAccount && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1.5 mb-1">
                          <Building2 className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                          <p className="text-sm text-gray-600 font-mono truncate">
                            {account.customer_code}
                          </p>
                          <button
                            onClick={() => handleCopyCode(account.customer_code)}
                            className="ml-1 p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            {isCopied ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                        
                        {account.email && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <Mail className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <p className="text-sm text-gray-500 truncate">
                              {account.email}
                            </p>
                          </div>
                        )}
                        
                        {account.phone_number && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <p className="text-xs text-gray-400">
                              {account.phone_number}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {!isCurrentAccount && (
                        <button
                          onClick={() => handleSwitchAccount(account.customer_code)}
                          disabled={isSwitching}
                          className="px-4 py-2 bg-adron-green text-white rounded-xl text-sm font-medium hover:bg-adron-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
                        >
                          {isSwitching ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Switching...
                            </>
                          ) : (
                            <>
                              Switch
                              <ChevronRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Help Section */}
        {!isLoading && accounts.length > 0 && (
          <div className="mt-4 mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User2 className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  Need help with account switching?
                </h4>
                <p className="text-xs text-blue-700 mb-2">
                  You can switch between accounts anytime. Your active account will be used for all transactions.
                </p>
                <button 
                  onClick={() => navigate('/dashboard/support')}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Refresh Button */}
        {!isLoading && accounts.length > 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-adron-green transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Refresh accounts</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsPage;