import { ArrowLeft, User2, Building2, ChevronRight, Home, Loader2, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import { UserAccount } from "../data/types/UserAccount";

interface Prop {
  users: UserAccount[];
  values: { email: string; password: string };
}

// Login Modal Component
const LoginModal: React.FC<{ 
  isOpen: boolean; 
  user: UserAccount | null;
  onComplete: () => void;
}> = ({ isOpen, user, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'connecting' | 'authenticating' | 'redirecting'>('connecting');

  React.useEffect(() => {
    if (isOpen && user) {
      // Simulate login steps with progress
      const steps = [
        { duration: 800, status: 'connecting' as const, message: 'Establishing secure connection...' },
        { duration: 1000, status: 'authenticating' as const, message: 'Verifying credentials...' },
        { duration: 600, status: 'redirecting' as const, message: 'Redirecting to dashboard...' },
      ];

      let currentStep = 0;
      
      const runStep = () => {
        if (currentStep < steps.length) {
          const step = steps[currentStep];
          setStatus(step.status);
          
          // Animate progress
          const targetProgress = ((currentStep + 1) / steps.length) * 100;
          const increment = (targetProgress - progress) / 20;
          let currentProgress = progress;
          
          const progressInterval = setInterval(() => {
            if (currentProgress < targetProgress) {
              currentProgress += increment;
              setProgress(Math.min(currentProgress, targetProgress));
            } else {
              clearInterval(progressInterval);
            }
          }, step.duration / 20);
          
          setTimeout(() => {
            currentStep++;
            runStep();
          }, step.duration);
        } else {
          // Complete and redirect
          setTimeout(() => {
            onComplete();
          }, 300);
        }
      };
      
      runStep();
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'connecting':
        return <Loader2 className="h-8 w-8 text-adron-green animate-spin" />;
      case 'authenticating':
        return <Loader2 className="h-8 w-8 text-adron-green animate-spin" />;
      case 'redirecting':
        return <CheckCircle2 className="h-8 w-8 text-green-500 animate-pulse" />;
      default:
        return <Loader2 className="h-8 w-8 text-adron-green animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'connecting':
        return 'Establishing secure connection';
      case 'authenticating':
        return 'Verifying your credentials';
      case 'redirecting':
        return 'Login successful!';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-adron-green to-adron-green-dark px-6 py-4">
          <div className="flex items-center justify-center">
            <Home className="h-8 w-8 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="bg-gradient-to-br from-adron-green to-adron-green-dark h-20 w-20 rounded-full flex items-center justify-center shadow-lg">
                {user.profile_image ? (
                  <img 
                    src={user.profile_image} 
                    alt={`${user.first_name} ${user.last_name}`}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <User2 className="h-8 w-8 text-white" />
                    <span className="text-sm font-medium text-white mt-1">
                      {`${user.first_name?.charAt(0) || ''}${user.last_name?.charAt(0) || ''}`.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-ping" />
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 text-xl">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 font-mono">
              {user.customer_code}
            </p>
          </div>
          
          {/* Progress Section */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-adron-green transition-all duration-300 ease-out"
                />
              </div>
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-center gap-3">
              {getStatusIcon()}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {getStatusMessage()}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Please wait while we log you in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountSelect: React.FC<Prop> = ({ users, values }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleClick = async (customer_code: string, user: UserAccount) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setSelectedUser(user);
    setShowLoginModal(true);
    
    try {
      // Perform actual login
      await Auth.loginStep2(values, customer_code, navigate);
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 2400));
      
      // Navigate directly to dashboard after successful login
      navigate('/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      setShowLoginModal(false);
      setIsProcessing(false);
      // You might want to show an error toast here
    }
  };
  
  const handleLoginComplete = () => {
    setShowLoginModal(false);
    setIsProcessing(false);
    // Navigation to dashboard is already handled in handleClick
  };

  // Get user initials for avatar fallback
  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header with back button */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="px-5 py-4">
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 flex justify-center items-center transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <span className="text-gray-600 font-medium">Back to Login</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-5 py-6 pb-20">
          {/* Header Section */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-adron-green/10 px-4 py-2 rounded-full mb-4">
              <Home className="h-4 w-4 text-adron-green" />
              <span className="text-sm font-medium text-adron-green">Adron Homes</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Select your account
            </h2>
            <p className="text-gray-500 text-sm">
              Choose which account you'd like to access
            </p>
          </div>

          {/* Account Count Badge */}
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {users.length} {users.length === 1 ? 'Account' : 'Accounts'} available
            </span>
          </div>

          {/* Account List */}
          <div className="space-y-3">
            {users.map((user, i) => (
              <div
                key={i}
                className={`group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer overflow-hidden ${
                  isProcessing && selectedUser?.customer_code === user.customer_code 
                    ? 'opacity-50 pointer-events-none' 
                    : ''
                }`}
                onClick={() => handleClick(user.customer_code, user)}
              >
                <div className="p-4 flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-adron-green to-adron-green-dark h-14 w-14 rounded-full flex items-center justify-center shadow-md">
                      {user.profile_image ? (
                        <img 
                          src={user.profile_image} 
                          alt={`${user.first_name} ${user.last_name}`}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <User2 className="h-6 w-6 text-white" />
                          <span className="text-xs font-medium text-white mt-0.5">
                            {getUserInitials(user.first_name, user.last_name)}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Online indicator - optional */}
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Account Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {user.first_name} {user.last_name}
                      </h3>
                      {user.is_default && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    
                    {/* Customer Code with icon */}
                    <div className="flex items-center gap-1.5 mb-1">
                      <Building2 className="h-3.5 w-3.5 text-gray-400" />
                      <p className="text-sm text-gray-500 font-mono">
                        {user.customer_code || "No customer code assigned"}
                      </p>
                    </div>

                    {/* Email if available */}
                    {user.email && (
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* Chevron Icon */}
                  <div className="text-gray-300 group-hover:text-adron-green transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Having trouble selecting an account?{' '}
              <button 
                onClick={() => navigate('/support')}
                className="text-adron-green font-medium hover:underline"
              >
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        user={selectedUser}
        onComplete={handleLoginComplete}
      />

      {/* Add these styles to your global CSS or tailwind config */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AccountSelect;