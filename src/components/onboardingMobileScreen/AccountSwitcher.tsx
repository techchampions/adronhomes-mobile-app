// components/AccountSwitcher.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, User2, Building2, ChevronRight, RefreshCw, CheckCircle } from "lucide-react";
import { useUserStore } from "../../zustand/UserStore";
import { useFetchAccounts, useSwitchAccount } from "../../data/api";
import { useToastStore } from "../../zustand/useToastStore";

// Define the Account type
interface Account {
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  profile_image?: string;
  is_default?: boolean;
}

// Define the response type from useFetchAccounts
interface FetchAccountsResponse {
  success: boolean;
  accounts: Account[];
}

interface AccountSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { data, isLoading, refetch } = useFetchAccounts();
  const switchAccountMutation = useSwitchAccount();
  
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  // Type assertion for data
  const accounts: Account[] = (data as FetchAccountsResponse)?.accounts || [];

  const getUserInitials = (firstName: string, lastName: string): string => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };
  
  const { showToast } = useToastStore();
  
// In AccountSwitcher.tsx, the handleSwitchAccount function remains the same
const handleSwitchAccount = async (customerCode: string): Promise<void> => {
  if (customerCode === user?.unique_customer_id) {
    showToast("You're already using this account", "error");
    return;
  }

  setSelectedAccount(customerCode);
  
  try {
    const result = await switchAccountMutation.mutateAsync(customerCode);
    
    if (result.success) {
      showToast(result.message || `Switched to ${result.account.first_name} ${result.account.last_name}`, "success");
      
      // The user store will be updated automatically by the mutation's onSuccess
      // Close modal
      onClose();
      
      // Optional: Redirect or reload after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } catch (error: any) {
    showToast(error.response?.data?.message || "Failed to switch account", "error");
    console.error("Switch account error:", error);
  } finally {
    setSelectedAccount(null);
  }
};

  const handleViewAll = (): void => {
    onClose();
    navigate("/dashboard/accounts");
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const modal = document.getElementById("account-switcher-modal");
      if (isOpen && modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-end  justify-center  w-full">
      <div
        id="account-switcher-modal"
        className="bg-white rounded-t-2xl  sm:rounded-2xl w-full max-h-[60vh] overflow-scroll animate-slide-up"
      >
        {/* Header */}
        <div className=" bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <div className="bg-white">
            <h2 className="text-xl font-semibold text-gray-900">Switch Account</h2>
            <p className="text-sm text-gray-500 mt-1">
              Select an account to continue
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(50vh-50px)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 text-adron-green animate-spin mb-3" />
              <p className="text-gray-500 text-sm">Loading accounts...</p>
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-12">
              <User2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No other accounts found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {accounts.slice(0, 4).map((account: Account, index: number) => {
                const isCurrentAccount = account.customer_code === user?.unique_customer_id;
                const isSelected = selectedAccount === account.customer_code;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleSwitchAccount(account.customer_code)}
                    disabled={isCurrentAccount || isSelected}
                    className={`w-full px-5 py-4 flex items-center gap-4 transition-colors hover:bg-gray-50 ${
                      isCurrentAccount ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        isCurrentAccount 
                          ? "bg-gradient-to-br from-green-400 to-green-600" 
                          : "bg-gradient-to-br from-adron-green to-adron-green-dark"
                      }`}>
                        <span className="text-white font-semibold text-lg">
                          {getUserInitials(account.first_name, account.last_name)}
                        </span>
                      </div>
                      {isCurrentAccount && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                                 <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Account Details */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {account.first_name} {account.last_name}
                        </h3>
                        {isCurrentAccount && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-gray-400" />
                        <p className="text-sm text-gray-500 font-mono">
                          {account.customer_code}
                        </p>
                      </div>
                      {account.email && (
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {account.email}
                        </p>
                      )}
                    </div>

                    {/* Action */}
                    {!isCurrentAccount && (
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <RefreshCw className="h-5 w-5 text-adron-green animate-spin" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* View All Button */}
          {accounts.length > 4 && (
            <div className="p-5 border-t border-gray-100">
              <button
                onClick={handleViewAll}
                className="w-full py-3 text-adron-green font-medium hover:bg-green-50 rounded-xl transition-colors"
              >
                View All Accounts ({accounts.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSwitcher;