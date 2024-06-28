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

## Screen-shots
### Waiter 

- Waiter Login

![Screenshot 2024-06-27 101523](https://github.com/ONKAr156/hotel-pos/assets/125107067/4f5f0738-6486-4b17-a632-785fd948026a)

![Screenshot 2024-06-27 101555](https://github.com/ONKAr156/hotel-pos/assets/125107067/71a09b27-721e-4fc6-8014-a4217dccb31b)

- Table selection

![Screenshot 2024-06-27 101712](https://github.com/ONKAr156/hotel-pos/assets/125107067/48317291-a533-4eba-9633-3caf522e2bf8)

- Order 

![Screenshot 2024-06-27 101822](https://github.com/ONKAr156/hotel-pos/assets/125107067/1eb99849-4e44-4902-bde7-9236b1d6f947)

![Screenshot 2024-06-27 101901](https://github.com/ONKAr156/hotel-pos/assets/125107067/76d0209f-135e-40d1-96f3-3a002ae1ed1a)

![Screenshot 2024-06-27 101932](https://github.com/ONKAr156/hotel-pos/assets/125107067/d342f7b2-987c-40ab-b8d6-7fb8bf279cc3)

![Screenshot 2024-06-27 102009](https://github.com/ONKAr156/hotel-pos/assets/125107067/5adf9281-9c2e-408b-9850-f922e8640f2f)

![Screenshot 2024-06-27 102035](https://github.com/ONKAr156/hotel-pos/assets/125107067/a1f8670a-c0e5-4cac-9599-e89014dfec61)

- Logout

![Screenshot 2024-06-27 102114](https://github.com/ONKAr156/hotel-pos/assets/125107067/0d21fee9-0d38-4d08-bdf6-8d5899ce7e5d)

- Responsive

![Screenshot 2024-06-27 102156](https://github.com/ONKAr156/hotel-pos/assets/125107067/8b0721df-5d54-4e4b-a472-28328d6df289)

![Screenshot 2024-06-27 102232](https://github.com/ONKAr156/hotel-pos/assets/125107067/6054fbe7-a28e-4dca-8aa6-c91197dcdf87)

### Admin

- login

![Screenshot 2024-06-27 100309](https://github.com/ONKAr156/hotel-pos/assets/125107067/6e798127-005c-41f3-9b87-274cb09a3f07)

![Screenshot 2024-06-27 100458](https://github.com/ONKAr156/hotel-pos/assets/125107067/6b5c24c2-f9ff-44d9-88ab-1605fb132c4e)

- Home 

![Screenshot 2024-06-27 100531](https://github.com/ONKAr156/hotel-pos/assets/125107067/fa577c29-b9da-48bf-ab59-4c3239ecfb96)

- waiter details 

![Screenshot 2024-06-27 100602](https://github.com/ONKAr156/hotel-pos/assets/125107067/df47696e-f3ec-427c-b456-059842aca315)

![Screenshot 2024-06-27 101426](https://github.com/ONKAr156/hotel-pos/assets/125107067/c67d6564-0c2e-49d7-9cc3-0b9a5e156763)

![Screenshot 2024-06-27 101452](https://github.com/ONKAr156/hotel-pos/assets/125107067/72485319-2120-4817-9a5d-cbeea99cdab3)



- Waiter dashboard (Admin)

![Screenshot 2024-06-27 100656](https://github.com/ONKAr156/hotel-pos/assets/125107067/d0ded35d-2db4-4596-b814-bd8891783f34)

- Create New Waiter

![Screenshot 2024-06-27 100723](https://github.com/ONKAr156/hotel-pos/assets/125107067/6fc24193-556c-4e5e-92ae-7fc659cd62ae)

- Add new Cuisine

![Screenshot 2024-06-27 100807](https://github.com/ONKAr156/hotel-pos/assets/125107067/1cf84dd4-3a39-45aa-8e92-43e17ebc4df8)

![Screenshot 2024-06-27 100855](https://github.com/ONKAr156/hotel-pos/assets/125107067/46a47575-0065-4d14-8bb2-7dcc30b933a4)

- Add new Table and table capacity

![Screenshot 2024-06-27 100926](https://github.com/ONKAr156/hotel-pos/assets/125107067/f04436e9-a71e-48c0-b7ef-be537a605b1c)

- Live order

![Screenshot 2024-06-27 101005](https://github.com/ONKAr156/hotel-pos/assets/125107067/8ed9f358-b438-46ee-82f9-e3b477baa3a0)

- Previous Order

![Screenshot 2024-06-27 101033](https://github.com/ONKAr156/hotel-pos/assets/125107067/d6be710e-d405-4ef3-a6e6-db90f029bedf)

![Screenshot 2024-06-27 101128](https://github.com/ONKAr156/hotel-pos/assets/125107067/94dacc91-6c71-4c09-82b1-f9115b12dbfb)

![Screenshot 2024-06-27 101224](https://github.com/ONKAr156/hotel-pos/assets/125107067/2a085955-ea74-4378-89f7-3b081cd0cd08)

- Print the order 

![Screenshot 2024-06-27 101253](https://github.com/ONKAr156/hotel-pos/assets/125107067/3b597154-d6af-4c2a-97b2-3535f0de27e5)

![Screenshot 2024-06-27 101347](https://github.com/ONKAr156/hotel-pos/assets/125107067/52b374e7-7b64-4390-b886-6d2332c4d86b)

















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
