# Bus Tracking Automation 🚌🤖

An automated tracking system that fetches real-time coordinates for specific buses from an external API and logs them into a Supabase database for historical analysis.

## 🚀 Features

- **Automated Tracking**: Uses `node-cron` to fetch data every 5 minutes during service hours (08:00 - 19:59).
- **Data Persistence**: Stores latitude, longitude, speed, and conductor details in Supabase.
- **GitHub Actions Integration**: Includes a workflow for automated runs on GitHub infrastructure.
- **Health Check**: A simple Express endpoint (`/health`) to monitor if the service is alive.
- **SSL Bypass**: Automatically handles untrusted certificates for the tracking API.

## 🛠️ Prerequisites

- **Node.js**: v18 or higher.
- **Supabase**: A project with a table named `bus_tracking`.
- **Environment Variables**: See the configuration section below.

## 📋 Table Schema

Ensure your Supabase table `bus_tracking` has the following columns:

| Column Name       | Type                 |
| :---------------- | :------------------- |
| `id`              | `uuid` (Primary Key) |
| `created_at`      | `timestamptz`        |
| `lattitude`       | `text`               |
| `longitude`       | `text`               |
| `vehicleNo`       | `text`               |
| `speed`           | `text`               |
| `routename`       | `text`               |
| `receivedDate`    | `text`               |
| `conductorname`   | `text`               |
| `conductornumber` | `text`               |

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_or_service_key
BUS_TRACKING_API=https://gsrtctracking.amnex.co.in/VehicleTracking/GetVehicleData?BusNo=
PORT=3000
```

## 📦 Installation

1.  **Clone the repository**:

    ```bash
    git clone <your-repo-url>
    cd bus-tracking-automation
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run locally**:
    ```bash
    node index.js
    ```

## 🤖 GitHub Actions Setup

The project includes a `.github/workflows/bus-tracker.yml` file. To use it:

1.  Go to your GitHub Repository **Settings > Secrets and variables > Actions**.
2.  Add the following secrets:
    - `SUPABASE_URL`
    - `SUPABASE_KEY`
    - `BUS_TRACKING_API`

The workflow will automatically run based on the schedule defined in the YAML file.

## 📄 License

This project is for personal use and automation purposes.
