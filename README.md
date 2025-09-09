### Steps to Run the CNAPP Dashboard Locally

1. **Clone the repository**
   Open your terminal or command prompt and run:

   ```
   git clone <your-repo-link>
   ```

   This will download the project to your local machine.

2. **Navigate to the project folder**

   ```
   cd <project-folder-name>
   ```

   Replace `<project-folder-name>` with the folder that was created after cloning.

3. **Install dependencies**
   Run:

   ```
   npm install
   ```

   This will install all required packages.

4. **Start the development server**
   Run:

   ```
   npm start
   ```

   Open `http://localhost:3000` in your browser to view the dashboard.

5. **Using the Dashboard**

   * Search for widgets using the search bar.
   * Add new widgets using the “Add Widget ” button.(int the empty slot)
   * Add widgets to specific categories using category-level buttons.(near the search bar)
   * Maximum of 3 visible widgets per category.
   * Refresh using ⟳ or change the time range using the dropdown.

6. **Stopping the server**
   Press `Ctrl + C` in your terminal.

7. **Notes**

   * Node.js version v18 or above is recommended.
   * If `npm install` fails, delete `node_modules` and run `npm install` again.
