/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Get folder name from terminal argument
const folderName = process.argv[2];
if (!folderName) {
  console.error('Please provide a folder name');
  process.exit(1);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const screenPath = path.join(__dirname, `../src/screens/${capitalizeFirstLetter(folderName)}`);

// Create the screen folder
fs.mkdir(screenPath, { recursive: true }, (err) => {
  if (err) throw err;
  console.log(`Folder ${folderName} created successfully`);

  const fileName = capitalizeFirstLetter(folderName);

  // Main Screen Component: index.tsx
  const screenComponent = `import AppBar from '@src/components/AppBar';
  import { BaseLayout } from '@src/components/BaseLayout/BaseLayout';
  import { Text } from '@src/components/Text';
  import React from 'react';
  import { StyleSheet } from 'react-native';

const ${fileName} = () => {
  return (
    <BaseLayout>
      <AppBar />
      <Text preset="p">OrderDetails Screen</Text>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(${fileName});
`;

  fs.writeFileSync(path.join(screenPath, `index.tsx`), screenComponent);

  // Update index.ts in the screens folder
  const exportStatement = `export { default as ${fileName} } from './${fileName}';\n`;

  fs.appendFile(path.join(__dirname, `../src/screens/index.ts`), exportStatement, (err) => {
    if (err) throw err;
    console.log(`${fileName} added to index.ts`);
  });
});
