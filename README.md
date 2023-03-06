# ALGORITHM PART

Just run `npm install` and then `npm run test:algorithm`   

# BACKEND PART

Session expiration time: 1 hour

### FOR LOCAL RUN
Create `.env` file and copy `.env.example` content to newly created file.
```
docker compose up
```

To test, keep the containers running
```
docker exec -it {backend container id} sh
```
```
npm run test (or any test specified in package.json)
```
#### Swagger link: http://localhost:3000/api-docs
#### Health check: http://localhost:3000/health  
<br/>

### FOR REMOTE HOST (might be suffered from server sleep due to free plan, just wait for it to boot up) 

#### Swagger link: https://zens-backend.onrender.com/api-docs
#### Health check: https://zens-backend.onrender.com/health  
