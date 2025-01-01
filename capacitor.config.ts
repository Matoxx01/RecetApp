import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.recetapp.recetapp',
  appName: 'RecetApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resize: 'none',
      scrollAssist: true,
      scrollPadding: true
    },
  },
};

export default config;