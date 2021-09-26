import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Chakra UI用
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

ReactDOM.render(
  <React.StrictMode>
    {/* themeをセットしたChakraProviderで挟む */}
    {/* resetCSS={false}にすれば、デフォルトのCSSはリセットされない */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);