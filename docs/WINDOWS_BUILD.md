# Windows Build / EPERM Fix

If you hit `EPERM: operation not permitted, unlink` during `prisma generate` or `npm run build`:

1. **Stop all Node processes**:
   - Close all terminals running `npm run dev`, `next dev`, etc.
   - If needed: `taskkill /F /IM node.exe`

2. **Clean reinstall** (run from repo root in PowerShell or CMD):
   ```cmd
   rmdir /s /q node_modules
   del package-lock.json
   npm cache verify
   npm install
   npx prisma generate
   npm run build
   ```

3. Confirm `npm run build` completes successfully.
