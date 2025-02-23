# Time Capsule - Secure File Storage

**Time Capsule** is a secure and organized platform that allows users to store files in a virtual "time capsule." Users can store important documents, media files, and other digital content securely, with the ability to retrieve them later. The platform offers a unique way to organize and protect your files while providing enhanced privacy and access control.

---

## **Project Overview**

### **Objective**:
To provide users with a secure and organized way to store digital files, protecting them with encryption, while also allowing users to access them at a later time or date, just like a "time capsule."

### **Core Features**:
1. **User Authentication**:
   - Secure user login and account creation.
   - Two-factor authentication (optional) for additional security.

2. **File Upload and Organization**:
   - Upload and store various file types (documents, photos, videos, etc.).
   - Organize files into custom folders and categories for easy retrieval.

3. **Time-Lock Feature**:
   - Set a specific date or time when your files can be unlocked and accessed.
   - Optionally encrypt files for added security.

4. **Secure Encryption**:
   - Advanced encryption techniques to ensure your files are protected.
   - Decrypt files only with the correct credentials or time unlock.

5. **Easy Access and Retrieval**:
   - Files can be accessed from any device securely once unlocked.
   - Notifications when files are available for retrieval.

---

## **Getting Started**
This section will guide you through setting up the Time Capsule project on your local machine.

### **Prerequisites**:
Ensure the following tools are installed:
- **Node.js** 
- **Git**

### **Installation Instructions**:

1. Clone the repository:
   ```bash
   git clone https://github.com/sarthakB-06/time-capsule.git
   ```
2. Navigate to project directory: ```bash
   cd Time-capsule ```
3. Installing depencencies for frontend and backend: ```
   npm install ```
4. Set up environment variables (such as MongoDB connection details) in the .env file.
5. Run the server: ```bash
  node src/index.js ```
   
---
 
## **Project Architecture**

### **Frontend**:
- Built with **React.js** for a seamless and interactive user interface.
- Styled using **Tailwind CSS** for responsive and customizable design.
- Features:
  - User authentication (login/sign-up).
  - File upload form and drag-and-drop support.
  - Dashboard for managing files and folders.
  - Time-lock settings for secure access.

### **Backend**:
- Built with **Node.js** and for handling API requests and server-side logic.
- Features:
  - API for file storage, retrieval, and encryption.
  - User authentication and session management.
  - Endpoints for managing time-lock functionality and folder organization.

### **Database**:
- **MongoDB** for storing user data, file metadata, folder structure, and time-lock details.

### **File Storage**:
- **AWS S3** for storing files securely in the cloud, ensuring scalable and reliable file storage.

### **Security**:
- **AES Encryption** for securely encrypting files before storing.
- **JWT Authentication** to ensure secure login and access control.
- **SSL/TLS** for secure communication between client and server.



---
   ## **Future Scope**
1. **File Versioning**:
    - Track and manage multiple versions of uploaded files.
2. **Gamification**:
   - Introduce gamification features, such as badges and rewards, for users who consistently use the platform, reach milestones, or engage with specific features.
3. **Collaborative Time Capsules**:
    - Allow users to share files with others securely and collaboratively.
4. **Mobile App**:
    - Develop a mobile app for easier access to files on the go.
5. **Advanced Encryption Options**:
    - Implement more encryption algorithms and allow users to choose their preferred encryption method.

---

## **Contributing**
If you'd like to contribute to Time Capsule, feel free to fork the repo and submit a pull request. Whether you're fixing bugs, adding new features, or improving documentation, all contributions are welcome!
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add feature description"
   git push origin feature-name   ```
4. Submit a pull request.

---
   
