# JobFinder — Frontend

A React single-page application for a job board platform, supporting three distinct user roles: Candidates, Recruiters, and Admins, each with their own dashboard and workflow.

**Backend repo:** [[jobfinder-backend](https://github.com/az0205/JobBoard-backend)]

## Overview

Candidates browse open jobs, view full details, shortlist roles, and apply with a resume upload. Recruiters post, edit, and delete their own job listings, and review incoming applications, updating their status. Admins have platform-wide oversight, able to view and remove recruiters, candidates, and job listings. Authentication is role-based, with each role logging in separately and receiving a JWT used for all subsequent API calls.

## Features

- **Three separate role-based flows**: Candidate, Recruiter, and Admin, each with their own login, register, and dashboard
- **Candidate dashboard**: browse jobs, view full job details in a modal, shortlist jobs, apply with a resume upload, and track application status
- **Recruiter dashboard**: create, edit, and delete job postings; review applications with candidate details and update application status
- **Admin dashboard**: view and remove recruiters, candidates, and jobs across the platform
- **Persistent auth**: JWT stored in `localStorage` and automatically attached to API requests via an Axios interceptor
- **Client-side routing** across all role-specific pages using React Router

## Tech Stack

- **Framework:** React (Vite)
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **HTTP client:** Axios

## Project Structure

    jobfinder-frontend/
    |-- src/
    |   |-- main.jsx
    |   |-- App.jsx                  # Route definitions for all three roles
    |   |-- App.css
    |   |-- index.css
    |   |-- api/
    |   |   `-- axios.jsx            # Shared Axios instance with auth interceptor
    |   `-- pages/
    |       |-- Home.jsx
    |       |-- Candidate/
    |       |   |-- Login.jsx
    |       |   |-- Register.jsx
    |       |   |-- Main.jsx         # Job browsing, shortlisting, application tracking
    |       |   `-- Apply.jsx        # Application form with resume upload
    |       |-- Recruiter/
    |       |   |-- Login.jsx
    |       |   |-- Register.jsx
    |       |   |-- Main.jsx         # Job and application management
    |       |   |-- JobForm.jsx      # Create a job
    |       |   `-- EditJob.jsx      # Edit an existing job
    |       `-- Admin/
    |           |-- Login.jsx
    |           `-- Main.jsx         # Platform-wide recruiter/candidate/job management
    `-- public/

## Getting Started

### Prerequisites
- Node.js

### Installation

    git clone <this-repo-url>
    cd jobfinder-frontend
    npm install

### Configuration

The app points to a deployed backend by default (set in `src/api/axios.jsx`). To run against a local backend instead, update the `baseURL` there to your local server, for example `http://localhost:3200/api`.

### Running Locally

    npm run dev

## Routes

| Path | Role | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/candidate/register`, `/candidate/login` | Candidate | Auth |
| `/candidate/main` | Candidate | Job browsing and application tracking |
| `/candidate/apply/:jobId` | Candidate | Submit an application |
| `/recruiter/register`, `/recruiter/login` | Recruiter | Auth |
| `/recruiter/main` | Recruiter | Job and application management |
| `/recruiter/jobform` | Recruiter | Create a job |
| `/recruiter/editjob/:id` | Recruiter | Edit a job |
| `/admin/login` | Admin | Auth |
| `/admin/main` | Admin | Platform-wide management |

## Authentication

On login, each role receives a JWT from the backend, stored in `localStorage` under `token`. An Axios request interceptor automatically attaches this token as a `Bearer` header on every API call, so authenticated routes work without manually passing the token in each request.
