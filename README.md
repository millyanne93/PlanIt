# PlanIt

PlanIt is a cloud-native task planning and scheduling application designed to help users organize tasks, events, and daily activities. The platform demonstrates modern full-stack development, DevOps automation, and cloud infrastructure deployment.

The system is built using containerized microservices and deployed using Kubernetes with automated CI/CD pipelines powered by GitHub Actions.

## Project Overview

PlanIt allows users to create and manage tasks through a modern web interface while demonstrating best practices in:

- Full-stack development
- Containerized applications
- CI/CD automation
- Infrastructure as Code
- Kubernetes deployment

This project showcases how modern applications can be built and deployed using cloud-native technologies.

## Tech Stack

### Frontend
- React
- JavaScript
- Tailwind CSS

### Backend
- Python
- Flask
- REST APIs

### Database
- MongoDB

### DevOps & Cloud
- Docker
- Kubernetes
- Helm
- Terraform
- AWS
- GitHub Actions

## System Architecture
Frontend (React)
↓
Backend API (Flask)
↓
MongoDB Database

text

**Deployment Stack:**
Docker → Kubernetes → AWS Infrastructure (Terraform)

text

## Features

- Task creation and management
- Event scheduling
- Persistent task storage
- Responsive frontend interface
- Containerized services using Docker
- Kubernetes orchestration using Helm charts
- Automated CI/CD pipelines using GitHub Actions
- Infrastructure provisioning using Terraform

## CI/CD Pipeline (GitHub Actions)

PlanIt uses GitHub Actions to automate the development workflow, ensuring that code is tested, containerized, and prepared for deployment.

Workflow files are located in:
.github/workflows/

text

### 1️⃣ Docker Build and CI Pipeline

**Workflow file:** `.github/workflows/docker-build.yml`

This pipeline automatically runs when code is pushed to the repository.

**Pipeline stages include:**

**Test Stage**
- Install frontend dependencies
- Build React application
- Validate Python backend dependencies
- Run backend syntax checks
- Verify Docker images build successfully

**Build and Push Stage**
- Build Docker images for:
  - frontend
  - backend
- Push images to Docker Hub
- Tag images with:
  - latest
  - commit SHA version

**Example image tags:**
millyanne93/planit-frontend:latest
millyanne93/planit-backend:latest
millyanne93/planit-frontend:<commit-sha>
millyanne93/planit-backend:<commit-sha>

text

**Development Builds**

For the development branch, Docker images are built but not pushed to the registry, allowing safe testing.

### Terraform Infrastructure Automation

PlanIt uses Terraform with GitHub Actions to automate cloud infrastructure provisioning.

**Workflow file:** `.github/workflows/terraform.yml`

This pipeline runs when infrastructure files change.

**Pipeline stages:**
- Terraform initialization
- Terraform formatting validation
- Configuration validation
- Terraform plan for pull requests
- Terraform apply for main branch pushes

This allows infrastructure to be managed using Infrastructure as Code (IaC).

## Local Development Setup

### Clone Repository
```bash
git clone https://github.com/millyanne93/PlanIt.git
cd PlanIt
Run Frontend
bash
cd frontend
npm install
npm start
Run Backend
bash
cd backend
pip install -r requirements.txt
python app.py
Docker Deployment
Build containers:
bash
docker build -t planit-frontend ./frontend
docker build -t planit-backend ./backend
Run containers:
bash
docker run -p 3000:3000 planit-frontend
docker run -p 5000:5000 planit-backend
Kubernetes Deployment
PlanIt services can be deployed using Helm charts.

Example:

bash
helm upgrade --install planit-mongo ./helm/database
helm upgrade --install planit-backend ./helm/backend
helm upgrade --install planit-frontend ./helm/frontend
This deploys:

MongoDB database

Backend API

Frontend application

CI/CD Architecture
text
Developer Push
      ↓
GitHub Repository
      ↓
GitHub Actions Pipeline
      ↓
Run Tests
      ↓
Build Docker Images
      ↓
Push Images to Docker Hub
      ↓
Deploy to Kubernetes Cluster
Future Improvements
User authentication (JWT)

Notifications and reminders

Mobile-friendly UI improvements

Production Kubernetes deployment

Monitoring with Prometheus and Grafana

Author
Millyanne Wanjala

License
This project is for educational and demonstration purposes.







