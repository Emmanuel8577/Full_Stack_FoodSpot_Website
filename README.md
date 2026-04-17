🍔 FoodSpot: Enterprise-Grade MERN EcosystemFoodSpot is a production-ready, full-stack food commerce platform. 
It is engineered to handle high-performance demands using Redis for caching, secure identity management via Google OAuth 2.0, and automated multi-channel customer communications.
🏗️ System ArchitectureThe application is built on a decoupled architecture, ensuring that the customer storefront, administrative suite, and backend logic can scale independently.
Frontend: High-performance React (Vite) application with Tailwind CSS.
Admin Dashboard: Comprehensive management portal with real-time analytics and jsPDF invoicing.
Backend: Node.js/Express REST API containerized with Docker.
Performance Layer: Redis integrated for session management and database query caching.
🌟 Advanced Features & Integrations
🔐 Security & IdentityGoogle 
OAuth 2.0: Secure, frictionless social authentication for users.
Role-Based Access Control (RBAC): Strict separation between customer and administrative privileges.
JWT Security: Stateless authentication for secure API communication.
💳 Financials & DocumentationStripe Gateway: Secure end-to-end payment processing for international and local transactions.
Automated Invoicing: Integrated jsPDF engine generates professional, branded PDF receipts immediately upon order confirmation.
📡 Real-Time CommunicationSMS Notifications: Powered by Twilio to send real-time order status updates (Processing, Out for Delivery, Delivered)
.Email Automation: Resend integration for transactional emails, including order summaries and welcome sequences.
⚡ Performance OptimizationRedis Caching: Drastically reduced MongoDB latency by caching high-frequency menu and session data.
Cloudinary: Cloud-based image optimization and CDN delivery for menu assets.
🛠️ Tech StackLayerTechnologyFrontendReact.js, Vite, Tailwind CSS, Lucide IconsBackendNode.js, Express.js, JWTDatabaseMongoDB Atlas, RedisCommunications
Twilio (SMS), Resend (Email)IdentityGoogle 
OAuth 2.0 PaymentsStripe APIDevOpsDocker, Render, Vercel
🚀 Installation & Local Development1. 
Clone the RepositoryBashgit clone https://github.com/Emmanuel8577/Full_Stack_FoodSpot_Website.git
cd Full_Stack_FoodSpot_Website
2. Environment ConfigurationCreate a .env file in the backend folder and populate it with your credentials:Code snippetPORT=4000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
STRIPE_SECRET_KEY=your_stripe_secret
RESEND_API_KEY=your_resend_api_key
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
GOOGLE_CLIENT_ID=your_google_id
CLOUDINARY_URL=your_cloudinary_url
3. Install DependenciesBash# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Admin
cd ../admin && npm install
4. Run with DockerBashdocker-compose up --build
🛡️ Security NoteThis project utilizes GITHUB PUSH PROTECTION. Ensure that all 
.env files are included in your 
.gitignore to prevent secret leaks. 
All credentials mentioned in the documentation must be treated as environment variables and never hardcoded.
👤 DeveloperEmmanuel Edache AdikwuFull-Stack Software Engineer | Backend Auth Lead | CAC SpecialistFinal
