# API Endpoints

## Description
This document provides a detailed description of the API endpoints for the backend service. Each endpoint includes information about the request and response formats.

## Endpoints

### User Endpoints

#### 1. Register User
- **URL:** `/api/users/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request:**
    ```json
    {
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "phoneNo": "1234567890",
        "password": "password123",
        "role": "user"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Account created successfully",
        "success": true
    }
    ```

#### 2. Login User
- **URL:** `/api/users/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123",
        "role": "user"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Welcome back John Doe",
        "user": {
            "_id": "user_id",
            "fullName": "John Doe",
            "email": "john.doe@example.com",
            "phoneNo": "1234567890",
            "role": "user",
            "profile": {}
        },
        "success": true
    }
    ```

#### 3. Logout User
- **URL:** `/api/users/logout`
- **Method:** `GET`
- **Description:** Logs out a user.
- **Request:** `N/A`
- **Response:**
    ```json
    {
        "message": "Logged Out successfully",
        "success": true
    }
    ```

#### 4. Update User Profile
- **URL:** `/api/users/profile/update`
- **Method:** `POST`
- **Description:** Updates the user's profile.
- **Request:**
    ```json
    {
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "phoneNo": "1234567890",
        "bio": "Software Developer",
        "skills": "JavaScript,Node.js"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Profile Successfully Updated John Doe",
        "user": {
            "_id": "user_id",
            "fullName": "John Doe",
            "email": "john.doe@example.com",
            "phoneNo": "1234567890",
            "role": "user",
            "profile": {
                "bio": "Software Developer",
                "skills": ["JavaScript", "Node.js"]
            }
        },
        "success": true
    }
    ```

### Company Endpoints

#### 1. Register Company
- **URL:** `/api/companies/register`
- **Method:** `POST`
- **Description:** Registers a new company.
- **Request:**
    ```json
    {
        "companyName": "Tech Corp"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Company registered successfully",
        "company": {
            "name": "Tech Corp",
            "userId": "user_id"
        },
        "success": true
    }
    ```

#### 2. Get Companies
- **URL:** `/api/companies/get`
- **Method:** `GET`
- **Description:** Retrieves a list of all companies.
- **Request:** `N/A`
- **Response:**
    ```json
    [
        {
            "name": "Tech Corp",
            "userId": "user_id"
        }
    ]
    ```

#### 3. Get Company by ID
- **URL:** `/api/companies/get/{id}`
- **Method:** `GET`
- **Description:** Retrieves a specific company by its ID.
- **Request:** `N/A`
- **Response:**
    ```json
    {
        "name": "Tech Corp",
        "userId": "user_id"
    }
    ```

#### 4. Update Company
- **URL:** `/api/companies/update/{id}`
- **Method:** `PUT`
- **Description:** Updates an existing company.
- **Request:**
    ```json
    {
        "name": "Tech Corp",
        "description": "Leading tech company",
        "website": "https://techcorp.com",
        "location": "San Francisco"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Company information updated",
        "success": true
    }
    ```


    ### Job Endpoints

    #### 1. Post Job
    - **URL:** `/api/jobs/post`
    - **Method:** `POST`
    - **Description:** Admin posts a new job.
    - **Request:**
        ```json
        {
            "title": "Software Engineer",
            "description": "Develop and maintain software applications.",
            "requirements": "JavaScript,Node.js,React",
            "salary": 120000,
            "location": "New York",
            "position": "Full-time",
            "jobType": "Permanent",
            "experience": "2 years",
            "companyId": "company_id"
        }
        ```
    - **Response:**
        ```json
        {
            "message": "New job created successfully",
            "job": {
                "title": "Software Engineer",
                "description": "Develop and maintain software applications.",
                "requirements": ["JavaScript", "Node.js", "React"],
                "salary": 120000,
                "location": "New York",
                "position": "Full-time",
                "jobType": "Permanent",
                "experienceLevel": "2 years",
                "company": "company_id",
                "created_by": "admin_id"
            },
            "success": true
        }
        ```

    #### 2. Get All Jobs
    - **URL:** `/api/jobs/get`
    - **Method:** `GET`
    - **Description:** Retrieves a list of all jobs.
    - **Request:** `N/A`
    - **Response:**
        ```json
        {
            "jobs": [
                {
                    "title": "Software Engineer",
                    "description": "Develop and maintain software applications.",
                    "requirements": ["JavaScript", "Node.js", "React"],
                    "salary": 120000,
                    "location": "New York",
                    "position": "Full-time",
                    "jobType": "Permanent",
                    "experienceLevel": "2 years",
                    "company": "company_id",
                    "created_by": "admin_id"
                }
            ],
            "success": true
        }
        ```

    #### 3. Get Job by ID
    - **URL:** `/api/jobs/get/{id}`
    - **Method:** `GET`
    - **Description:** Retrieves a specific job by its ID.
    - **Request:** `N/A`
    - **Response:**
        ```json
        {
            "job": {
                "title": "Software Engineer",
                "description": "Develop and maintain software applications.",
                "requirements": ["JavaScript", "Node.js", "React"],
                "salary": 120000,
                "location": "New York",
                "position": "Full-time",
                "jobType": "Permanent",
                "experienceLevel": "2 years",
                "company": "company_id",
                "created_by": "admin_id"
            },
            "success": true
        }
        ```

    #### 4. Get Admin Jobs
    - **URL:** `/api/jobs/getadminjobs`
    - **Method:** `GET`
    - **Description:** Retrieves a list of jobs created by the admin.
    - **Request:** `N/A`
    - **Response:**
        ```json
        {
            "jobs": [
                {
                    "title": "Software Engineer",
                    "description": "Develop and maintain software applications.",
                    "requirements": ["JavaScript", "Node.js", "React"],
                    "salary": 120000,
                    "location": "New York",
                    "position": "Full-time",
                    "jobType": "Permanent",
                    "experienceLevel": "2 years",
                    "company": "company_id",
                    "created_by": "admin_id"
                }
            ],
            "success": true
        }
        ```

    ### Application Endpoints

    #### 1. Apply Job
    - **URL:** `/api/applications/apply/{id}`
    - **Method:** `GET`
    - **Description:** User applies for a job.
    - **Request:** `N/A`
    - **Response:**
        ```json
        {
            "message": "Job applied successfully",
            "success": true
        }
        ```

    #### 2. Get Applied Jobs
    - **URL:** `/api/applications/get`
    - **Method:** `GET`
    - **Description:** Retrieves a list of jobs applied by the user.
    - **Request:** `N/A`
    - **Response:**
        ```json
        {
            "application": [
                {
                    "job": {
                        "title": "Software Engineer",
                        "description": "Develop and maintain software applications.",
                        "requirements": ["JavaScript", "Node.js", "React"],
                        "salary": 120000,
                        "location": "New York",
                        "position": "Full-time",
                        "jobType": "Permanent",
                        "experienceLevel": "2 years",
                        "company": "company_id",
                        "created_by": "admin_id"
                    }
                }
            ],
            "success": true
        }
        ```

    #### 3. Get Applicants
    - **URL:** `/api/applications/{id}/applicants`
    - **Method:** `GET`
    - **Description:** Admin retrieves a list of applicants for a specific job.
    - **Request:** `N/A`
    - **Response:**
        ```json
        {
            "job": {
                "title": "Software Engineer",
                "description": "Develop and maintain software applications.",
                "requirements": ["JavaScript", "Node.js", "React"],
                "salary": 120000,
                "location": "New York",
                "position": "Full-time",
                "jobType": "Permanent",
                "experienceLevel": "2 years",
                "company": "company_id",
                "created_by": "admin_id",
                "applications": [
                    {
                        "applicant": {
                            "fullName": "John Doe",
                            "email": "john.doe@example.com",
                            "phoneNo": "1234567890"
                        }
                    }
                ]
            },
            "success": true
        }
        ```

    #### 4. Update Application Status
    - **URL:** `/api/applications/status/{id}/update`
    - **Method:** `POST`
    - **Description:** Updates the status of a job application.
    - **Request:**
        ```json
        {
            "status": "accepted"
        }
        ```
    - **Response:**
        ```json
        {
            "message": "Status updated successfully",
            "success": true
        }
        ```