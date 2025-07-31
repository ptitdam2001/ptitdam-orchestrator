# Frontend Application Technical Documentation

## Overview

This document describes the frontend application architecture for the PTITDAM Orchestrator system. The application is built using modern React patterns with a focus on Domain-Driven Design (DDD) principles, providing an intuitive interface for workflow management and orchestration.

## Technology Stack

### Core Technologies

- **React 18+**: Latest version with concurrent features and hooks
- **TypeScript**: Full type safety and enhanced developer experience
- **Vite**: Fast build tool and development server
- **pnpm**: Fast, disk space efficient package manager

### Testing & Quality

- **Vitest**: Fast unit testing framework
- **Storybook**: Component development and documentation
- **ESLint & Prettier**: Code quality and formatting

### State Management & Data Fetching

- **TanStack Query**: Server state management and caching
- **Orval**: Type-safe API client generation from OpenAPI
- **Zustand**: Lightweight client state management

### Routing & Navigation

- **TanStack Router**: Type-safe routing with excellent DX
- **React Router**: Alternative routing solution

### UI & Forms

- **React Flow**: Workflow visualization and editing
- **React Hook Form**: Performant form handling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework

## Architecture Overview

### Domain-Driven Design (DDD) Structure

The application follows DDD principles with clear separation of concerns:

```
src/
├── domains/           # Domain-specific modules
│   ├── workflow/     # Workflow domain
│   ├── variable/     # Variable domain
│   ├── node-type/    # Node type domain
│   └── shared/       # Shared domain logic
├── infrastructure/   # External dependencies
├── application/      # Use cases and orchestration
└── presentation/     # UI components and pages
```

### Domain Structure

Each domain follows a consistent structure:

```
domains/workflow/
├── entities/         # Domain entities
├── repositories/     # Data access interfaces
├── services/        # Domain business logic
├── use-cases/       # Application use cases
├── components/      # Domain-specific UI components
└── types/          # Domain type definitions
```

## Domain Modules

### 1. Workflow Domain

**Core Entities:**

- `Workflow`: Main workflow entity with nodes and configuration
- `WorkflowNode`: Individual nodes within workflows
- `WorkflowExecution`: Runtime execution state

**Key Use Cases:**

- Create and edit workflows
- Visualize workflow structure
- Execute workflows
- Monitor execution status

**Components:**

- WorkflowEditor: Visual workflow builder
- WorkflowList: Workflow management interface
- WorkflowExecution: Runtime monitoring

### 2. Variable Domain

**Core Entities:**

- `Variable`: Global and workflow-specific variables
- `VariableScope`: Variable visibility and scope

**Key Use Cases:**

- Manage global variables
- Configure workflow-specific variables
- Variable resolution and substitution

**Components:**

- VariableManager: Variable CRUD operations
- VariableSelector: Variable selection interface

### 3. Node Type Domain

**Core Entities:**

- `NodeType`: Available node types and their properties
- `NodeTypeCategory`: Classification of node types

**Key Use Cases:**

- Define new node types
- Configure node type properties
- Node type validation

**Components:**

- NodeTypeLibrary: Available node types
- NodeTypeEditor: Node type configuration

### 4. Shared Domain

**Common Entities:**

- `User`: User authentication and permissions
- `AuditLog`: System audit trail
- `Notification`: System notifications

**Shared Services:**

- Authentication service
- Notification service
- Error handling service

## Application Layer

### Use Cases

The application layer orchestrates domain logic for specific user actions:

```typescript
// Example use case structure
interface CreateWorkflowUseCase {
  execute(params: CreateWorkflowParams): Promise<Workflow>;
}

interface ExecuteWorkflowUseCase {
  execute(
    workflowId: string,
    inputs: Record<string, any>
  ): Promise<ExecutionResult>;
}
```

### API Integration

**Orval Configuration:**

- Generates type-safe React Query hooks
- Automatic API client generation
- Real-time type synchronization

**Query Patterns:**

- Optimistic updates for better UX
- Background refetching
- Error boundary integration
- Loading state management

## Presentation Layer

### Component Architecture

**Atomic Design Principles:**

- Atoms: Basic UI components (Button, Input, etc.)
- Molecules: Composite components (SearchBar, FormField)
- Organisms: Complex components (WorkflowEditor, VariableManager)
- Templates: Page layouts
- Pages: Complete page implementations

### Routing Strategy

**TanStack Router Features:**

- Type-safe route parameters
- Nested routing for complex workflows
- Route-based code splitting
- Search params management

**Route Structure:**

```
/                    # Dashboard
/workflows           # Workflow list
/workflows/:id       # Workflow details
/workflows/:id/edit  # Workflow editor
/variables           # Variable management
/node-types          # Node type library
/settings            # Application settings
```

