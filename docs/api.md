# API Technical Documentation

## Overview

This document describes the REST API for the PTITDAM Orchestrator system. The API provides comprehensive CRUD operations for managing workflows, variables, node types, and workflow nodes. The API follows RESTful principles and provides OpenAPI documentation for easy integration.

## Base URL

```
https://api.ptitdam-orchestrator.com/v1
```

## Authentication

The API uses Bearer token authentication for all endpoints except public health checks.

```
Authorization: Bearer <your-access-token>
```

## Content Type

All requests and responses use JSON format:

```
Content-Type: application/json
Accept: application/json
```

## API Endpoints

### 1. Workflows

#### Get All Workflows

```
GET /workflows
```

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 20, max: 100)
- `search` (optional): Search workflows by name or description
- `category` (optional): Filter by workflow category

**Response:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Data Processing Pipeline",
      "description": "A workflow for processing and transforming data from multiple sources",
      "inputs": {
        "source_files": { "type": "array", "required": true },
        "output_format": { "type": "string", "default": "json" }
      },
      "outputs": {
        "processed_data": { "type": "object" },
        "statistics": { "type": "object" }
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
```

#### Get Workflow by ID

```
GET /workflows/{id}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Data Processing Pipeline",
  "description": "A workflow for processing and transforming data from multiple sources",
  "inputs": {
    "source_files": { "type": "array", "required": true },
    "output_format": { "type": "string", "default": "json" }
  },
  "outputs": {
    "processed_data": { "type": "object" },
    "statistics": { "type": "object" }
  },
  "nodes": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Validate Input",
      "description": "Validates input data format",
      "type": "HTTPRequest",
      "category": "action",
      "inputs": { "schema": "user_schema" },
      "outputs": { "valid_data": { "type": "object" } },
      "previous_node": null
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Create Workflow

```
POST /workflows
```

**Request Body:**

```json
{
  "name": "Data Processing Pipeline",
  "description": "A workflow for processing and transforming data from multiple sources",
  "inputs": {
    "source_files": { "type": "array", "required": true },
    "output_format": { "type": "string", "default": "json" }
  },
  "outputs": {
    "processed_data": { "type": "object" },
    "statistics": { "type": "object" }
  }
}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Data Processing Pipeline",
  "description": "A workflow for processing and transforming data from multiple sources",
  "inputs": {
    "source_files": { "type": "array", "required": true },
    "output_format": { "type": "string", "default": "json" }
  },
  "outputs": {
    "processed_data": { "type": "object" },
    "statistics": { "type": "object" }
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Update Workflow

```
PUT /workflows/{id}
```

**Request Body:** Same as Create Workflow

**Response:** Same as Create Workflow

#### Delete Workflow

```
DELETE /workflows/{id}
```

**Response:**

```json
{
  "message": "Workflow deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 2. Variables

#### Get All Variables

```
GET /variables
```

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 20, max: 100)
- `search` (optional): Search variables by name
- `scope` (optional): Filter by variable scope (global, workflow)

**Response:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "API_ENDPOINT",
      "value": "https://api.example.com/v1",
      "scope": "global",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
```

#### Get Variable by ID

```
GET /variables/{id}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "API_ENDPOINT",
  "value": "https://api.example.com/v1",
  "scope": "global",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Create Variable

```
POST /variables
```

**Request Body:**

```json
{
  "name": "API_ENDPOINT",
  "value": "https://api.example.com/v1",
  "scope": "global"
}
```

**Response:** Same as Get Variable by ID

#### Update Variable

```
PUT /variables/{id}
```

**Request Body:** Same as Create Variable

**Response:** Same as Get Variable by ID

#### Delete Variable

```
DELETE /variables/{id}
```

**Response:**

```json
{
  "message": "Variable deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440001"
}
```

### 3. Node Types

#### Get All Node Types

```
GET /node-types
```

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 20, max: 100)
- `search` (optional): Search node types by name
- `category` (optional): Filter by node category

**Response:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "HTTP Request",
      "properties": {
        "url": { "type": "string", "required": true },
        "method": {
          "type": "string",
          "enum": ["GET", "POST", "PUT", "DELETE"],
          "default": "GET"
        },
        "headers": { "type": "object", "default": {} },
        "body": { "type": "object", "required": false }
      },
      "category": "action",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
```

#### Get Node Type by ID

```
GET /node-types/{id}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "name": "HTTP Request",
  "properties": {
    "url": { "type": "string", "required": true },
    "method": {
      "type": "string",
      "enum": ["GET", "POST", "PUT", "DELETE"],
      "default": "GET"
    },
    "headers": { "type": "object", "default": {} },
    "body": { "type": "object", "required": false }
  },
  "category": "action",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Create Node Type

```
POST /node-types
```

**Request Body:**

```json
{
  "name": "HTTP Request",
  "properties": {
    "url": { "type": "string", "required": true },
    "method": {
      "type": "string",
      "enum": ["GET", "POST", "PUT", "DELETE"],
      "default": "GET"
    },
    "headers": { "type": "object", "default": {} },
    "body": { "type": "object", "required": false }
  },
  "category": "action"
}
```

**Response:** Same as Get Node Type by ID

#### Update Node Type

```
PUT /node-types/{id}
```

**Request Body:** Same as Create Node Type

**Response:** Same as Get Node Type by ID

