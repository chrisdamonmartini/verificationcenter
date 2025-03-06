import React, { createContext, useContext, useState, ReactNode } from 'react';
import { syncWithTeamcenter } from '../data/teamcenter';

// Define connection status types
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

// Interface for Teamcenter connection settings
export interface TeamcenterSettings {
  serverUrl: string;
  username: string;
  password: string;
  autoSync: boolean;
  syncInterval: number; // in minutes
}

// Interface for Teamcenter integration settings
export interface IntegrationSettings {
  importRequirements: boolean;
  exportRequirements: boolean;
  importTestCases: boolean;
  exportTestCases: boolean;
  syncVerificationResults: boolean;
  autoMapFields: boolean;
}

// Interface for Teamcenter context
interface TeamcenterContextType {
  connectionStatus: ConnectionStatus;
  errorMessage: string | null;
  lastSyncTime: Date | null;
  isAuthenticated: boolean;
  settings: TeamcenterSettings;
  integrationSettings: IntegrationSettings;
  updateSettings: (newSettings: Partial<TeamcenterSettings>) => void;
  updateIntegrationSettings: (newSettings: Partial<IntegrationSettings>) => void;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  syncData: () => Promise<{
    success: boolean;
    message: string;
  }>;
}

// Default settings
const defaultSettings: TeamcenterSettings = {
  serverUrl: 'https://teamcenter.example.com/api',
  username: '',
  password: '',
  autoSync: false,
  syncInterval: 60,
};

const defaultIntegrationSettings: IntegrationSettings = {
  importRequirements: true,
  exportRequirements: true,
  importTestCases: true,
  exportTestCases: false,
  syncVerificationResults: true,
  autoMapFields: true,
};

// Create context with default values
const TeamcenterContext = createContext<TeamcenterContextType | undefined>(undefined);

// Provider component
export const TeamcenterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<TeamcenterSettings>(defaultSettings);
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>(defaultIntegrationSettings);

  // Update settings
  const updateSettings = (newSettings: Partial<TeamcenterSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Update integration settings
  const updateIntegrationSettings = (newSettings: Partial<IntegrationSettings>) => {
    setIntegrationSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Connect to Teamcenter
  const connect = async (): Promise<boolean> => {
    if (!settings.serverUrl || !settings.username || !settings.password) {
      setErrorMessage('Server URL, username, and password are required');
      return false;
    }

    try {
      setConnectionStatus('connecting');
      setErrorMessage(null);
      
      // Simulate API connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful connection
      setConnectionStatus('connected');
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      return false;
    }
  };

  // Disconnect from Teamcenter
  const disconnect = () => {
    setConnectionStatus('disconnected');
    setIsAuthenticated(false);
  };

  // Sync data with Teamcenter
  const syncData = async (): Promise<{ success: boolean; message: string }> => {
    if (connectionStatus !== 'connected') {
      return { 
        success: false, 
        message: 'Cannot sync while disconnected' 
      };
    }

    try {
      // Call the mock sync function
      const result = await syncWithTeamcenter();
      
      if (result.status === 'success') {
        setLastSyncTime(new Date());
        return { 
          success: true, 
          message: 'Sync completed successfully' 
        };
      } else {
        throw new Error('Sync failed');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Sync failed');
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error during sync'
      };
    }
  };

  // Context value
  const value: TeamcenterContextType = {
    connectionStatus,
    errorMessage,
    lastSyncTime,
    isAuthenticated,
    settings,
    integrationSettings,
    updateSettings,
    updateIntegrationSettings,
    connect,
    disconnect,
    syncData,
  };

  return (
    <TeamcenterContext.Provider value={value}>
      {children}
    </TeamcenterContext.Provider>
  );
};

// Hook for using the Teamcenter context
export const useTeamcenter = (): TeamcenterContextType => {
  const context = useContext(TeamcenterContext);
  
  if (context === undefined) {
    throw new Error('useTeamcenter must be used within a TeamcenterProvider');
  }
  
  return context;
};

export default TeamcenterContext; 