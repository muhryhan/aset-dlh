# Pendataan Aset Dinas Lingkungan Hidup Kota Palu

ASET-DLH
├── node_modules
├── public
│ └── images/
├── src
│ ├── components
│ │ ├── auth/
│ │ ├── cards/
│ │ ├── common/
│ │ ├── form/
│ │ ├── formDisable/
│ │ ├── formInput/
│ │ ├── header/
│ │ ├── loading/
│ │ ├── modals/
│ │ ├── scan/
│ │ ├── tables/
│ │ │ └──service
│ │ │  ├── ServiceKendaraanTable.tsx
│ │ └── AssetTable (karena semua tabel fungsinya sama, maka diapakaikan ini)
│ │ ├── ui/
│ │ └── UserProfile/
│ ├── config/
│ ├── context/
│ ├── handler/
│ │ └── handleExportExcel
│ │ └── handleExportPdf
│ ├── hooks/
│ │ └── usePagination
│ │ └── useFetch
│ ├── icons/
│ ├── layout/
│ │ ├── AppHeader.tsx
│ │ ├── AppLayout.tsx
│ │ ├── AppSidebar.tsx
│ │ └── Backdrop.tsx
│ ├── pages/
│ │ └──service
│ │  ├── ServiceKendaraan.tsx
│ ├── routes/
│ ├── services/
│ ├── types/
│ ├── utils/
│ │ └── dateUtils
│ ├── App.tsx
│ ├── main.tsx
│ ├── index.css
│ ├── protectedRoute.tsx
│ ├── svg.d.ts
│ └── vite-env.d.ts
├── .env
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── index.html
├── license.md
├── package-lock.json
├── package.json
├── postcss.config.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/muhryhan/aset-dlh.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/muhryhan/aset-dlh/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

---

## Overview

TailAdmin provides essential UI components and layouts for building feature-rich, data-driven admin dashboards and control panels. It's built on:

- React 18 (create-react-app)
- TypeScript
- Tailwind CSS

### Quick Links

- [✨ Visit Website](https://tailadmin.com)
- [📄 Documentation](https://tailadmin.com/docs)
- [⬇️ Download](https://tailadmin.com/download)
- [🖌️ Figma Design File (Community Edition)](https://www.figma.com/community/file/1214477970819985778)
- [⚡ Get PRO Version](https://tailadmin.com/pricing)

### Other Versions

- [HTML Version](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template)
- [Next.js Version](https://github.com/TailAdmin/free-nextjs-admin-dashboard)
- [Vue.js Version](https://github.com/TailAdmin/vue-tailwind-admin-dashboard)

## Installation

### Prerequisites

To get started with TailAdmin, ensure you have the following prerequisites installed and set up:

- Node.js 18.x or later (recommended to use Node.js 20.x or later)

### Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/TailAdmin/free-react-tailwind-admin-dashboard.git
```

> Windows Users: place the repository near the root of your drive if you face issues while cloning.

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

   > On `npm` some included packages can cause peer-deps issue with React 18 while installing.
   >
   > Use the `--legacy-peer-deps` flag, at the end of the installation command, as a workaround for that.

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Components

TailAdmin is a pre-designed starting point for building a web-based dashboard using React.js and Tailwind CSS. The template includes:

- Sophisticated and accessible sidebar
- Data visualization components
- Prebuilt profile management and 404 page
- Tables and Charts(Line and Bar)
- Authentication forms and input elements
- Alerts, Dropdowns, Modals, Buttons and more
- Can't forget Dark Mode 🕶️

All components are built with React and styled using Tailwind CSS for easy customization.
