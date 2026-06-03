BAD1 Hackathon | Track 2 - 30.05.26
<br>
<br>
Sarib Samdani 
<br>
Cihan Bayat 
<br>
Ahmet Diler


🚨 The Problem: Private Capital Not Flowing to Early-Stage Startups

Private capital from high-net-worth individuals, family businesses, and corporates is not flowing into early-stage startups. Risk aversion, lack of appropriate incentive structures, and closed networks keep both capital and expertise out of reach for most founders.

At the same time, the networks that connect founders to investors and mentors remain exclusive and fragmented — built on personal relationships that take years to develop and are largely inaccessible to founders who are new to Berlin or come from non-traditional backgrounds. Exit value is leaving Europe as growth capital dries up at the scaling stage.

🎯 Track Guidance

Build something that creates a new, reliable channel between private capital and early-stage founders — one that does not depend on existing relationships. Solutions could address investor access, risk structuring, network transparency, or the reinvestment of founder expertise and capital into the next generation of Berlin startups. The goal is to democratise access, not to replicate what already exists.

💡 Example Direction (from the Ideation Workshop)

A citizen crowdfunding-to-investment platform with integrated tax benefit structures, making startup investment accessible to a much broader pool of private investors — or a high-density event format with open access that breaks existing network patterns and creates genuine encounters between founders and investors who would not otherwise meet.

---

# 🚀 Getting Started

Follow these steps to set up and run the project locally.

## 📋 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` (or [Bun](https://bun.sh/) if preferred)

## ⚙️ Installation

1. Clone the repository and navigate to the project root:
   ```bash
   git clone <repository-url>
   cd berlin-startup-showcase
   ```

2. Install dependencies:
   * Using **npm**:
     ```bash
     npm install
     ```
   * Using **Bun**:
     ```bash
     bun install
     ```

## 🗄️ Database Setup

This project uses an SQLite database with Drizzle ORM.

1. Create the `data` directory in the project root (required for SQLite storage):
   ```bash
   mkdir -p data
   ```

2. Generate/push the database schema:
   * Using **npm**:
     ```bash
     npx drizzle-kit push
     ```
   * Using **Bun**:
     ```bash
     bunx drizzle-kit push
     ```

3. Seed the database with sample cycle, startup, and comment data:
   * Using **npm**:
     ```bash
     DATABASE_URL=file:./data/app.db npx tsx src/lib/db/seed.ts
     ```
   * Using **Bun**:
     ```bash
     DATABASE_URL=file:./data/app.db bun src/lib/db/seed.ts
     ```

## 💻 Running the App

Start the development server:

* Using **npm**:
  ```bash
  npm run dev
  ```
* Using **Bun**:
  ```bash
  bun run dev
  ```

Once started, open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) in your browser to view the application.