#### Delete Node Type

```
DELETE /node-types/{id}
```

**Response:**

```json
{
  "message": "Node type deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440002"
}
```

### 4. Workflow Nodes

#### Get Workflow Nodes

```
GET /workflows/{workflow_id}/nodes
```

**Query Parameters:**

- `category` (optional): Filter by node category
- `type` (optional): Filter by node type

**Response:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Fetch User Data",
      "description": "Retrieves user information from external API",
      "type": "HTTP Request",
      "category": "input",
      "inputs": {
        "url": "https://api.example.com/users/{user_id}",
        "method": "GET",
        "headers": { "Authorization": "Bearer {token}" }
      },
      "outputs": {
        "user_data": { "type": "object" },
        "status_code": { "type": "integer" }
      },
      "workflow_id": "550e8400-e29b-41d4-a716-446655440000",
      "previous_node": null,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Workflow Node by ID

```
GET /workflows/{workflow_id}/nodes/{node_id}
```

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "name": "Fetch User Data",
  "description": "Retrieves user information from external API",
  "type": "HTTP Request",
  "category": "input",
  "inputs": {
    "url": "https://api.example.com/users/{user_id}",
    "method": "GET",
    "headers": { "Authorization": "Bearer {token}" }
  },
  "outputs": {
    "user_data": { "type": "object" },
    "status_code": { "type": "integer" }
  },
  "workflow_id": "550e8400-e29b-41d4-a716-446655440000",
  "previous_node": null,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Create Workflow Node

```
POST /workflows/{workflow_id}/nodes
```

**Request Body:**

```json
{
  "name": "Fetch User Data",
  "description": "Retrieves user information from external API",
  "type": "HTTP Request",
  "category": "input",
  "inputs": {
    "url": "https://api.example.com/users/{user_id}",
    "method": "GET",
    "headers": { "Authorization": "Bearer {token}" }
  },
  "outputs": {
    "user_data": { "type": "object" },
    "status_code": { "type": "integer" }
  },
  "previous_node": null
}
```

**Response:** Same as Get Workflow Node by ID

#### Update Workflow Node

```
PUT /workflows/{workflow_id}/nodes/{node_id}
```

**Request Body:** Same as Create Workflow Node

**Response:** Same as Get Workflow Node by ID

#### Delete Workflow Node

```
DELETE /workflows/{workflow_id}/nodes/{node_id}
```

**Response:**

```json
{
  "message": "Workflow node deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440003"
}
```

## Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  }
}
```

### Common HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

### Error Codes

- `VALIDATION_ERROR`: Request data validation failed
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `DUPLICATE_RESOURCE`: Resource already exists
- `INVALID_WORKFLOW_STATE`: Workflow state prevents operation
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `INTERNAL_SERVER_ERROR`: Unexpected server error

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Standard Plan**: 1000 requests per hour
- **Premium Plan**: 10000 requests per hour
- **Enterprise Plan**: 100000 requests per hour

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642233600
```

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Pagination metadata is included in list responses:

```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "has_next": true,
    "has_previous": false
  }
}
```

## Filtering and Search

### Text Search

Most endpoints support text search via the `search` parameter:

```
GET /workflows?search=data processing
```

### Category Filtering

Filter by category where applicable:

```
GET /node-types?category=action
GET /workflows/{id}/nodes?category=input
```

### Date Range Filtering

Filter by creation or update dates:

```
GET /workflows?created_after=2024-01-01&created_before=2024-01-31
```

## Bulk Operations

### Bulk Create Workflows

```
POST /workflows/bulk
```

**Request Body:**

```json
{
  "workflows": [
    {
      "name": "Workflow 1",
      "description": "First workflow",
      "inputs": {},
      "outputs": {}
    },
    {
      "name": "Workflow 2",
      "description": "Second workflow",
      "inputs": {},
      "outputs": {}
    }
  ]
}
```

### Bulk Update Variables

```
PUT /variables/bulk
```

**Request Body:**

```json
{
  "variables": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "API_ENDPOINT",
      "value": "https://new-api.example.com/v1"
    }
  ]
}
```

## Webhooks

### Configure Webhook

```
POST /webhooks
```

**Request Body:**

```json
{
  "url": "https://your-app.com/webhook",
  "events": ["workflow.created", "workflow.updated"],
  "secret": "your-webhook-secret"
}
```

### Webhook Events

- `workflow.created`: Workflow created
- `workflow.updated`: Workflow updated
- `workflow.deleted`: Workflow deleted
- `node.created`: Workflow node created
- `node.updated`: Workflow node updated
- `node.deleted`: Workflow node deleted

## OpenAPI Documentation

The complete API specification is available in latest OpenAPI format:

```
GET /openapi.json
```

This endpoint returns the complete OpenAPI specification that can be used with tools like Swagger UI for interactive API documentation.

## Best Practices

### Authentication

- Always use HTTPS in production
- Store API keys securely
- Rotate keys regularly
- Use environment variables for configuration

### Error Handling

- Always check HTTP status codes
- Parse error responses for details
- Implement retry logic with exponential backoff
- Log errors for debugging

### Performance

- Use pagination for large datasets
- Implement caching where appropriate
- Use bulk operations for multiple items
- Monitor rate limits

### Security

- Validate all input data
- Sanitize user-provided content
- Use parameterized queries
- Implement proper access controls
