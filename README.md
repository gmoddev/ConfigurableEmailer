# Mass Emailer

## Configurable via a Nice UI

### Not_Lowest

### Description

Mass Emailer is a tool that helps you send bulk emails easily. With a simple and modern web interface, you can configure recipients, email content, and schedule emails to be sent automatically.

### Features

- **Easy and modern UI for configuring your emails**
- *Simple to set up and use*

# Setup - (Windows)

1. **Download the Source Code**
   - Download the source code and extract it into an empty folder.

2. **Install All Packages**
   - Open a command prompt in the project directory.
   - Run the following command to install all necessary packages:
     ```bash
     npm i
     ```

3. **Create an `.env` File**
   - In the root directory of the project, create a file named `.env`.
   - Add the following lines to the `.env` file:
     ```env
     senderEmail=your_email@gmail.com
     senderPassword=your_password
     ```
   - Replace `your_email@gmail.com` with your actual email address.
   - Replace `your_password` with your actual email password.

4. **Run the Application**
   - Start the server by running the following command:
     ```bash
     node index.js
     ```
   - Open your web browser and go to `http://localhost:3000` to access the Mass Emailer UI.

5. **Configure Your Emails**
   - Use the web interface to set up your email recipients, subject, body, and schedule.

6. **Send Emails**
   - You can send emails immediately or schedule them using the UI.

# Setup - (Linux)

1. **Download the Source Code**
   - Download the source code and extract it into an empty directory.

2. **Install Node.js and npm**
   - Ensure you have Node.js and npm installed. You can install them using the following commands:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```
   - Verify the installation by running:
     ```bash
     node -v
     npm -v
     ```

3. **Install All Packages**
   - Navigate to the project directory in your terminal.
   - Run the following command to install all necessary packages:
     ```bash
     npm i
     ```

4. **Create an `.env` File**
   - In the root directory of the project, create a file named `.env`.
   - Add the following lines to the `.env` file:
     ```env
     senderEmail=your_email@gmail.com
     senderPassword=your_password
     ```
   - Replace `your_email@gmail.com` with your actual email address.
   - Replace `your_password` with your actual email password.

5. **Run the Application**
   - Start the server by running the following command:
     ```bash
     node index.js
     ```
   - Open your web browser and go to `http://localhost:3000` to access the Mass Emailer UI.

6. **Configure Your Emails**
   - Use the web interface to set up your email recipients, subject, body, and schedule.

7. **Send Emails**
   - You can send emails immediately or schedule them using the UI.

## License

This project is licensed under the MIT License.
