# HOTEL-POS System

## Summary

The HOTEL-POS System is a cutting-edge application designed to streamline the operations of a restaurant for hotel/cafe owners. It provides real-time table status updates, an intuitive admin dashboard, and comprehensive waiter management. With integrated payment processing, printable receipts, and dynamic data visualization, this system enhances both management efficiency and customer satisfaction.

## Features

- **Real-time Communication (Socket) for Table Status** ⚡⚡
  - Keep track of table status with real-time updates.
  
- **Waiter Login**
  - Exclusive waitstaff access to their own dashboard.
  
- **Payment Integration with Razorpay** ⚡⚡
  - Seamless online payment processing.
  
- **Cash Receipt Printout (PDF)** ⚡⚡
  - Generate PDF receipts for cash transactions.
  
- **Admin Dashboard** ⚡⚡
  - Comprehensive control panel for administrators.
  
- **Track Highest Selling Items** ⚡
  - Identify and analyze top-selling menu items.
  
- **Fully Dynamic System** ⚡
  - Adaptable to changing needs and scalable.
  
- **Loading Animations**
  - Smooth transition animations for a better user experience.
  
- **Authentication** ⚡⚡
  - Secure login and user access control.
  
- **Table Status Management**
  - Manage table occupancy and availability.
  
- **Receipt Contents**
  - Detailed receipts including date, time, waiter name, items, total cost, and GST, prominently featuring the hotel name. ⚡⚡⚡⚡⚡⚡⚡
  
- **Admin Adds Waiters**
  - Functionality for admin to add new waitstaff.
  
- **Create Admin Accounts**
  - Ability to create new admin users.
  
- **Frammer Motion**
  - Enhanced user experience with reactive animations.

## Table Management

- **Status:** [Vacant, Occupied]
- **Seating Capacity:** [2, 4, 6]
- **Table Number:** Manually assigned

## Order Receipt

- **Table Number**
- **Current Time and Date**
- **Waiter Name and Hotel Name**
- **Items Consumed**
- **QR Code for Review:**
  - Leads to a form for customer feedback and collects email addresses to send follow-up emails.

## Waiter Profile (Schema)

- **Name, Email, Password (Editable), DOB, Contact Number**
- **Total Customers Served**
- **Date of Joining**
- **Address and Aadhar Card Details**
- **Document IDs (Photo links accessible only to admin)**

## Admin Dashboard

- **Login, Logout, Create Admin Accounts**
- **Create New Entries: (Cuisine, Waiter, Table)**
- **Remove Waiters**
- **Total Waiters Count**
- **Monthly Sales Data Chart**
- **Request Waiter Documents**
- **Send Promotional Emails to Customers**

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

- Node.js
- Socket.IO
- Razorpay account
- PDF generation library
- Animation library (Frammer Motion)
- Database (e.g., MongoDB)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ONKAr156/hotel-pos
    ```

2. Navigate to the project directory:

    ```bash
     cd client
     cd server
    ```

3. Install the dependencies:

    ```bash
    npm i
    ```

4. Set up the environment variables (e.g., for Razorpay keys):

    ```bash
    touch .env
    ```

   Add your environment variables in the `.env` file.

5. Run the application:

    ```bash
   client: npm run dev
   server: nodemon
    ```

### Usage

- Access the admin dashboard at `/admin-login`.
- Waiters can log in at `/`.
- Real-time updates will be visible on the user's dashboard.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

### Connect me
borgaonkar1998@gmail.com
