# 📤 Next.js R2 File Uploader

A simple, modern file uploader built with [Next.js](https://nextjs.org) App Router that lets users upload files to a [Cloudflare R2](https://developers.cloudflare.com/r2/) bucket using the S3-compatible API.

---

## ✨ Features

- Drag & drop or click-to-select file uploads
- Uploads **images**, **PDFs**, **Word**, and **Excel** files
- Supports files up to **100MB**
- Upload only triggered when user clicks "Upload"
- Uses `@aws-sdk/client-s3` to talk to R2 (S3-compatible)
- Styled using [shadcn/ui](https://ui.shadcn.com)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
