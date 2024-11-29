import { WorkspaceCard } from './workspace-card';
import { mockWorkspaces } from './mock-data';

export function WorkspaceList() {
  const handleManage = (workspace: any) => {
    console.log('Manage workspace:', workspace);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockWorkspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspace={workspace}
          onManage={handleManage}
        />
      ))}
    </div>
  );
}