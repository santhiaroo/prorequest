import { createContext, useContext, useState, useEffect } from 'react';
import { Workspace } from '@/types';
import { NewWorkspaceDialog } from '@/components/workspaces/new-workspace-dialog';
import { TrialExpiredDialog } from '@/components/workspaces/trial-expired-dialog';

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  setCurrentWorkspace: (workspace: Workspace) => void;
  openNewWorkspaceDialog: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

// Mock workspaces with trial status
const mockWorkspaces: Workspace[] = [
  {
    id: 'WRK-001',
    name: 'Acme Agency',
    domain: 'acme.prorequests.com',
    trialEndsAt: null, // Regular workspace
    branding: {
      logo: 'https://via.placeholder.com/150',
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
      },
    },
  },
  {
    id: 'WRK-002',
    name: 'Design Studio Pro',
    domain: 'designstudio.prorequests.com',
    trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
    branding: {
      logo: 'https://via.placeholder.com/150',
      colors: {
        primary: '#16a34a',
        secondary: '#0891b2',
      },
    },
  },
  {
    id: 'WRK-003',
    name: 'Creative Labs',
    domain: 'creativelabs.prorequests.com',
    trialEndsAt: new Date(Date.now() - 1000 * 60 * 60), // Trial expired 1 hour ago
    branding: {
      logo: 'https://via.placeholder.com/150',
      colors: {
        primary: '#dc2626',
        secondary: '#ea580c',
      },
    },
  },
];

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(mockWorkspaces[0]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
  const [showNewWorkspaceDialog, setShowNewWorkspaceDialog] = useState(false);
  const [showTrialExpiredDialog, setShowTrialExpiredDialog] = useState(false);

  // Check if current workspace trial has expired
  useEffect(() => {
    if (currentWorkspace?.trialEndsAt) {
      const now = new Date();
      if (now > currentWorkspace.trialEndsAt) {
        setShowTrialExpiredDialog(true);
      }
    }
  }, [currentWorkspace]);

  const openNewWorkspaceDialog = () => {
    setShowNewWorkspaceDialog(true);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        setCurrentWorkspace: (workspace: Workspace) => {
          setCurrentWorkspace(workspace);
          setWorkspaces((prev) => {
            const exists = prev.some((w) => w.id === workspace.id);
            if (!exists) {
              return [...prev, workspace];
            }
            return prev;
          });
        },
        openNewWorkspaceDialog,
      }}
    >
      {children}
      <NewWorkspaceDialog
        open={showNewWorkspaceDialog}
        onOpenChange={setShowNewWorkspaceDialog}
      />
      <TrialExpiredDialog
        open={showTrialExpiredDialog}
        onOpenChange={setShowTrialExpiredDialog}
        workspace={currentWorkspace}
      />
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}