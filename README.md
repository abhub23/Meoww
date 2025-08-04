# Bun Monorepo — Client & Server

This is a simple monorepo setup using **Bun workspaces** with a `client/` and `server/`. It allows you to run both together using a single `bun run dev`.

---

## 📁 Folder Structure

```
.
├── bunfig.toml
├── package.json
├── client/
│   └── package.json
├── server/
│   └── package.json
```

---

## 🛠 Setup

### 1. Root `package.json`

```json
{
  "private": true,
  "workspaces": ["client", "server"],
  "scripts": {
    "dev": "bun run dev --filter=client & bun run dev --filter=server"
  }
}
```

### 2. Root `bunfig.toml`

```toml
[install]
workspaceRoot = true
```

> This tells Bun that this is the root of your workspace and allows proper linking and hoisting.

---

## 📦 Install Dependencies

From the root folder, run:

```bash
bun install
```

This installs all dependencies and links the workspaces correctly.

---

## 🚀 Start Development Servers

To run both the client and server concurrently:

```bash
bun run dev
```

This command will:
- Run `client`'s dev script (`bun run dev` inside `client/`)
- Run `server`'s dev script (`bun run dev` inside `server/`)
- Use Bun’s `--filter` flag to target specific workspaces

---

## 🔧 Example Workspace Setup

### `client/package.json`

```json
{
  "name": "client",
  "scripts": {
    "dev": "bun --hot src/index.ts"
  }
}
```

> Replace `src/index.ts` with your actual entry file (e.g., if using React or Vite, change accordingly).

---

### `server/package.json`

```json
{
  "name": "server",
  "scripts": {
    "dev": "bun src/server.ts"
  }
}
```

> Replace `src/server.ts` with your actual backend entry point (e.g., Express, Hono, Elysia, etc.)

---

## ✅ Notes

- You only need to run `bun install` once at the root.
- Bun will create a single `bun.lockb` and manage dependencies across workspaces.
- Workspaces can depend on each other, and Bun will link them automatically.
- You can use `--filter=client` or `--filter=server` to run tasks in specific workspaces.

---