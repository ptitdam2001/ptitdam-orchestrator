# PTITDAM Orchestrator

A modern workflow orchestration system that allows you to create and manage workflows like programming code. Built with a focus on developer experience, scalability, and maintainability.

## Overview

PTITDAM Orchestrator is a comprehensive workflow management system that provides:

- **Visual Workflow Editor**: Drag-and-drop interface for creating complex workflows
- **Node-Based Architecture**: Modular system with reusable node types
- **Variable Management**: Global and workflow-specific variable handling
- **REST API**: Complete CRUD operations for all entities
- **Modern Frontend**: React-based interface with TypeScript
- **Domain-Driven Design**: Clean architecture with clear separation of concerns

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)
- Database (PostgreSQL recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ptitdam-orchestrator.git
cd ptitdam-orchestrator

# Install dependencies
cd application
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
pnpm dev
```

## Documentation

### 📚 Technical Documentation

- **[Data Model](./docs/data-model.md)** - Complete database schema documentation with entities, relationships, and constraints
- **[API Documentation](./docs/api.md)** - REST API reference with endpoints, authentication, and examples
- **[Frontend Application](./docs/application.md)** - Frontend architecture, DDD principles, and technology stack

### 🏗️ Architecture

The system follows a clean architecture approach with:

- **Backend**: REST API with comprehensive CRUD operations
- **Frontend**: React application with Domain-Driven Design
- **Database**: Relational database with workflow, node, and variable management
- **API**: OpenAPI specification with type-safe client generation

### 🎯 Key Features

- **Workflow Management**: Create, edit, and execute complex workflows
- **Visual Editor**: Intuitive drag-and-drop workflow builder
- **Node Library**: Extensible node type system
- **Variable System**: Global and workflow-specific variables
- **Real-time Execution**: Monitor workflow execution status
- **Type Safety**: Full TypeScript support throughout the stack

## Technology Stack

### Backend

- **API**: REST with OpenAPI specification
- **Database**: PostgreSQL with JSON support
- **Authentication**: JWT-based authentication
- **Documentation**: OpenAPI/Swagger

### Frontend

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development
- **State Management**: TanStack Query + Zustand
- **Routing**: TanStack Router
- **UI**: React Flow for workflow visualization
- **Forms**: React Hook Form
- **Testing**: Vitest + Storybook

## Development

### Project Structure

```
ptitdam-orchestrator/
├── Api/                    # Backend API implementation
├── Application/            # Application layer
├── docs/                  # Technical documentation
│   ├── data-model.md     # Database schema
│   ├── api.md            # API documentation
│   └── application.md    # Frontend documentation
└── README.md             # This file
```

### Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Start Storybook
pnpm storybook
```

## Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Domain-Driven Design principles
- Write comprehensive tests
- Maintain type safety with TypeScript
- Follow the established code style
- Update documentation for new features

## Support

- **Documentation**: Check the [docs](./docs/) folder for detailed guides
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join our GitHub Discussions for questions and ideas

## Roadmap

- [ ] Advanced workflow templates
- [ ] Real-time collaboration
- [ ] Plugin system for custom nodes
- [ ] Advanced analytics and monitoring
- [ ] Multi-tenant support
- [ ] Mobile application

---

**PTITDAM Orchestrator** - Making workflow orchestration as simple as programming
