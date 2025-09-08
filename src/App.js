import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Button,
  Drawer,
  DrawerHeader,
  DrawerBody,
  Switch,
  Text,
  Link
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons'; // Optional: for close icon
import { useState, useEffect } from 'react';
import Romanizer from './components/Romanizer';

// Add a simple hamburger icon as a React component
const HamburgerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
    <rect x="4" y="7" width="20" height="2" rx="1" fill="currentColor"/>
    <rect x="4" y="13" width="20" height="2" rx="1" fill="currentColor"/>
    <rect x="4" y="19" width="20" height="2" rx="1" fill="currentColor"/>
  </svg>
);

function App() {
  const [isDarkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('isDarkMode');
    return stored === 'true';
  });
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const currentTheme = isDarkMode ? webDarkTheme : webLightTheme;

  const handleThemeToggle = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <FluentProvider theme={currentTheme}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Hamburger Menu Button */}
        <div style={{ padding: '12px', textAlign: 'right' }}>
          <Button
            appearance="subtle"
            icon={<HamburgerIcon />}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Themes"
            style={{ minWidth: 0, padding: 8, borderRadius: 6 }}
          />
        </div>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'auto', height: '100%' }}>
          <Romanizer />
        </main>

        {/* Drawer */}
        <Drawer
          open={isDrawerOpen}
          position="end"
          onOpenChange={(event, data) => setDrawerOpen(data.open)}
        >
          <DrawerHeader
            header={<strong>App Settings</strong>}
            action={
              <Button appearance="transparent" onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
            }
          />
          <DrawerBody>
            <Switch
              checked={isDarkMode}
              onChange={handleThemeToggle}
              label="Dark Mode"
            />
            <br /><br />
            <Text size={200}>
              Using code from <Link href="https://gimite.net/roman2hangul">gimite.net/roman2hangul</Link>
            </Text>
          </DrawerBody>
        </Drawer>
      </div>
    </FluentProvider>
  );
}

export default App;