### State Management

**Client State (Zustand):**

- UI state (modals, sidebars, etc.)
- User preferences
- Form state persistence
- Navigation state

**Server State (TanStack Query):**

- API data caching
- Background synchronization
- Optimistic updates
- Error handling

## Development Workflow

### Project Setup

**Initialization:**

```bash
pnpm create vite ptitdam-orchestrator-frontend --template react-ts
cd ptitdam-orchestrator-frontend
pnpm install
```

**Key Dependencies:**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/router": "^1.0.0",
    "react-flow-renderer": "^11.0.0",
    "react-hook-form": "^7.0.0",
    "zustand": "^4.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "storybook": "^7.0.0",
    "orval": "^6.0.0"
  }
}
```

### Development Environment

**Vite Configuration:**

- Fast HMR (Hot Module Replacement)
- TypeScript support
- Environment variable management
- Build optimization

**Development Scripts:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## Testing Strategy

### Unit Testing (Vitest)

**Test Structure:**

- Domain logic testing
- Use case testing
- Component testing
- Utility function testing

**Testing Patterns:**

- Arrange-Act-Assert pattern
- Mock external dependencies
- Test-driven development (TDD)
- Coverage reporting

### Component Testing

**Storybook Integration:**

- Component documentation
- Visual testing
- Interaction testing
- Accessibility testing

**Story Structure:**

```typescript
// Example Storybook story
export default {
  title: "Workflow/WorkflowEditor",
  component: WorkflowEditor,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Default: Story = {
  args: {
    workflow: mockWorkflow,
  },
};
```

## Build & Deployment

### Build Configuration

**Vite Build Options:**

- Code splitting optimization
- Tree shaking
- Asset optimization
- Environment-specific builds

**Deployment Targets:**

- Static hosting (Netlify, Vercel)
- Docker containers
- CDN distribution

### Environment Management

**Environment Variables:**

```bash
VITE_API_BASE_URL=https://api.ptitdam-orchestrator.com/v1
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
```

## Performance Optimization

### Code Splitting

**Route-based Splitting:**

- Lazy load page components
- Preload critical routes
- Dynamic imports for heavy components

**Component Splitting:**

- Split large components
- Lazy load non-critical features
- Optimize bundle size

### Caching Strategy

**TanStack Query Caching:**

- Intelligent cache invalidation
- Background refetching
- Optimistic updates
- Cache persistence

**Static Asset Caching:**

- CDN caching
- Service worker for offline support
- Asset versioning

## Security Considerations

### Authentication & Authorization

**Input Validation:**

- Client-side validation
- Server-side validation
- XSS prevention
- CSRF protection

### Data Protection

**Sensitive Data Handling:**

- Secure variable storage
- Encrypted communication
- Audit logging
- Data anonymization

## Accessibility (a11y)

### WCAG Compliance

**Accessibility Features:**

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Focus management

**Component Accessibility:**

- ARIA labels and roles
- Semantic HTML structure
- Color contrast compliance
- Motion reduction support

## Internationalization (i18n)

### Multi-language Support

**Translation Strategy:**

- React-i18next integration
- Dynamic language switching
- RTL language support
- Pluralization rules

**Locale Management:**

- User preference storage
- Browser language detection
- Fallback language handling

## Monitoring & Analytics

### Error Tracking

**Error Boundaries:**

- React error boundaries
- Global error handling
- Error reporting service
- User feedback collection

### Performance Monitoring

**Metrics Collection:**

- Core Web Vitals
- User interaction metrics
- Error rate monitoring
- Performance budgets

## Development Guidelines

### Code Quality

**ESLint Configuration:**

- TypeScript-specific rules
- React best practices
- Accessibility rules
- Performance rules

**Prettier Configuration:**

- Consistent code formatting
- Editor integration
- Pre-commit hooks

### Git Workflow

**Branch Strategy:**

- Feature branch workflow
- Pull request reviews
- Semantic versioning
- Automated testing

**Commit Conventions:**

- Conventional commits
- Semantic commit messages
- Automated changelog generation

## Future Considerations

### Scalability

**Architecture Evolution:**

- Micro-frontend architecture
- Module federation
- Shared component library
- Design system implementation

### Technology Updates

**Migration Strategy:**

- React version upgrades
- Dependency updates
- Breaking change management
- Backward compatibility

## Conclusion

This frontend application architecture provides a solid foundation for building a scalable, maintainable, and user-friendly workflow orchestration system. The DDD approach ensures clear separation of concerns, while modern React patterns and tools enable efficient development and excellent user experience.

The combination of TanStack Query, React Flow, and React Hook Form creates a powerful development environment for building complex workflow management interfaces, while the comprehensive testing strategy ensures code quality and reliability.
