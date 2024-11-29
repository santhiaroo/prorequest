import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme-provider';
import { WorkspaceProvider } from '@/providers/workspace-provider';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="prorequests-theme">
        <WorkspaceProvider>
          <AppLayout />
          <Toaster />
        </WorkspaceProvider>
      </ThemeProvider>
    </Router>
  );
}