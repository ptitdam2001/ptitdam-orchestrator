# Database Technical Documentation

## Overview

This document describes the database schema for the PTITDAM Orchestrator system. The database is designed to support workflow management with nodes, variables, and workflow execution tracking.

## Database Schema

### 1. Workflows Table

The `workflows` table stores workflow definitions and their metadata.

| Column        | Type         | Description                                                      |
| ------------- | ------------ | ---------------------------------------------------------------- |
| `id`          | UUID         | Primary key, unique identifier for the workflow                  |
| `name`        | VARCHAR(255) | Human-readable name of the workflow                              |
| `description` | TEXT         | Detailed description of the workflow's purpose and functionality |
| `inputs`      | JSON         | Input parameters schema and configuration for the workflow       |
| `outputs`     | JSON         | Output parameters schema and expected results                    |
| `enabled`     | BOOLEAN      | Availability status (true by default)                            |

**Example:**

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
  }
}
```

### 2. Variables Table

The `variables` table stores global and workflow-specific variables that can be referenced throughout the system.

| Column  | Type         | Description                                     |
| ------- | ------------ | ----------------------------------------------- |
| `id`    | UUID         | Primary key, unique identifier for the variable |
| `name`  | VARCHAR(255) | Variable name (must be unique within scope)     |
| `value` | TEXT         | Variable value (can be JSON for complex data)   |

**Example:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "API_ENDPOINT",
  "value": "https://api.example.com/v1"
}
```

### 3. Node Types Table

The `node_types` table defines the available node types that can be used in workflows.

| Column       | Type         | Description                                            |
| ------------ | ------------ | ------------------------------------------------------ |
| `id`         | UUID         | Primary key, unique identifier for the node type       |
| `name`       | VARCHAR(255) | Human-readable name of the node type                   |
| `properties` | JSON         | Configuration schema and properties for this node type |

**Example:**

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
  }
}
```

### 4. Workflow Nodes Table

The `workflow_nodes` table stores the actual nodes within workflows and their connections.

| Column          | Type         | Description                                                          |
| --------------- | ------------ | -------------------------------------------------------------------- |
| `id`            | UUID         | Primary key, unique identifier for the workflow node                 |
| `name`          | VARCHAR(255) | Human-readable name of the node                                      |
| `description`   | TEXT         | Detailed description of the node's purpose                           |
| `type`          | VARCHAR(255) | Type of the node (references node_types.name)                        |
| `category`      | VARCHAR(100) | Category classification (e.g., "action", "transformation", "output") |
| `inputs`        | JSON         | Input parameters and configuration for this specific node instance   |
| `outputs`       | JSON         | Output parameters and expected results for this node                 |
| `workflow_id`   | UUID         | Foreign key to workflows.id                                          |
| `previous_node` | UUID         | Foreign key to workflow_nodes.id (nullable for start nodes)          |

**Example:**

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
  "previous_node": null
}
```

## Relationships

### Foreign Key Relationships

1. **workflow_nodes.workflow_id** → **workflows.id**

   - Each workflow node belongs to exactly one workflow
   - Cascade delete: when a workflow is deleted, all its nodes are deleted

2. **workflow_nodes.previous_node** → **workflow_nodes.id**

   - Self-referencing relationship for node sequencing
   - Nullable: start nodes have no previous node
   - Multiple nodes can have the same previous node (parallel execution)

3. **workflow_nodes.type** → **node_types.name**
   - Each workflow node must reference a valid node type
   - Node types define the schema for inputs and outputs

### Data Flow

```
workflows
    ↓ (1:N)
workflow_nodes
    ↓ (N:1)
node_types
    ↓ (N:1)
variables (referenced in inputs/outputs)
```

## Indexes

### Primary Indexes

- `workflows.id` (Primary Key)
- `variables.id` (Primary Key)
- `node_types.id` (Primary Key)
- `workflow_nodes.id` (Primary Key)

### Foreign Key Indexes

- `workflow_nodes.workflow_id`
- `workflow_nodes.previous_node`
- `workflow_nodes.type`

### Performance Indexes

- `workflows.name` (for workflow lookup)
- `variables.name` (for variable resolution)
- `node_types.name` (for node type lookup)
- `workflow_nodes.workflow_id, workflow_nodes.category` (for workflow analysis)

## Constraints

### Unique Constraints

- `workflows.name` (workflow names must be unique)
- `variables.name` (variable names must be unique)
- `node_types.name` (node type names must be unique)
- `workflow_nodes.workflow_id, workflow_nodes.name` (node names must be unique within a workflow)

### Check Constraints

- `workflow_nodes.category` must be one of: 'input', 'processing', 'output', 'control'
- `workflows.inputs` and `workflows.outputs` must be valid JSON
- `variables.value` must be valid JSON or string
- `node_types.properties` must be valid JSON
- `workflow_nodes.inputs` and `workflow_nodes.outputs` must be valid JSON

## Usage Examples

### Creating a Simple Workflow

```sql
-- 1. Create a workflow
INSERT INTO workflows (id, name, description, inputs, outputs) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Data Validation Pipeline',
  'Validates and processes incoming data',
  '{"data": {"type": "object", "required": true}}',
  '{"validated_data": {"type": "object"}, "errors": {"type": "array"}}'
);

-- 2. Create workflow nodes
INSERT INTO workflow_nodes (id, name, description, type, category, inputs, outputs, workflow_id, previous_node) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Validate Input', 'Validates input data format', 'Data Validation', 'input', '{"schema": "user_schema"}', '{"valid_data": {"type": "object"}}', '550e8400-e29b-41d4-a716-446655440000', NULL),
  ('550e8400-e29b-41d4-a716-446655440002', 'Process Data', 'Processes validated data', 'Data Processing', 'processing', '{"data": "{{previous.valid_data}}"}', '{"processed_data": {"type": "object"}}', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001');
```

### Querying Workflow Structure

```sql
-- Get all nodes in a workflow with their connections
SELECT
  wn.id,
  wn.name,
  wn.type,
  wn.category,
  pn.name as previous_node_name
FROM workflow_nodes wn
LEFT JOIN workflow_nodes pn ON wn.previous_node = pn.id
WHERE wn.workflow_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY wn.category, wn.name;
```

## Best Practices

1. **Naming Conventions**

   - Use descriptive names for workflows and nodes
   - Follow consistent naming patterns (e.g., kebab-case for workflows, PascalCase for node types)

2. **JSON Schema Validation**

   - Always validate JSON inputs/outputs against defined schemas
   - Use consistent data types across similar node types

3. **Workflow Design**

   - Keep workflows focused on single responsibilities
   - Use meaningful categories for node organization
   - Document complex workflows with detailed descriptions

4. **Variable Management**

   - Use environment-specific variables for configuration
   - Avoid hardcoding values in workflow definitions
   - Use descriptive variable names

5. **Performance Considerations**
   - Index frequently queried columns
   - Use JSON operators efficiently for complex queries
   - Consider partitioning for large workflow tables
