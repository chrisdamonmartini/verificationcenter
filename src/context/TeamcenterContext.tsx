import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define connection status types
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

// Interface for Teamcenter connection settings
export interface TeamcenterSettings {
  serverUrl: string;
  username: string;
  password: string;
  instance: string;
  useSSO: boolean;
}

// Interface for Teamcenter integration settings
export interface IntegrationSettings {
  syncRequirements: boolean;
  syncTestData: boolean;
  syncVerificationMatrix: boolean;
  autoSync: boolean;
  syncInterval: number; // in minutes
  enableBidirectionalSync: boolean;
}

// Interface for Teamcenter context
interface TeamcenterContextType {
  connectionStatus: ConnectionStatus;
  connectionError: string | null;
  lastSyncTime: Date | null;
  isAuthenticated: boolean;
  settings: TeamcenterSettings;
  integrationSettings: IntegrationSettings;
  updateSettings: (settings: Partial<TeamcenterSettings>) => void;
  updateIntegrationSettings: (settings: Partial<IntegrationSettings>) => void;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  syncData: () => Promise<boolean>;
}

// Create context with default values
const TeamcenterContext = createContext<TeamcenterContextType | undefined>(undefined);

// Provider component
export const TeamcenterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Connection status state
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Connection settings
  const [settings, setSettings] = useState<TeamcenterSettings>({
    serverUrl: 'https://teamcenter.example.com',
    username: '',
    password: '',
    instance: 'production',
    useSSO: false
  });
  
  // Integration settings
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    syncRequirements: true,
    syncTestData: true,
    syncVerificationMatrix: true,
    autoSync: false,
    syncInterval: 60,
    enableBidirectionalSync: false
  });

  // Update settings function
  const updateSettings = (newSettings: Partial<TeamcenterSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Update integration settings function
  const updateIntegrationSettings = (newSettings: Partial<IntegrationSettings>) => {
    setIntegrationSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Mock connection function
  const connect = async (): Promise<boolean> => {
    try {
      if (!settings.serverUrl || !settings.username || (!settings.password && !settings.useSSO)) {
        setConnectionError('Missing connection information');
        setConnectionStatus('error');
        return false;
      }

      setConnectionStatus('connecting');
      setConnectionError(null);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        setConnectionStatus('connected');
        setIsAuthenticated(true);
        setLastSyncTime(new Date());
        return true;
      } else {
        setConnectionStatus('error');
        setConnectionError('Failed to connect to Teamcenter server');
        return false;
      }
    } catch (error) {
      setConnectionStatus('error');
      setConnectionError(`Connection error: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  // Disconnect function
  const disconnect = () => {
    setConnectionStatus('disconnected');
    setIsAuthenticated(false);
  };

  // Mock sync function
  const syncData = async (): Promise<boolean> => {
    if (connectionStatus !== 'connected') {
      setConnectionError('Cannot sync: Not connected to Teamcenter');
      return false;
    }

    try {
      // Mock sync delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update last sync time
      const now = new Date();
      setLastSyncTime(now);
      return true;
    } catch (error) {
      setConnectionError(`Sync error: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  return (
    <TeamcenterContext.Provider
      value={{
        connectionStatus,
        connectionError,
        lastSyncTime,
        isAuthenticated,
        settings,
        integrationSettings,
        updateSettings,
        updateIntegrationSettings,
        connect,
        disconnect,
        syncData
      }}
    >
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