import { execSync } from 'child_process';

try {
  const output = execSync('npx vite build', { encoding: 'utf-8' });
  console.log(output);
} catch (error) {
  console.error('BUILD FAILED:');
  console.error(error.stdout);
  console.error(error.stderr);
}
