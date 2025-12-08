# DevOps Assignment

A Node.js API with GitHub Actions automation.

## How to Run Locally

1. Install dependencies:
```bash
   npm install
```

2. Start the server:
```bash
   npm start
```

3. Test the endpoint:
```bash
   curl http://localhost:3000/status
```

## How the Workflow Works

1. Manually trigger the workflow from GitHub Actions tab
2. The workflow starts the API server
3. The custom action calls the `/status` endpoint
4. The action updates this README with the response
5. Changes are committed and pushed automatically

<!-- API_STATUS_START -->
## API Status
        - **Status:** ok
        - **Service:** devops-assignment
        - **Timestamp:** 2025-12-08T12:44:51.904Z
<!-- API_STATUS_END -->
