# Kambaz Quizzes API - Quick Reference

## Base URL

```
http://localhost:4000/api
```

## Authentication

Session-based authentication using `express-session`. After login, user session is maintained.

## User Endpoints

### Signup

```
POST /api/users/signup
Content-Type: application/json

{
  "username": "username",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "STUDENT"
}
```

### Signin

```
POST /api/users/signin
Content-Type: application/json

{
  "username": "username",
  "password": "password"
}
```

### Get Profile

```
POST /api/users/profile
```

### Get All Users

```
GET /api/users
```

### Get User by ID

```
GET /api/users/:userId
```

### Update User

```
PUT /api/users/:userId
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

### Delete User

```
DELETE /api/users/:userId
```

## Course Endpoints

### Get All Courses

```
GET /api/courses
```

### Get Courses for User

```
GET /api/users/:userId/courses
```

Or for current user:

```
GET /api/users/current/courses
```

### Create Course

```
POST /api/users/current/courses
Content-Type: application/json

{
  "name": "Rocket Propulsion",
  "number": "RS4550",
  "startDate": "2023-01-10",
  "endDate": "2023-05-15",
  "credits": 4,
  "description": "Course description",
  "faculty": "faculty_id"
}
```

### Update Course

```
PUT /api/courses/:courseId
Content-Type: application/json

{
  "name": "Updated Course Name"
}
```

### Delete Course

```
DELETE /api/courses/:courseId
```

## Assignment Endpoints

### Get All Assignments

```
GET /api/assignments
```

### Get Assignment by ID

```
GET /api/assignments/:assignmentId
```

### Get Assignments for Course

```
GET /api/courses/:courseId/assignments
```

### Create Assignment

```
POST /api/assignments
Content-Type: application/json

{
  "title": "Assignment Title",
  "course": "courseId",
  "description": "Description",
  "points": 100,
  "dueDate": "2024-05-13",
  "availableDate": "2024-05-06",
  "availableUntilDate": "2024-05-20"
}
```

### Update Assignment

```
PUT /api/assignments/:assignmentId
Content-Type: application/json

{
  "title": "Updated Title",
  "points": 150
}
```

### Delete Assignment

```
DELETE /api/assignments/:assignmentId
```

## Module Endpoints

### Get Modules for Course

```
GET /api/courses/:courseId/modules
```

### Create Module

```
POST /api/courses/:courseId/modules
Content-Type: application/json

{
  "name": "Module Name",
  "description": "Module description",
  "lessons": [
    {
      "_id": "L101",
      "name": "Lesson Name",
      "description": "Lesson description"
    }
  ]
}
```

### Update Module

```
PUT /api/modules/:moduleId
Content-Type: application/json

{
  "name": "Updated Module Name"
}
```

### Delete Module

```
DELETE /api/modules/:moduleId
```

## Quiz Endpoints

### Get All Quizzes

```
GET /api/quizzes
```

### Get Quiz by ID

```
GET /api/quizzes/:quizId
```

### Get Quizzes for Course

```
GET /api/courses/:courseId/quizzes
```

### Create Quiz

```
POST /api/quizzes
Content-Type: application/json

{
  "title": "Quiz Title",
  "course": "courseId",
  "Questions": 10,
  "points": 100,
  "dueDate": "2024-05-13",
  "availableDate": "2024-05-06",
  "availableUntilDate": "2024-05-20"
}
```

### Update Quiz

```
PUT /api/quizzes/:quizId
Content-Type: application/json

{
  "title": "Updated Quiz Title",
  "points": 150
}
```

### Delete Quiz

```
DELETE /api/quizzes/:quizId
```

## Question Endpoints

### Get All Questions

```
GET /api/questions
```

### Get Question by ID

```
GET /api/questions/:questionId
```

### Get Questions for Course

```
GET /api/courses/:courseId/questions
```

### Create Question

```
POST /api/questions
Content-Type: application/json

{
  "title": "Question Title",
  "course": "courseId",
  "type": "fill-in-the-blank",
  "points": 10,
  "question": "The capital of France is _______.",
  "possibleAnswers": ["Paris", "paris", "PARIS"],
  "caseSensitive": false
}
```

### Update Question

```
PUT /api/questions/:questionId
Content-Type: application/json

{
  "title": "Updated Question",
  "points": 15
}
```

### Delete Question

```
DELETE /api/questions/:questionId
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

Error responses follow the format:

```json
{
  "message": "Error description"
}
```

## Database

**MongoDB Connection:** `mongodb+srv://nkilonzo123:cmas2016@kambaz.01oixe9.mongodb.net/kambaz`

**Collections:**

- `users`
- `courses`
- `assignments`
- `enrollments`
- `modules`
- `quizzes`
- `questions`
